import React, { useEffect, useState } from "react";
import SideBar from "../PosGas/SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";
import { Modal, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const priceCategories = [
  "lpgas_wholesale_cash",
  "lpgas_wholesale_eco",
  "lpgas_wholesale_usd",
  "lpgas_wholesale_zpt",
  "lpgas_wholesale_zar",
  "lpgas_retail_cash",
  "lpgas_retail_eco",
  "lpgas_retail_usd",
  "lpgas_retail_zpt",
  "lpgas_retail_zar",
];

const MySite = () => {
  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [companyId, setCompanyId] = useState();
  const [prices, setPrices] = useState({});
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [loading, setLoading] = useState(false); // Define loading state

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("company_id");
    setCompanyId(storedCompanyId);
    console.log("sfdgcghjkl", storedCompanyId);

    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API_URL}/companies`);
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      if (companyId) {
        try {
          const response = await fetch(`${API_URL}/branches/company/${companyId}`);
          const data = await response.json();
          setBranches(data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchBranches();
  }, [companyId]);

  useEffect(() => {
    const fetchPrices = async () => {
      const storedCompanyId = localStorage.getItem("company_id"); // Get company_id from local storage
      if (selectedBranch) {
        try {
          // Use selectedBranch.branch_id and storedCompanyId
          const response = await fetch(`${API_URL}/salesprices/lastprice/branchid/${selectedBranch.branch_id}/companyid/${storedCompanyId}`);
          const data = await response.json();

          console.log(data); // Log the fetched data for debugging
          const pricesMap = {};

          // Populate the pricesMap from the fetched data
          data.forEach(price => {
            pricesMap[price.item] = price.price; // Use item as key
          });

          setPrices(pricesMap); // Update state with the populated prices map

        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchPrices();
  }, [selectedBranch]); // Remove companyId from dependencies, as it's now retrieved from localStorage

  const handleBranchChange = (event) => {
    const selectedId = event.target.value;
    const branch = branches.find(branch => branch.branch_id === parseInt(selectedId));
    setSelectedBranch(branch);
  };

  const handlePriceEdit = () => {
    setShowPriceModal(true);
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
  };

  const handleActualInsertPrices = async (pricesToInsert) => {
    const userId = localStorage.getItem("user") || "Unknown User";
    const now = new Date().toISOString();
    
    // Show loading indicator
    setLoading(true);

    try {
      for (const priceEntry of pricesToInsert) {
        const priceData = {
          sales_prices_id: null,
          item: priceEntry.itemType,
          price: priceEntry.price,
          changed_by: userId,
          changed_on: now,
          company_id: companyId,
          branch_id: selectedBranch.branch_id,
          sync_date_time: now,
          sync_id: null,
          sync_status: 'Pending',
        };

        const response = await fetch(`${API_URL}/salesprices`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(priceData),
        });

        const responseText = await response.text();

        if (!response.ok) {
          console.error('Failed to insert price:', responseText);
          const errorData = JSON.parse(responseText);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Failed to insert price for ${priceEntry.itemType}.`,
            footer: `<p>${errorData.message || 'Unknown error occurred.'}</p>`,
          });
          continue;
        }

        const insertedData = JSON.parse(responseText);
        console.log('Inserted price:', insertedData);
      }

      handleClosePriceModal();
    } catch (error) {
      console.error('Error saving prices:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (category, value) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [category]: value,
    }));
  };

  const handleSavePrices = () => {
    const pricesToInsert = priceCategories.map(category => ({
      itemType: category,
      price: prices[category] || 0,
    }));

    handleActualInsertPrices(pricesToInsert);
  };

  return (
    <div className="dashboard-main-wrapper">
      <TopNav />
      <SideBar />

      <div className="container-fluid dashboard-content" style={{ textAlign: "center" }}>
        <div className="row" style={{ marginLeft: "1%", marginTop: "20px" }}>
          <h5 className="header" style={{ fontFamily: "sans-serif" }}>
            My Sites
          </h5>

          <div className="col-12">
            <select
              className="form-select"
              onChange={handleBranchChange}
              style={{ margin: "0 auto", width: "50%" }}
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedBranch && (
          <>
            {/* Branch Details Card */}
            <div className="row" style={{ marginTop: "20px", justifyContent: "flex-end" }}>
              <div className="col-md-12" style={{ maxWidth: "70%" }}>
                <Card style={{ padding: "20px" }}>
                  <Card.Body>
                    {/* Centered Branch Name */}
                    <Card.Title className="text-center">{selectedBranch.branch_name}</Card.Title> 

                    <h5 style={{ fontWeight: 'bold', fontSize: 'small', textAlign: 'left' }}>Branch Details</h5>
                    <div className="row" align="left">
                      <div className="col-md-4">Branch:</div>
                      <div className="col-md-8">{selectedBranch.branch_name}</div> 
                      <div className="col-md-4">Location:</div>
                      <div className="col-md-8">{selectedBranch.branch_location}</div>
                      <div className="col-md-4">City:</div>
                      <div className="col-md-8">{selectedBranch.branch_city}</div>
                      <div className="col-md-4">Phone:</div>
                      <div className="col-md-8">{selectedBranch.phone}</div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* Prices Card */}
            <div className="row" style={{ marginTop: "20px", justifyContent: "flex-end" }}>
              <div className="col-md-12" style={{ maxWidth: "70%" }}>
                <Card style={{ padding: "20px" }}>
                  <Card.Body>
                    <Card.Title>Prices</Card.Title>
                    <div className="row" style={{ textAlign: 'left' }}>
                      {priceCategories.map(category => (
                        <div key={category} className="col-md-12" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                          <strong>{category.replace(/_/g, ' ')}</strong>
                          <span>${prices[category] !== undefined ? prices[category] : 0}</span> {/* Ensure safe access */}
                        </div>
                      ))}
                    </div>
                    <Button variant="primary" onClick={handlePriceEdit} style={{ marginTop: '15px' }}>Edit Prices</Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Price Edit Modal */}
      <Modal show={showPriceModal} onHide={handleClosePriceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Prices for {selectedBranch?.branch_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {priceCategories.map(category => (
            <div key={category} className="d-flex align-items-center" style={{ marginBottom: '15px' }}>
              <label style={{ width: '50%', margin: 0 }}>{category.replace(/_/g, ' ')}</label>
              <input
                type="number"
                value={prices[category] || 0}
                onChange={(e) => handlePriceChange(category, e.target.value)}
                style={{ marginLeft: '10px', width: '50%' }}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePriceModal}>Close</Button>
          <Button variant="primary" onClick={handleSavePrices} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ width: "100%", float: "right" }}>
        <Footer />
      </div>

      <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
      <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
      <script src="../assets/vendor/slimscroll/jquery.slimscroll.js"></script>
      <script src="../assets/libs/js/main-js.js"></script>
    </div>
  );
};

export default MySite;