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
  const syncid = "";
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
  const [branchName, setBranchName] = useState("");
  const branchId = localStorage.getItem("branch_id");
  const companyId = localStorage.getItem("company_id");
  const userId = localStorage.getItem("user_id"); // Assuming user ID is stored in local storage
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductID, setSelectedProductID] = useState("");
  const [addQuantity, setAddQuantity] = useState(0);
  const [products, setProducts] = useState([]);

  // Handle modal shows and closes
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
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
    setShowCreateModal(false);
  };

  const handleShowAddProductModal = () => setShowAddProductModal(true);
  const handleCloseAddProductModal = () => {
    setSelectedProduct("");
    setAddQuantity(0);
    setShowAddProductModal(false);
  };

  const handleCreateProduct = async () => {
    const syncid = "abcd123"; // Use a fixed sync ID or generate as needed

    try {
      // Upload images and collect their URLs
      const imageUploadPromises = Array.from(newProduct.images).map(async (file) => {
        const formDataToUpload = new FormData();
        formDataToUpload.append('company_id', companyId);
        formDataToUpload.append('branch_id', branchId);
        formDataToUpload.append('syncid', syncid);
        formDataToUpload.append('image', file); // Ensure this matches your server's expectation

        const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
          method: "POST",
          body: formDataToUpload,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to upload image: ${errorData.message || response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Uploaded Image URL:", responseData.path); // Log the image URL from the backend
        return responseData.path; // Adjust according to your response structure
      });

      // Wait for all uploads to complete
      const uploadedImageUrls = await Promise.all(imageUploadPromises);
      console.log("All Uploaded Image URLs:", uploadedImageUrls); // Log all uploaded image URLs

      // Prepare product data with image URLs
      const productData = {
        product_code: newProduct.product_code,
        product_brand: newProduct.product_brand,
        product_name: newProduct.product_name,
        product_type: newProduct.product_type,
        category: newProduct.category,
        sub_category: newProduct.sub_category,
        sub_sub_category: newProduct.sub_sub_category,
        unit_of_measure: newProduct.unit_of_measure,
        unit_size: newProduct.unit_size,
        description_notes: newProduct.description_notes,
        sub_notes: newProduct.sub_notes,
        sold_units_count: newProduct.sold_units_count,
        shipping_days: newProduct.shipping_days,
        condition: newProduct.condition,
        uploaded_product_image_ref: uploadedImageUrls, // Use the array of uploaded image URLs
        company_id: companyId,
        branch_id: branchId,
        syncid: syncid,
      };

      console.log("Object being posted to products_defination:", productData); // Log the product data

      const createProductResponse = await fetch(`${API_URL}/productdefinition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (createProductResponse.ok) {
        alert("Product created successfully");
        // Removed redirect after success
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
      company_id: companyId,
      branch_id: branchId,
      product_id: selectedProductID,
      qty_purchased: addQuantity,
      qty_sold: 0, // Assuming this is initially 0
      qty_balance: addQuantity,
      product_value_cost: null, // Set to null or any relevant default
      product_value_selling_price: null, // Set to null or any relevant default
      unit_cost: null, // Set to null or any relevant default
      selling_price: null, // Set to null or any relevant default
      pic1: null, // Placeholder for image 1
      pic2: null, // Placeholder for image 2
      pic3: null, // Placeholder for image 3
      syncid: syncid,
      date_time: new Date().toISOString(), // Current date and time
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
        // Removed redirect after success
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
            <Col key={item.inventory_mgt_id} md={3} className="mb-4"> {/* Changed md={4} to md={3} for 4 cards in a row */}
              <div style={{ border: '2px solid #FFD700', borderRadius: '8px', backgroundColor: '#fff', padding: '15px' }}>
                <img
                  src={(item.images && item.images.length > 0) ? item.images[0] : defaultImage}
                  alt={item.product_name}
                  style={{ width: '40%', height: '100px', objectFit: 'cover', marginBottom: '10px' }} // Reduced image size
                />
                <h5 style={{ marginBottom: '5px', fontWeight: 'bold' }}>{item.product_name}</h5>
                <p style={{ marginBottom: '5px' }}>Available Quantity: {item.qty_balance}</p>
                <p style={{ marginBottom: '5px' }}>Unit Cost: ${item.unit_cost}</p>
                <p style={{ marginBottom: '0' }}>Selling Price: ${item.selling_price}</p>
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
              <Form.Group controlId="productBrand" className="mt-3">
                <Form.Label>Product Brand</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.product_brand}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product_brand: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="productName" className="mt-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.product_name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product_name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="productType" className="mt-3">
                <Form.Label>Product Type</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.product_type}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, product_type: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="category" className="mt-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="subCategory" className="mt-3">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.sub_category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sub_category: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="subSubCategory" className="mt-3">
                <Form.Label>Sub Sub Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.sub_sub_category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sub_sub_category: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="unitOfMeasure" className="mt-3">
                <Form.Label>Unit of Measure</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.unit_of_measure}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, unit_of_measure: e.target.value })
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
              <Form.Group controlId="descriptionNotes" className="mt-3">
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
              <Form.Group controlId="subNotes" className="mt-3">
                <Form.Label>Sub Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newProduct.sub_notes}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sub_notes: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="soldUnitsCount" className="mt-3">
                <Form.Label>Sold Units Count</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.sold_units_count}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sold_units_count: parseInt(e.target.value) || 0 })
                  }
                />
              </Form.Group>
              <Form.Group controlId="shippingDays" className="mt-3">
                <Form.Label>Shipping Days</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.shipping_days}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, shipping_days: parseInt(e.target.value) || 0 })
                  }
                />
              </Form.Group>
              <Form.Group controlId="condition" className="mt-3">
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.condition}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, condition: e.target.value })
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
              Save
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