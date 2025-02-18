import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { API_URL } from "../config"; 

const CompanyBranchCards = () => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [branchDetails, setBranchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyError, setCompanyError] = useState(null);
  const [branchError, setBranchError] = useState(null);
  
  const companyId = localStorage.getItem("selectedCompanyId"); 
  const branchId = localStorage.getItem("selectedBranchId");

  useEffect(() => {
    const fetchCompanyAndBranchDetails = async () => {
      if (!companyId || !branchId) {
        console.error("Company ID or Branch ID is missing from local storage.");
        setLoading(false);
        return;
      }

      // Fetch Company Details
      try {
        const companyResponse = await fetch(`${API_URL}/companysetup/${companyId}`);
        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company data");
        }
        const companyData = await companyResponse.json();
        setCompanyDetails(companyData);

      } catch (error) {
        setCompanyError("No company details found.");
        console.error("Error fetching company data:", error);
      }

      // Fetch Branch Details
      try {
        const branchResponse = await fetch(`${API_URL}/branches/${branchId}`);
        if (!branchResponse.ok) {
          throw new Error("Failed to fetch branch data");
        }
        const branchData = await branchResponse.json();
        console.log("Fetched Branch Details:", branchData); // Log branch details
        
        // Assuming branchData is an array and we want the first item
        if (branchData.length > 0) {
          setBranchDetails(branchData[0]); // Set the first branch object
        } else {
          setBranchError("No branch details found.");
        }

      } catch (error) {
        setBranchError("No branch details found.");
        console.error("Error fetching branch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAndBranchDetails();
  }, [companyId, branchId]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Row className="justify-content-center" style={{ marginTop: "30px", marginBottom: "30px" }}>
      <Col md={4}>
        <Card className="shadow-sm border-warning">
          <Card.Body>
            <h6 className="mb-2">Company</h6>
            {companyError ? (
              <Alert variant="danger">{companyError}</Alert>
            ) : (
              companyDetails && (
                <>
                  <p className="mb-0 text-primary">{companyDetails.name}</p>
                  <p>{companyDetails.address}</p>
                </>
              )
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="shadow-sm border-warning">
          <Card.Body>
            <h6 className="mb-2">Branch</h6>
            {branchError ? (
              <Alert variant="danger">{branchError}</Alert>
            ) : (
              branchDetails && (
                <>
                  <p className="mb-0 text-primary">{branchDetails.branch_name}</p>
                  <Row>
                    <Col>
                      <p>Location: {branchDetails.branch_location}</p>
                    </Col>
                    <Col>
                      <p>City: {branchDetails.branch_city}</p>
                    </Col>
                  </Row>
                </>
              )
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CompanyBranchCards;