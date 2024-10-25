import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { Button, Card, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config'; // Adjust the path as necessary

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(""); // State for selected branch
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState();

  // Fetch companies and set companyId from localStorage when component mounts
  useEffect(() => {
    const storedCompanyId = localStorage.getItem("company_id");
    setCompanyId(storedCompanyId);

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

  // Fetch branches whenever companyId changes
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

  const handleBranchChange = (event) => {
    const selectedId = event.target.value;
    const branch = branches.find(
      (branch) => branch.branch_id === parseInt(selectedId)
    );
    setSelectedBranch(branch);
  };

  // Fetch products and filter based on company_id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/`); // Use the imported API_URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched products:', data); // Log the fetched data

        // Filter products based on company_id
        const storedCompanyId = localStorage.getItem("company_id");
        const availableProducts = data.filter(product => product.company_id !== storedCompanyId);
        
        setProducts(data); // Set all products (optional)
        setFilteredProducts(availableProducts); // Set filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleBuyProduct = (product) => {
    navigate('/BuyProduct', { state: { product } });
    handleCloseModal(); // Close the modal after navigating
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1 }}>
        <SideBar />
        <div style={{ padding: 16, flex: 1, marginLeft: '20px' }}>
          <h4 style={{ fontSize: 24, marginTop: 60 }}>Market</h4>

          {/* Row for Create Product Button and Dropdown */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Button onClick={() => navigate('/CreateProduct')} style={{ marginRight: '10px' }}>
              Create Product
            </Button>
            <select
              className="form-select"
              onChange={handleBranchChange}
              style={{ backgroundColor: 'white', borderColor: '#ced4da', marginLeft: 50, marginRight: 70, maxWidth: 200 }}
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.branch_id} value={branch.branch_id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px', marginBottom: 100, marginLeft: 300 }}>
            {filteredProducts.map(product => (
              <Card key={product.product_id} style={{ width: '28%', margin: '1rem' }}>
                <Card.Body>
                  <Card.Title style={{ textAlign: 'left' }}>{product.product_type}</Card.Title>
                  <Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ textAlign: 'left' }}><strong>Description:</strong></span>
                      <span style={{ textAlign: 'right' }}>{product.description}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ textAlign: 'left' }}><strong>Total Volume:</strong></span>
                      <span style={{ textAlign: 'right' }}>{product.volume} {product.metric_measurement}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ textAlign: 'left' }}><strong>Unit Cost:</strong></span>
                      <span style={{ textAlign: 'right' }}>${product.unit_cost}</span>
                    </div>
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleCardClick(product)}>View Details</Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* Product Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProduct?.product_type}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProduct && (
                <>
                  <p><strong>Description:</strong> {selectedProduct.description}</p>
                  <p><strong>Location:</strong> {selectedProduct.location}</p>
                  <p><strong>Availability Date:</strong> {selectedProduct.date}</p>
                  <p><strong>Unit Cost:</strong> ${selectedProduct.unit_cost}</p>
                  <p><strong>Volume:</strong> {selectedProduct.volume} {selectedProduct.metric_measurement}</p>
                  <p><strong>Company Name:</strong> {selectedProduct.company_name}</p>
                  <p><strong>Payment Using:</strong> {selectedProduct.payment_using}</p>
                  <p><strong>Payment When:</strong> {selectedProduct.payment_when}</p>
                  <p><strong>Transport Rate:</strong> ${selectedProduct.transport_rate}</p>
                  <Button variant="success" onClick={() => handleBuyProduct(selectedProduct)}>Buy</Button>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProducts;