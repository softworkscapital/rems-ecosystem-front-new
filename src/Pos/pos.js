import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { API_URL } from '../config';
import { Link } from 'react-router-dom';

function PosHome() {
  const [selectedGoods, setSelectedGoods] = useState([]);
  const [goods, setGoods] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [searchTerm, setSearchTerm] = useState('');
  const [amountGiven, setAmountGiven] = useState('');
  const [change, setChange] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [branchName, setBranchName] = useState();
  const [availableGoods, setAvailableGoods] = useState([]); // Fixed typo
  const [customers, setCustomers] = useState([]);
  const [vat, setVat] = useState(0.15);
  const [suggestions, setSuggestions] = useState([]);

  const [billingAddress, setBillingAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerCountry, setCustomerCountry] = useState('');

  const username = localStorage.getItem('userName');
  const companyId = localStorage.getItem('async_client_profile_id');
  const branchId = localStorage.getItem('branch_id');

  const shiftId =  localStorage.getItem('shiftId');


  const formatTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};



const shiftOpenTime =  localStorage.getItem('dateTimeOpen');

const displayTime = formatTime(shiftOpenTime);

  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/branches/${branchId}`)
      .then(res => res.json())
      .then(resp => {
        setBranchName(resp[0].branch_name);
      })
      .catch(err => console.log(err.message));
  }, [branchId]);

  useEffect(() => {
    fetch(`${API_URL}/productdefinition/join/prices`)
      .then(res => res.json())
      .then(resp => {
        setAvailableGoods(resp);
        console.log(resp);
      })
      .catch(err => console.log(err.message));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then(res => res.json())
      .then(resp => {
        setCustomers(resp);
        console.log(resp);
      })
      .catch(err => console.log(err.message));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = availableGoods.filter(good =>
        (good.product_name && good.product_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (good.product_code && good.product_code.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, availableGoods]);

  const handleSearch = () => {
    const result = availableGoods.find(good =>
      (good.product_name && good.product_name.toLowerCase() === searchTerm.toLowerCase()) ||
      (good.product_code && good.product_code.toLowerCase() === searchTerm.toLowerCase())
    );
    if (result) {
      handleAddGood(result);
    } else {
      alert('Product not found');
    }
  };

  const handleAddGood = (good) => {
    const newGood = { ...good, quantity };
    setSelectedGoods([...selectedGoods, newGood]);
    setTotalAmount(totalAmount + (good.selling_price * quantity) + (good.selling_price * vat * quantity));
    setSearchTerm('');
    setQuantity(1);
    setSuggestions([]);
  };

  const handleSuggestionClick = (good) => {
    setSearchTerm(good.product_name);
    setSuggestions([]);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCustomerChange = (e) => {
    const selectedCustomer = customers.find(customer => customer.name === e.target.value);
    if (selectedCustomer) {
      setCustomerName(selectedCustomer.name);
      setBillingAddress(selectedCustomer.house_number_and_street_name + ', ' + selectedCustomer.surbub);
      setCustomerCity(selectedCustomer.city);
      setCustomerCountry(selectedCustomer.country);
    } else {
      setBillingAddress('');
    }
  };

  const handleAmountGivenChange = (e) => {
    const amount = parseFloat(e.target.value);
    setAmountGiven(amount);
    if (!isNaN(amount)) {
      setChange(amount - totalAmount);
    } else {
      setChange(0);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value) || 1);
  };

  const handleClearTransaction = () => {
    setSelectedGoods([]);
    setTotalAmount(0);
    setCurrency('USD');
    setSearchTerm('');
    setAmountGiven('');
    setChange(0);
    setQuantity(1);
    setBillingAddress(''); 
  };

  const handleCompletePurchase = async () => {
    const saleRecords = await selectedGoods.map(good => ({
        sale_records_id: Number(shiftId) || 1,
        product_id: good.product_id,
        quantity: good.quantity,
        unit_cost: good.selling_price,
        selling_price: good.selling_price + (good.selling_price * vat), 
    }));

    console.log(saleRecords); 

    try {
        const response = await fetch(`${API_URL}/salelist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(saleRecords),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        alert('Purchase completed successfully!'); 
        handleClearTransaction();
    } catch (error) {
        console.error('Error completing purchase:', error);
        alert('An error occurred while completing the purchase.');
    }
};


  const BillingAddress = () => (
    <address>
      <strong>Billing Address</strong><br />
      {billingAddress || 'No address selected'}<br />
      {customerCity}<br />
      {customerCountry}
    </address>
  );

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <header className="my-4 text-center">
        <h1 className="my-4">Point of Sale System</h1>
      </header>

      <div className="row col-md-12">
        <div className="col-md-8">
          <div className="col-md-12 mb-4">
            <div className="input-group">
              <div className="mb-3">
                <select
                  className="form-control"
                  value={currency}
                  onChange={handleCustomerChange} // Use handleCustomerChange instead
                  style={{
                    borderRadius: 0,
                    backgroundColor: '#fff',
                    height: '60px'
                  }}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.customerid} value={customer.name}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
                style={{
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  width: '80px',
                  height: '60px'
                }}
              />

              <input
                type="text"
                className="form-control"
                placeholder="Scan or type item name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  borderRadius: 0,
                  backgroundColor: '#fff',
                  height: '60px'
                }}
              />

              <div className="input-group-append">
                <span className="input-group-text me-2" style={{ borderRadius: 0, backgroundColor: '#fff', height: '60px' }}>
                  <FaSearch />
                </span>
              </div>

              <button className="btn btn-primary px-3" style={{ height: '60px', fontSize: '1.5rem' }} onClick={handleSearch}>
                Add
              </button>
            </div>

            <div style={{ textAlign: 'left' }}>
              Product: {searchTerm}
            </div>

            {suggestions.length > 0 && (
              <ul className="list-group" style={{ position: 'absolute', zIndex: 1, width: '100%', maxHeight: '200px', overflowY: 'scroll' }}>
                {suggestions.map((good, index) => (
                  <li key={index} className="list-group-item" onClick={() => handleSuggestionClick(good)}>
                    {good.product_name} ({good.product_code})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-md-12">
            <div className="mb-3" style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', textAlign: 'left' }}>
              Customer Name: {customerName}
              {BillingAddress()}
              <h4>Selected Goods</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Description</th>
                    <th>Unit Cost</th>
                    <th>Quantity</th>
                    <th>VAT</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGoods.map((good, index) => (
                    <tr key={index}>
                      <td>{good.product_id}</td>
                      <td>{good.product_name}</td>
                      <td>${good.selling_price.toFixed(2)}</td>
                      <td>{good.quantity}</td>
                      <td>${(good.selling_price * vat).toFixed(2)}</td>
                      <td>${((good.selling_price * good.quantity) + (good.selling_price * vat * good.quantity)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="col-md-12">
            <div className="row mb-3">
              <h4 style={{ fontSize: '35px', fontWeight: 'bold', textAlign: 'left' }}>Total Cost: {totalAmount.toFixed(2)} {currency}</h4>
            </div>

            <div className="row mb-3" style={{ textAlign: 'left' }}>
              <h4>Choose Currency</h4>
              <select className="form-control" value={currency} onChange={handleCurrencyChange} style={{ borderRadius: 0 }}>
                <option value="USD">USD</option>
                <option value="ZIG">ZIG</option>
                <option value="RAND">RAND</option>
              </select>
            </div>

            <div className="mb-3" style={{ textAlign: 'left' }}>
              <h4>Amount Given</h4>
              <input
                type="number"
                className="form-control"
                value={amountGiven}
                onChange={handleAmountGivenChange}
                style={{ borderRadius: 0 }}
              />
            </div>

            <div className="mb-3" style={{ textAlign: 'left' }}>
              <h4>Change</h4>
              <input type="text" className="form-control" value={change.toFixed(2)} readOnly style={{ borderRadius: 0 }} />
            </div>

            <div className="d-flex justify-content-between px-4">
            <button className="btn btn-success mt-3" onClick={handleCompletePurchase}>Complete Purchase</button>
              <button className="btn btn-primary mt-3" onClick={handleClearTransaction}>Clear Transaction</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-5 text-center">
        <div className="row">
          <div className="col">
            <p>REMS ANYTHING</p>
          </div>
          <div className="col">
            <p>Branch: {branchName}</p>
          </div>
          <div className="col">
          <p>Shift ID: {shiftId ? shiftId : 'Shift closed'}</p>
          </div>
          <div className="col">
            <p>Shift Open Time: {displayTime ? displayTime : '_-_'}</p>
          </div>
          <div className="col">
            <p>Till Operator: {username}</p>
          </div>
        </div>

        <hr />

        <div className="row justify-content-end">
          <div className="col-auto">
            <button className="btn btn-danger me-2">
              <Link to="/inventory" style={{ color: 'inherit', textDecoration: 'none' }}>&nbsp; POS &nbsp;</Link>
            </button>
            <button className="btn btn-danger me-2">
              <Link to="/PettyCash" style={{ color: 'inherit', textDecoration: 'none' }}>Petty Cash</Link>
            </button>
            <button className="btn btn-danger me-2">
              <Link to="/inventory" style={{ color: 'inherit', textDecoration: 'none' }}>Inventory</Link>
            </button>
            {/* <button className="btn btn-danger me-2">
              <Link to="/openshift" style={{ color: 'inherit', textDecoration: 'none' }}>Start Shift</Link>
            </button> */}
            <button className="btn btn-danger me-2">
              <Link to="/EndShift" style={{ color: 'inherit', textDecoration: 'none' }}>End Shift</Link>
            </button>
            <button className="btn btn-danger me-2">
              <Link to="/EndShift" style={{ color: 'inherit', textDecoration: 'none' }}>Control Panel</Link>
            </button>
            <button className="btn btn-danger me-2">
              <Link to="/EndShift" style={{ color: 'inherit', textDecoration: 'none' }}>Reports</Link>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PosHome;
