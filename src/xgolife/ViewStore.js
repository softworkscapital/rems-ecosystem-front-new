import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, InputGroup, Alert } from "react-bootstrap";
import { API_URL } from "./config";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import CompanyBranchCards from "./components/CompanyBranchCards";
import ProductModals from "./components/ProductModals";
import ProductDisplay from "./components/ProductDisplay";

function ViewStore() {
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [branchName, setBranchName] = useState("");
  
  const [newProduct, setNewProduct] = useState({
    product_code: "",
    product_brand: "",
    product_name: "",
    product_type: "",
    category: "",
    sub_category: "",
    sub_sub_category: "",
    unit_of_measure: "",
    unit_size: "",
    description_notes: "",
    sold_units_count: 0,
    shipping_days: 0,
    condition: "",
    images: [],
    unit_cost: 0,
    selling_price: 0,
  });

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [addQuantity, setAddQuantity] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/productdefinition`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const companyId = localStorage.getItem("selectedCompanyId");
    const branchId = localStorage.getItem("selectedBranchId");
    
    localStorage.setItem("company_id", companyId);
    localStorage.setItem("branch_id", branchId);

    fetchProducts();
  }, []);

  // Filter items based on search term
  const filteredItems = items.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Modal handlers
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewProduct({
      product_code: "",
      product_brand: "",
      product_name: "",
      product_type: "",
      category: "",
      sub_category: "",
      sub_sub_category: "",
      unit_of_measure: "",
      unit_size: "",
      description_notes: "",
      sold_units_count: 0,
      shipping_days: 0,
      condition: "",
      images: [],
      unit_cost: 0,
      selling_price: 0,
    });
  };

  const handleCloseAddProductModal = () => setShowAddProductModal(false);

  return (
    <div className="bg-light min-vh-100">
      <div className="d-flex">
        <div style={{ width: "250px" }}>
          <SideBar />
        </div>

        <Container fluid className="px-4">
          <TopBar />
          <CompanyBranchCards companyName="Rems Anything" branchName={branchName} />

          {/* Action Buttons and Search */}
          <Row className="mb-4">
            <Col md={6} className="d-flex gap-2">
              <Button variant="warning" onClick={() => setShowCreateModal(true)}>
                Create Product
              </Button>
              <Button variant="success" onClick={() => setShowAddProductModal(true)}>
                Add to Stock
              </Button>
            </Col>
          
          </Row>

          {/* Error Alert */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Product Display */}
          <ProductDisplay 
            items={filteredItems}
            loading={loading}
            error={error}
            currentItems={currentItems}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            setLoading={setLoading}
          />

          {/* Modals for Creating and Adding Products */}
          <ProductModals 
            showCreateModal={showCreateModal} 
            showAddProductModal={showAddProductModal} 
            handleCloseCreateModal={handleCloseCreateModal} 
            handleCloseAddProductModal={handleCloseAddProductModal} 
            newProduct={newProduct} 
            setNewProduct={setNewProduct} 
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
            setError={setError} 
            setLoading={setLoading}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct} 
            selectedProductID={selectedProductID}
            setSelectedProductID={setSelectedProductID} 
            addQuantity={addQuantity}
            setAddQuantity={setAddQuantity} 
          />
        </Container>
      </div>
    </div>
  );
}

export default ViewStore;