import React, { useState } from "react";
import { Button, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import { API_URL } from "./component/config";

const AddInvestmentFund = () => {
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    purpose: "",
    name: "",
    created_by: "",
    created_date: "",
    authorised_by_1: userId,
    authorised_by_2: "waiting authorisation",
    authorised_by_3: "waiting authorisation",
    bank_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Before Submit:", formData); // Log the form data

    try {
      const response = await fetch(
        `${API_URL}/fin_acc_investment_fund_details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      console.log("API Response:", result); // Log the API response

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      alert("Investment Fund Details submitted successfully!");
      navigate("/some-other-route");
    } catch (error) {
      console.error("Error:", error);
      alert("There was a problem submitting your details.");
    }
  };

  return (
    <div className="d-flex">
      <div style={{ width: "250px" }}>
        <SideBar />
      </div>
      <div className="flex-fill">
        <TopNav />
        <div
          className="container d-flex flex-column align-items-center justify-content-center"
          style={{ maxWidth: "80%", height: "80vh" }}
        >
          <h1 className="mt-4">Investment Fund Details</h1>
          <form onSubmit={handleSubmit} className="w-100">
            <Row className="mb-4">
              <Col xs={12}>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Name"
                    aria-label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Purpose"
                    aria-label="Purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                    style={{ width: "300px" }} // Adjust the width as needed
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Created By"
                    aria-label="Created By"
                    name="created_by"
                    value={formData.created_by}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    type="date"
                    name="created_date"
                    value={formData.created_date}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Authorised By 1"
                    aria-label="Authorised By 1"
                    name="authorised_by_1"
                    value={formData.authorised_by_1}
                    onChange={handleChange}
                    required
                    readOnly // Add this line to make the input uneditable
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <FormControl
                    placeholder="Bank ID"
                    aria-label="Bank ID"
                    name="bank_id"
                    value={formData.bank_id}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AddInvestmentFund;
