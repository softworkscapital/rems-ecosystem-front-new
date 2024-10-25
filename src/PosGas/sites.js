import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import Swal from "sweetalert2";
import { API_URL } from "../config";
import { Modal, Button, Card } from 'react-bootstrap';

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

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("company_id");
    setCompanyId(storedCompanyId);



    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API_URL}/sales_prices`);
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
          const response = await fetch(
            `${API_URL}/branches/company/${companyId}`
          );
          const data = await response.json();
          setBranches(data);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchBranches();
  }, [companyId]);



  const handlePriceChange = (category, value) => {
    setPrices(prevPrices => ({
      ...prevPrices,
      [category]: value,
    }));
  };





  useEffect(() => {
    const fetchPrices = async () => {
      if (selectedBranch) {
        try {
          const response = await fetch(
            `${API_URL}/prices/branch/${selectedBranch.branch_id}`
          );
          const data = await response.json();
          const pricesMap = {};
          data.forEach(price => {
            pricesMap[price.category] = price.price;
          });
          setPrices(pricesMap);
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    fetchPrices();
  }, [selectedBranch]);




  const handleBranchChange = (event) => {
    const selectedId = event.target.value;
    const branch = branches.find(
      (branch) => branch.branch_id === parseInt(selectedId)
    );
    setSelectedBranch(branch);
  };

  const handlePriceEdit = () => {
    setShowPriceModal(true);
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
  };


//   const handleInsertPrices = async () => {


// setlpgas_wholesale_cash_price(er);


// handleActualInsertPrices(lpgas_wholesale_cash_price,"lpgas_wholesale_cash");

//   }




  const handleActualInsertPrices = async (newPrice,itemType) => {
    try {
      const userId = localStorage.getItem("user");
  
      const response = await fetch(`${API_URL}/salesprices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prices: newPrice,
            sales_prices_id: null,
            item: itemType,
            price: price,
            changed_by: userId || "Unknown User", // Use the user ID or a default value
            changed_on: new Date().toISOString(),
            company_id: companyId,
            branch_id: selectedBranch.branch_id,
            sync_date_time: new Date().toISOString(),
            sync_id: null,
            sync_status: 'pending',
        
        }),
      });
  
      if (response.ok) {
        const insertedData = await response.json();
        const pricesMap = {};
        insertedData.forEach(price => {
          pricesMap[price.item] = price.price; // Update state with new prices
        });
        setPrices(pricesMap);
        handleClosePriceModal(); // Close modal after successful insertion
      } else {
        const errorData = await response.json(); // Get error details from the response
        console.error('Failed to insert prices:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to insert prices. Please try again.',
          footer: `<p>${errorData.message || 'Unknown error occurred.'}</p>`, // Optional: Display any message from the server
        });
      }
    } catch (error) {
      console.error('Error saving prices:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
      });
    }
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
              <div className="col-md-12" style={{ maxWidth: "78%" }}>
                <Card style={{ padding: "20px" }}>
                  <Card.Body>
                    <Card.Title>{selectedBranch.branch_name}</Card.Title>
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



            
                {/* 
                <div className="row col-md-6" align="left" style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
                <div className="col-md-12 mb-2" align="left"><strong>images</strong></div>
                  <div className="col-md-12" align="left"></div>
                </div>

                <div className="row col-md-6" align="left" style={{ paddingLeft: "20px", marginRight: "20px", paddingBottom: "20px", height: "100px", overflow: "scroll" }}>
                  <div className="col-md-12" align="center"><strong>Users</strong></div>
                  <div className="row" align="left">
                    <div className="col-md-4">TBA</div>
                    <div className="col-md-8"></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8"></div>

                  </div>
                </div>

                <div className="row col-md-6" align="left" style={{ paddingLeft: "20px", paddingBottom: "20px" }}>
                <div className="col-md-12 mb-2" align="left"><strong>Inventory Info:</strong></div>
                  <div className="row" align="left">
                    <div className="col-md-8">Current Inventory Level</div>
                    <div className="col-md-4">{selectedBranch.inventory_level} KG</div>
                    <div className="col-md-8">Storage Capacity:</div>
                    <div className="col-md-4">{selectedBranch.inventory_storage_capacity} KG</div>
                    <div className="col-md-8"><strong>Reorder Level:</strong></div>
                    <div className="col-md-4">{selectedBranch.branch_reorder_level_kgs} KG</div>
                  </div>
                </div> */}



            {/* Prices Card */}
            <div className="row" style={{ marginTop: "20px", justifyContent: "flex-end" }}>
              <div className="col-md-12" style={{ maxWidth: "78%" }}>
                <Card style={{ padding: "20px" }}>
                  <Card.Body>
                    <Card.Title>Prices</Card.Title>
                    <div className="row" style={{ textAlign: 'left' }}>
                      {priceCategories.map(category => (
                        <div key={category} className="col-md-12" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                          <strong>{category.replace(/_/g, ' ')}</strong>
                          <span>${prices[category] || 0}</span>
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
          <Button variant="primary" onClick={handleInsertPrices}>Save Changes</Button>
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