import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from "./component/SideBar";
import TopNav from './component/TopNav';
import income from '../Pension/component/images/customer.svg'; 
import { PENSION_API_URL } from './component/config';
import {
  FaTrash,
  FaChevronDown,
} from "react-icons/fa";

const CustomerProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerData, setCustomerData] = useState({}); // Initialize to an empty object
  const [pensionPlans, setPensionPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [beneficiaries, setBeneficiaries] = useState([]);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    surname: "",
    relationship: "",
    dob: "",
    current_country: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);

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

  const handleAddBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.surname) {
      setBeneficiaries([
        ...beneficiaries,
        { id: beneficiaries.length + 1, ...newBeneficiary },
      ]);
      setNewBeneficiary({
        name: "",
        surname: "",
        relationship: "",
        dob: "",
        current_country: "",
      });
    }
  };

  const handleRemoveBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter((ben) => ben.id !== id));
  };

  const handleExitCustomer = (reason) => {
    alert(`Exiting customer profile due to: ${reason}`);
    setIsExitOpen(false);
  };


  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = customers.filter(customer =>
        customer.membership_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(results);
    } else {
      setFilteredCustomers([]);
    }
  }, [searchTerm, customers]);

  const handleSelectCustomer = async (customer) => {
    if (customer) {
      setSelectedCustomer(customer);
      setSearchTerm(customer.membership_id);
      setFilteredCustomers([]);
      await fetchPensionPlans(customer.membership_id);
      setCustomerData(customer); // Assuming customer has the needed info
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
    <div className="profile-page-container" style={{ display: "flex" }}>
      <TopNav />
      <Sidebar />
      <div className="main-content" style={{ flex: 1, padding: "2rem", backgroundColor: "#f8f9fc", width: "calc(100% - 16.6667%)", marginLeft: "16.6667%" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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

            {selectedCustomer && (
              <div className="text-start">
                <div className="card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">Customer Details</h6>
                  </div>
                  <div className="container">
  <div className="row">

    <div className="col-md-3">
      <div className="card-body text-center mb-3">
        <FaUserCircle className="img-fluid" style={{ fontSize: "100px", color: "#007bff" }} />
        <h4 className="mb-1">{`${selectedCustomer.name} ${selectedCustomer.surname}`}</h4>
        <p className="text-muted">{selectedCustomer.email}</p>
      </div>
    </div>

    
    <div className="col-md-9">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <strong>Membership ID:</strong><br />
            <strong>Date of Birth:</strong><br />
            <strong>Account Type:</strong><br />
            <strong>Membership Status:</strong><br />
            <strong>Phone:</strong><br />
          </div>
          <div className="col-md-6">
            {selectedCustomer.membership_id}<br />
            {selectedCustomer.dob}<br />
            {selectedCustomer.account_type}<br />
            {selectedCustomer.membershipstatus}<br />
            {selectedCustomer.phone}<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
                </div>

                {/* Address Section */}
                <div className="card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">Address</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Address:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.address || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>City:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.city || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Country:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.country || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Suburb:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.suburb || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Work Address:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.workaddress || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>House No:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.house_number_and_street_name || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employer Information Card */}
                <div className="card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">Employer Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Employer:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.employer || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Company Name:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.company_name || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Company ID:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.company_id || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Work Industry:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.workindustry || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information Card */}
                <div className="card shadow mb-4">
                  <div className="card-header">
                    <h6 className="m-0 font-weight-bold text-primary">Financial Information</h6>
                  </div>
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Contributed Principal Balance:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.contributed_principal_balance || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Cost Price:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.cost_price || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Credit Standing:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.creditstanding || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Payment Style:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.payment_style || ''}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>Default Subscription:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.defaultsubs || ''}
                          readOnly
                        />
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <strong>VAT Number:</strong>
                      </div>
                      <div className="col-md-3" style={{ textAlign: "left" }}>
                        <input
                          type="text"
                          className="form-control"
                          value={customerData.vat_number || ''}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {!selectedCustomer && (
            <img
              src={income}
              alt="Default Customer"
              className="img-fluid mb-3"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "contain",
              }}
            />
          )}


         {/* Beneficiaries Section */}
{selectedCustomer && (
  <div className="card shadow mb-4">
    <div className="card-header py-3 d-flex justify-content-between align-items-center">
      <h6 className="m-0 font-weight-bold text-primary">Beneficiaries</h6>
      <FaChevronDown
        onClick={() => setIsFormOpen(!isFormOpen)}
        style={{ cursor: "pointer" }}
      />
    </div>

    {isFormOpen && (
      <div className="card-body">
        <div className="mb-3">
          <h6>Add Beneficiary</h6>
          <div className="row mb-2">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <strong>Name:</strong>
            </div>
            <div className="col-md-9" style={{ textAlign: "left" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newBeneficiary.name}
                onChange={(e) =>
                  setNewBeneficiary({
                    ...newBeneficiary,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <strong>Surname:</strong>
            </div>
            <div className="col-md-9" style={{ textAlign: "left" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                value={newBeneficiary.surname}
                onChange={(e) =>
                  setNewBeneficiary({
                    ...newBeneficiary,
                    surname: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <strong>Relationship:</strong>
            </div>
            <div className="col-md-9" style={{ textAlign: "left" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Relationship"
                value={newBeneficiary.relationship}
                onChange={(e) =>
                  setNewBeneficiary({
                    ...newBeneficiary,
                    relationship: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <strong>Date of Birth:</strong>
            </div>
            <div className="col-md-9" style={{ textAlign: "left" }}>
              <input
                type="date"
                className="form-control"
                value={newBeneficiary.dob}
                onChange={(e) =>
                  setNewBeneficiary({
                    ...newBeneficiary,
                    dob: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-3" style={{ textAlign: "left" }}>
              <strong>Country:</strong>
            </div>
            <div className="col-md-9" style={{ textAlign: "left" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={newBeneficiary.current_country}
                onChange={(e) =>
                  setNewBeneficiary({
                    ...newBeneficiary,
                    current_country: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={handleAddBeneficiary}
          >
            Add Beneficiary
          </button>
        </div>
      </div>
    )}

    <div className="card-body">
      <h6>Current Beneficiaries</h6>
      <div className="row">
        {beneficiaries.map((ben) => (
          <div key={ben.id} className="col-md-6 mb-2">
            <div
              className="card shadow"
              style={{
                backgroundColor: "#e9ecef",
                borderRadius: "10px",
              }}
            >
              <div className="card-body" style={{ textAlign: "left" }}>
                <h5>
                  {ben.name} {ben.surname}
                </h5>
                <p>
                  <strong>Relationship:</strong> {ben.relationship}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {ben.dob}
                </p>
                <p>
                  <strong>Country:</strong> {ben.current_country}
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveBeneficiary(ben.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {beneficiaries.length === 0 && <p>No beneficiaries added.</p>}
    </div>
  </div>
)}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerProfile;