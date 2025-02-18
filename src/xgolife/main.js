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
  Card,
  Badge,
  Spinner,
  Alert,
  Pagination,
  Toast,
} from "react-bootstrap";
import { API_URL, UPLOADS_API_URL } from "./config";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import defaultImage from "./assets/default.png";

function ViewStore() {
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [formErrors, setFormErrors] = useState({});
  const [branchName, setBranchName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductID, setSelectedProductID] = useState("");
  const [addQuantity, setAddQuantity] = useState(0);
  const [products, setProducts] = useState([]);
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
    sub_notes: "",
    sold_units_count: 0,
    shipping_days: 0,
    condition: "",
    images: [],
  });

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/productdefinition`);
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // Handle showing the Add Product modal and fetching products
  const handleShowAddProductModal = async () => {
    setLoading(true);
    setError(null);

    const companyId = localStorage.getItem("company_id");
    const branchId = localStorage.getItem("branch_id");

    try {
      const response = await fetch(`${API_URL}/productdefinition?company_id=${companyId}&branch_id=${branchId}`);
      const data = await response.json();
      setProducts(data); // Populate dropdown with fetched products
      setShowAddProductModal(true);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!newProduct.product_code) errors.product_code = "Product code is required";
    if (!newProduct.product_name) errors.product_name = "Product name is required";
    if (!newProduct.category) errors.category = "Category is required";
    return errors;
  };

  // Create product
  const handleCreateProduct = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const imageUploadPromises = Array.from(newProduct.images).map(async (file) => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('image', file);
        const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
          method: "POST",
          body: formDataToUpload,
        });
        if (!response.ok) throw new Error("Image upload failed");
        const responseData = await response.json();
        return responseData.path;
      });

      const uploadedImageUrls = await Promise.all(imageUploadPromises);
      const companyId = localStorage.getItem("company_id");
      const branchId = localStorage.getItem("branch_id");
      const productData = { 
        ...newProduct, 
        uploaded_product_image_ref: uploadedImageUrls,
        company_id: companyId,
        branch_id: branchId,
      };

      const createProductResponse = await fetch(`${API_URL}/productdefinition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (createProductResponse.ok) {
        setToastMessage("Product created successfully!");
        setShowToast(true);
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
          sub_notes: "",
          sold_units_count: 0,
          shipping_days: 0,
          condition: "",
          images: [],
        });
      } else {
        throw new Error("Failed to create product");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add product to stock
  const handleAddProductToStock = async () => {
    if (!selectedProductID || addQuantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    const productToAdd = {
      company_id: localStorage.getItem("company_id"),
      branch_id: localStorage.getItem("branch_id"),
      product_id: selectedProductID,
      qty_purchased: addQuantity,
      qty_sold: 0,
      qty_balance: addQuantity,
      syncid: "abcd123", // Example sync ID
      date_time: new Date().toISOString(),
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
        setShowAddProductModal(false);
      } else {
        throw new Error("Failed to add product to stock");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter and sort items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.product_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.product_name.localeCompare(b.product_name);
      case "price":
        return a.selling_price - b.selling_price;
      case "quantity":
        return b.qty_balance - a.qty_balance;
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  return (
    <div className="bg-light min-vh-100">
      <div className="d-flex">
        <div style={{ width: "250px" }}>
          <SideBar />
        </div>
        
        <Container fluid className="px-4">
          <TopBar />

          {/* Header Section */}
          <div className="py-4 text-center">
            <h2 className="mb-1">XGoLife Market Store</h2>
            <h4 className="text-muted mb-4">Store Management</h4>
            <Row className="justify-content-center">
              <Col md={4}>
                <Card className="shadow-sm border-warning">
                  <Card.Body>
                    <h6 className="mb-2">Company</h6>
                    <p className="mb-0 text-primary">Rems Anything</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-warning">
                  <Card.Body>
                    <h6 className="mb-2">Branch</h6>
                    <p className="mb-0 text-primary">{branchName}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Action Buttons and Search */}
          <Row className="mb-4">
            <Col md={6} className="d-flex gap-2">
              <Button
                variant="warning" // Changed to yellow theme
                onClick={handleShowCreateModal}
                className="d-flex align-items-center"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Create Product
              </Button>
              <Button
                variant="success"
                onClick={handleShowAddProductModal}
                className="d-flex align-items-center"
              >
                <i className="bi bi-box-seam me-2"></i>
                Add to Stock
              </Button>
            </Col>
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DropdownButton
                  variant="outline-secondary"
                  title={`Sort by: ${sortBy}`}
                >
                  <Dropdown.Item onClick={() => setSortBy("name")}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("price")}>Price</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("quantity")}>Quantity</Dropdown.Item>
                </DropdownButton>
              </InputGroup>
            </Col>
          </Row>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              {currentItems.map((item) => (
                <Col key={item.inventory_mgt_id} md={3} className="mb-4">
                  <Card className="h-100 shadow-sm border-warning"> {/* Yellow outline */}
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={item.uploaded_product_image_ref?.[0] || defaultImage}
                        style={{ height: "100px", objectFit: "cover" }} // Reduced image size
                      />
                      {item.qty_balance < 10 && (
                        <Badge
                          bg="warning"
                          className="position-absolute top-0 end-0 m-2"
                        >
                          Low Stock
                        </Badge>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title className="h5 mb-2">{item.product_name}</Card.Title>
                      <Card.Text className="text-muted small mb-2">{item.product_brand}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge bg="info">{item.category}</Badge>
                        <span className="text-success fw-bold">${item.selling_price}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">In Stock: {item.qty_balance}</small>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedProduct(item.product_name);
                            setSelectedProductID(item.product_id);
                            handleShowAddProductModal();
                          }}
                        >
                          Add Stock
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
              <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
            </Pagination>
          </div>

          {/* Toast Notification */}
          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            className="position-fixed bottom-0 end-0 m-3"
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </Container>
      </div>

      {/* Create Product Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="productCode">
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.product_code}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product_code: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productBrand">
                  <Form.Label>Product Brand</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.product_brand}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product_brand: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.product_name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product_name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="productType">
                  <Form.Label>Product Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.product_type}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, product_type: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="subCategory">
                  <Form.Label>Sub Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.sub_category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sub_category: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="subSubCategory">
                  <Form.Label>Sub Sub Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.sub_sub_category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sub_sub_category: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="unitOfMeasure">
                  <Form.Label>Unit of Measure</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.unit_of_measure}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit_of_measure: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="unitSize">
                  <Form.Label>Unit Size</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.unit_size}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, unit_size: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="descriptionNotes">
                  <Form.Label>Description Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newProduct.description_notes}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description_notes: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="soldUnitsCount">
                <Form.Label>Sold Units Count</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.sold_units_count}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sold_units_count: parseInt(e.target.value) || 0 })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="shippingDays">
                  <Form.Label>Shipping Days</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.shipping_days}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, shipping_days: parseInt(e.target.value) || 0 })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="condition">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.condition}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, condition: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Product to Stock Modal */}
      <Modal show={showAddProductModal} onHide={() => setShowAddProductModal(false)}>
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
          <Button variant="secondary" onClick={() => setShowAddProductModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProductToStock}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewStore;