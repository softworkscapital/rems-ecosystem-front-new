import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import CustomerCard from './component/CustomerCard';
import Swal from 'sweetalert2';
import { PENSION_API_URL } from './component/config';

const PensionHome = () => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [pensionPlans, setPensionPlans] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${PENSION_API_URL}/members`);
        if (!response.ok) throw new Error('Failed to load customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        Swal.fire({ icon: 'error', title: 'Error', text: error.message });
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = customers.filter(customer =>
        customer.membership_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(results);
    } else {
      setFilteredCustomers([]);
      setPensionPlans([]); // Clear pension plans when search term is cleared
    }
  }, [searchTerm, customers]);

  const handleSelectCustomer = async (customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setSearchTerm(customer.membership_id);
      setFilteredCustomers([]);
      await fetchPensionPlans(customer.membership_id);
    }
  };

  const fetchPensionPlans = async (memberId) => {
    try {
      const response = await fetch(`${PENSION_API_URL}/member_products/product-plan/${memberId}`);
      if (!response.ok) throw new Error('Failed to load pension plans');
      const data = await response.json();
      setPensionPlans(Array.isArray(data) ? data : []);
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: error.message });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCustomer(null);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCustomer(null);
    setFilteredCustomers([]);
  };

  return (
    <div className="d-flex">
      <div style={{ width: '250px' }}>
        <SideBar />
      </div>
      <div className="flex-fill">
        <TopNav />
        <div className="container" style={{ maxWidth: '90%', height: '80vh', marginBottom: 75 }}>
          <div style={{ marginTop: 80 }}>
            <InputGroup>
              <FormControl
                placeholder="Search members by ID"
                aria-label="Search members"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="primary" onClick={handleClear}>
                Clear
              </Button>
            </InputGroup>

            <div className="search-results" style={{ textAlign: 'left', backgroundColor: 'white', cursor: 'pointer', marginTop: '10px' }}>
              {filteredCustomers.map(customer => (
                <div
                  key={customer.membership_id}
                  className="search-result"
                  onClick={() => handleSelectCustomer(customer)}
                  style={{ padding: '5px', borderBottom: '1px solid #ccc' }}
                >
                  {customer.membership_id} - {customer.name}
                </div>
              ))}
            </div>

            {selectedCustomer ? (
              <div className="text-start">
                <CustomerCard customer={selectedCustomer} />
              </div>
            ) : (
              searchTerm.length > 2 ? null : (
                <div className="alert alert-info" role="alert">
                  No user selected yet.
                </div>
              )
            )}
          </div>

          <div className="pension-plans mt-4">
            <h3 className="text-center">Pension Plans</h3>
            <hr style={{ width: '100%' }} />
            {pensionPlans.length > 0 ? (
              <Row>
                {pensionPlans.map(plan => (
                  <Col xs={12} sm={6} md={4} key={plan.product_name}>
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5 className="card-title">{plan.product_name}</h5>
                        <p className="card-text text-start">{plan.product_description}</p>
                        <p className="card-text text-start"><strong>Contribution Amount:</strong> {plan.contribution_amount}</p>
                        <p className="card-text text-start"><strong>Product Type:</strong> {plan.pension_product_type}</p>
                        <p className="card-text text-start"><strong>Contribution Frequency:</strong> {plan.contribution_frequency}</p>
                        <p className="card-text text-start"><strong>Contribution Variance:</strong> {plan.contribution_variance}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center">No pension plans available.</div>
            )}
          </div>
          
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PensionHome;