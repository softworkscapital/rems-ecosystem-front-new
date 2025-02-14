import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { API_URL, UPLOADS_API_URL } from './config'; // Ensure API_URL and UPLOADS_API_URL point to your backend
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import defaultImage from './assets/default.png'; // Import the default image

function ViewStore() {
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    qty_balance: 0,
    unit_cost: 0,
    selling_price: 0,
    unit_of_measure: "",
    unit_size: "",
    images: [],
  });
  const [branchName, setBranchName] = useState("");
  const branchId = localStorage.getItem("branch_id");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductID, setSelectedProductID] = useState("");
  const [addQuantity, setAddQuantity] = useState(0);
  const [products, setProducts] = useState([]);

  // Handle modal shows and closes
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    setNewProduct({
      product_name: "",
      qty_balance: 0,
      unit_cost: 0,
      selling_price: 0,
      unit_of_measure: "",
      unit_size: "",
      images: [],
    });
    setShowCreateModal(false);
  };

  const handleShowAddProductModal = () => setShowAddProductModal(true);
  const handleCloseAddProductModal = () => {
    setSelectedProduct("");
    setAddQuantity(0);
    setShowAddProductModal(false);
  };

  const handleCreateProduct = async () => {
    const companyId = localStorage.getItem("async_client_profile_id");
    const syncid = "abcd123";

    // Create FormData object for image uploads
    const formData = new FormData();
    formData.append('company_id', companyId);
    formData.append('branch_id', branchId);
    formData.append('syncid', syncid);
    formData.append('product_name', newProduct.product_name);
    formData.append('unit_of_measure', newProduct.unit_of_measure);
    formData.append('unit_size', newProduct.unit_size);
    formData.append('qty_balance', newProduct.qty_balance);
    formData.append('unit_cost', newProduct.unit_cost);
    formData.append('selling_price', newProduct.selling_price);

    // Append images to FormData
    Array.from(newProduct.images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const createProductResponse = await fetch(`${API_URL}/productdefinition`, {
        method: "POST",
        body: formData,
      });

      if (createProductResponse.ok) {
        alert("Product created successfully");
        window.location.href = "http://localhost:3000/inventory"; // Redirect after success
      } else {
        throw new Error('Failed to create product');
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred while creating the product.");
    }

    handleCloseCreateModal();
  };

  const handleAddProductToStock = async () => {
    if (!selectedProductID || addQuantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    const productToAdd = {
      company_id: localStorage.getItem("async_client_profile_id"),
      branch_id: branchId,
      product_id: selectedProductID,
      qty_purchased: addQuantity,
      qty_balance: addQuantity,
      syncid: "abcd123",
    };

    try {
      const response = await fetch(`${API_URL}/inventorymgt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      });

      if (response.ok) {
        alert("Product added to stock successfully");
        window.location.href = "http://localhost:3000/inventory"; // Redirect after success
      } else {
        throw new Error('Failed to add product to stock');
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occurred while adding the product to stock.");
    }

    handleCloseAddProductModal();
  };

  useEffect(() => {
    fetch(`${API_URL}/branches/${branchId}`)
      .then((res) => res.json())
      .then((resp) => {
        setBranchName(resp[0]?.branch_name || "Unknown Branch");
      })
      .catch((err) => console.log(err.message));
  }, [branchId]);

  useEffect(() => {
    fetch(`${API_URL}/inventorymgt/inventory/products`)
      .then((res) => res.json())
      .then((resp) => {
        setItems(resp);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/productdefinition`)
      .then((res) => res.json())
      .then((resp) => {
        setProducts(resp);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div style={{ display: 'flex', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div style={{ width: '250px' }}>
        <SideBar />
      </div>
      <Container fluid style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <TopBar style={{ margin: '0' }} />

        <header className="text-center my-4">
          <h3>XGoLife Market Store</h3>
          <h3>Store Management</h3>
          <Row className="justify-content-center">
            <Col md="auto">
              <h5 className="text-secondary">Company: Rems Anything</h5>
            </Col>
            <Col md="auto">
              <h5 className="text-secondary">Branch: {branchName}</h5>
            </Col>
          </Row>
        </header>

        <Row className="mb-3">
          <Col>
            <Button variant="warning" onClick={handleShowCreateModal} className="me-2">
              Create Product
            </Button>
            <Button variant="warning" onClick={handleShowAddProductModal}>
              Add Product to Stock
            </Button>
          </Col>
        </Row>

        <Row>
          {items.map((item) => (
            <Col key={item.inventory_mgt_id} md={4} className="mb-4">
              <div style={{ border: '2px solid #FFD700', borderRadius: '8px', backgroundColor: '#fff', padding: '20px' }}>
                <h5>{item.product_name}</h5>
                <p>Available Quantity: {item.qty_balance}</p>
                <p>Unit Cost: ${item.unit_cost}</p>
                <p>Selling Price: ${item.selling_price}</p>
                <img
                  src={(item.images && item.images.length > 0) ? item.images[0] : defaultImage}
                  alt={item.product_name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
            </Col>
          ))}
        </Row>

        {/* Create Product Modal */}
        <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.product_name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      product_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="unitOfMeasure" className="mt-3">
                <Form.Label>Unit of Measure</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.unit_of_measure}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      unit_of_measure: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="unitSize" className="mt-3">
                <Form.Label>Unit Size</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.unit_size}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, unit_size: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="productImages" className="mt-3">
                <Form.Label>Select Product Images (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setNewProduct({ ...newProduct, images: e.target.files })}
                />
              </Form.Group>
              {newProduct.images.length > 0 && (
                <div className="mt-3">
                  <h5>Selected Images:</h5>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {Array.from(newProduct.images).map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Product ${index}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateProduct}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Product to Stock Modal */}
        <Modal show={showAddProductModal} onHide={handleCloseAddProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product to Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Select Product..."
                value={selectedProduct}
                readOnly
              />
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Select Product"
                id="input-group-dropdown-1"
              >
                {products.map((product) => (
                  <Dropdown.Item
                    key={product.product_id}
                    onClick={() => {
                      setSelectedProduct(product.product_name);
                      setSelectedProductID(product.product_id);
                    }}
                  >
                    {product.product_name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup>
            <Form.Group controlId="addQuantity">
              <Form.Label>Quantity to Add</Form.Label>
              <Form.Control
                type="number"
                value={addQuantity}
                onChange={(e) => setAddQuantity(parseInt(e.target.value) || 0)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddProductModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddProductToStock}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default ViewStore;