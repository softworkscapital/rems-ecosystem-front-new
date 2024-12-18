import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSearch,
  FaUserCircle,
  FaTrash,
  FaChevronDown,
  FaEdit,
} from "react-icons/fa";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from "./component/SideBar";
import TopNav from './component/TopNav';
import income from '../Pension/component/images/customer.svg'; 

const CustomerProfile = () => {
  const [searchId, setSearchId] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: "Alice", surname: "Smith", relationship: "Spouse", dob: "1985-05-15", current_country: "USA" },
    { id: 2, name: "Bob", surname: "Johnson", relationship: "Child", dob: "2010-08-20", current_country: "USA" },
  ]);
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    surname: "",
    relationship: "",
    dob: "",
    current_country: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExitOpen, setIsExitOpen] = useState(false);

  // Sample customer data for demonstration
  const defaultCustomerData = {
    id: "123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    address: "123 Tech Street, Silicon Valley",
    bio: "Passionate developer with 5 years of experience in web development.",
    profession: "Senior Web Developer",
    pensionPlans: [
      {
        pension_product_id: "P1",
        currency: "USD",
        contribution_amount: 500,
        contribution_frequency: "Monthly",
        product_name: "Retirement Plan A",
        product_description: "A solid retirement plan with steady growth.",
        minimum_contribution: 100,
        estimate_payout: 200000,
      },
      {
        pension_product_id: "P2",
        currency: "USD",
        contribution_amount: 300,
        contribution_frequency: "Monthly",
        product_name: "Pension Plan B",
        product_description: "Flexible pension plan with variable contributions.",
        minimum_contribution: 50,
        estimate_payout: 150000,
      },
    ],
  };

  const handleInputChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleSearch = () => {
    if (searchId === defaultCustomerData.id) {
      setCustomerData(defaultCustomerData);
      setIsEditing(false); // Reset editing state
    } else {
      setCustomerData(null);
    }
  };

  const handleAddBeneficiary = () => {
    if (newBeneficiary.name && newBeneficiary.surname) {
      setBeneficiaries([...beneficiaries, { id: beneficiaries.length + 1, ...newBeneficiary }]);
      setNewBeneficiary({ name: "", surname: "", relationship: "", dob: "", current_country: "" });
    }
  };

  const handleRemoveBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter(ben => ben.id !== id));
  };

  const handleEditCustomer = () => {
    setIsEditing(!isEditing);
  };

  const handleExitCustomer = (reason) => {
    // Handle exit customer logic based on reason (death or disability)
    alert(`Exiting customer profile due to: ${reason}`);
    setIsExitOpen(false); // Close dropdown after selection
  };

  return (
    <div className="profile-page-container" style={{ display: "flex" }}>
      <TopNav />
      <Sidebar />
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: "2rem",
          backgroundColor: "#f8f9fc",
          width: "calc(100% - 16.6667%)",
          marginLeft: "16.6667%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="row" style={{ marginTop: 70 }}>
            {/* Search Section */}
            <div className="col-md-12 mb-4 text-center">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Customer ID"
                  value={searchId}
                  onChange={handleInputChange}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    <FaSearch />
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Profile Section */}
            <div className="col-md-12 text-center">
              {!customerData ? (
                <img
                  src={income}
                  alt="Default Customer"
                  className="img-fluid mb-3"
                  style={{ width: "500px", height: "500px", objectFit: "contain" }}
                />
              ) : (
                <div className="row">
                  {/* Profile Image Card */}
                  <div className="col-md-2 text-center">
                    <div className="card shadow mb-4">
                      <div className="card-body">
                        <FaUserCircle className="img-fluid mb-3" style={{ fontSize: "100px", color: "#007bff" }} />
                        <h4 className="mb-1">{`${customerData.firstName} ${customerData.lastName}`}</h4>
                        <p className="text-muted">{customerData.profession}</p>
                        <button className="btn btn-warning btn-sm" onClick={handleEditCustomer}>
                          <FaEdit /> Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information Section */}
                  <div className="col-md-10">
                    <div className="card shadow mb-4">
                      <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">
                          Personal Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  value={isEditing ? newBeneficiary.name : customerData.firstName}
                                  onChange={(e) => isEditing && setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                                  readOnly={!isEditing}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  value={isEditing ? newBeneficiary.surname : customerData.lastName}
                                  onChange={(e) => isEditing && setNewBeneficiary({ ...newBeneficiary, surname: e.target.value })}
                                  readOnly={!isEditing}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  value={customerData.email}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Phone</label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="phone"
                                  value={customerData.phone}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Address</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={customerData.address}
                              readOnly
                            />
                          </div>

                          <div className="form-group">
                            <label>Bio</label>
                            <textarea
                              className="form-control"
                              name="bio"
                              rows="3"
                              value={customerData.bio}
                              readOnly
                            />
                          </div>
                        </form>
                      </div>
                    </div>

                    {/* Pension Plans Section */}
                    <div className="row">
                      {customerData.pensionPlans.map(plan => (
                        <div key={plan.pension_product_id} className="col-md-6 mb-4">
                          <div className="card shadow" style={{ backgroundColor: "#f0f8ff", borderRadius: "10px" }}>
                            <div className="card-header" style={{ backgroundColor: "#007bff", color: "#fff", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                              <h5 style={{ textAlign: "left" }}>{plan.product_name}</h5>
                            </div>
                            <div className="card-body" style={{ textAlign: "left" }}>
                              <p><strong>Description:</strong> {plan.product_description}</p>
                              <p><strong>Contribution Amount:</strong> {plan.currency} {plan.contribution_amount}</p>
                              <p><strong>Frequency:</strong> {plan.contribution_frequency}</p>
                              <p><strong>Minimum Contribution:</strong> {plan.currency} {plan.minimum_contribution}</p>
                              <p><strong>Estimated Payout:</strong> {plan.currency} {plan.estimate_payout}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-md-12 mb-4">
                        <button className="btn btn-primary">Add New Plan</button>
                      </div>
                    </div>

                    {/* Beneficiaries Section */}
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
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              value={newBeneficiary.name}
                              onChange={(e) => setNewBeneficiary({ ...newBeneficiary, name: e.target.value })}
                            />
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Surname"
                              value={newBeneficiary.surname}
                              onChange={(e) => setNewBeneficiary({ ...newBeneficiary, surname: e.target.value })}
                            />
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Relationship"
                              value={newBeneficiary.relationship}
                              onChange={(e) => setNewBeneficiary({ ...newBeneficiary, relationship: e.target.value })}
                            />
                            <input
                              type="date"
                              className="form-control mt-2"
                              value={newBeneficiary.dob}
                              onChange={(e) => setNewBeneficiary({ ...newBeneficiary, dob: e.target.value })}
                            />
                            <input
                              type="text"
                              className="form-control mt-2"
                              placeholder="Country"
                              value={newBeneficiary.current_country}
                              onChange={(e) => setNewBeneficiary({ ...newBeneficiary, current_country: e.target.value })}
                            />
                            <button className="btn btn-primary mt-2" onClick={handleAddBeneficiary}>
                              Add Beneficiary
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="card-body">
                        <h6>Current Beneficiaries</h6>
                        <div className="row">
                          {beneficiaries.map(ben => (
                            <div key={ben.id} className="col-md-6 mb-2">
                              <div className="card shadow" style={{ backgroundColor: "#e9ecef", borderRadius: "10px" }}>
                                <div className="card-body" style={{ textAlign: "left" }}>
                                  <h5>{ben.name} {ben.surname}</h5>
                                  <p><strong>Relationship:</strong> {ben.relationship}</p>
                                  <p><strong>Date of Birth:</strong> {ben.dob}</p>
                                  <p><strong>Country:</strong> {ben.current_country}</p>
                                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveBeneficiary(ben.id)}>
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

                    {/* Exit Customer Dropdown */}
                    {customerData && (
                      <div className="card shadow mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h6 className="m-0 font-weight-bold text-danger">Exit Customer Profile</h6>
                          <FaChevronDown 
                            onClick={() => setIsExitOpen(!isExitOpen)} 
                            style={{ cursor: "pointer" }} 
                          />
                        </div>
                        {isExitOpen && (
                          <div className="card-body">
                            <button className="btn btn-danger mr-2" onClick={() => handleExitCustomer("Death")}>
                              By Death
                            </button>
                            <button className="btn btn-warning" onClick={() => handleExitCustomer("Disability")}>
                              By Disability
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerProfile;