import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { API_URL, UPLOADS_URL } from "../config";
import TopNav from "./TopNav";
import SideBar from "./SideBar";

function Inventory() {
  const [items, setItems] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductID, setSelectedProductID] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [addQuantity, setAddQuantity] = useState(0);

  const branchId = localStorage.getItem("branch_id");
  const [branchName, setBranchName] = useState();

  // State variables for user inputs
  const [productValueCost, setProductValueCost] = useState(0);
  const [productValueSellingPrice, setProductValueSellingPrice] = useState(0);
  const [unitCost, setUnitCost] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);

  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => {
    // Clear the new product state on close
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

  const handleShowUpdateModal = (product) => {
    setCurrentProduct(product);
    setShowUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowAddProductModal = () => setShowAddProductModal(true);
  const handleCloseAddProductModal = () => {
    setSelectedProduct("");
    setAddQuantity(0);
    setShowAddProductModal(false);
  };

  const handleCreateProduct = async () => {
    const companyId = localStorage.getItem("async_client_profile_id");
    const branchId = localStorage.getItem("branch_id");
    const syncid = "abcd123";
  
    // Create FormData object for image uploads
    const imageUploadPromises = newProduct.images.slice(0, 3).map(async (image) => {
      const formData = new FormData();
      formData.append('company_id', companyId);
      formData.append('branch_id', branchId);
      formData.append('syncid', syncid);
      formData.append('image', image);
  
      const response = await fetch(`${UPLOADS_URL}/uploads`, {
        method: "POST",
        body: formData,
      });
  
      // Log the response status and body
      const responseData = await response.json();
      console.log("Image upload response:", responseData); // Log the image upload response
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      return responseData.path; // Adjust according to your response structure
    });
  
    try {
      // Wait for all image uploads to complete
      const uploadedImagePaths = await Promise.all(imageUploadPromises);
      
      // Log all uploaded image paths
      console.log("All Uploaded Image Paths:", uploadedImagePaths);
  
      // Prepare product data with the uploaded image paths
      const productData = {
        company_id: companyId,
        branch_id: branchId,
        syncid: syncid,
        product_name: newProduct.product_name,
        unit_of_measure: newProduct.unit_of_measure,
        unit_size: newProduct.unit_size,
        qty_balance: newProduct.qty_balance,
        unit_cost: newProduct.unit_cost,
        selling_price: newProduct.selling_price,
        images: uploadedImagePaths // This will now contain multiple paths
      };
  
      // Send product data to your product creation endpoint
      const createProductResponse = await fetch(`${API_URL}/productdefinition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
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

  const handleUpdateProduct = () => {
    updateProducts();
  };

  const handleDeleteProduct = (id) => {
    const updatedItems = items.filter((item) => item.inventory_mgt_id !== id);
    setItems(updatedItems);
  };

  const handleAddProductToStock = () => {
    if (!selectedProduct || addQuantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    const productToPost = {
      company_id: localStorage.getItem("async_client_profile_id"),
      branch_id: localStorage.getItem("branch_id"),
      sale_records_id: "sale123",
      branch_location_notes: "Main Branch",
      product_id: selectedProductID,
      date_time: new Date().toISOString(),
      qty_purchased: addQuantity,
      qty_sold: 0,
      qty_balance: addQuantity,
      product_value_cost: parseFloat(productValueCost),
      product_value_selling_price: parseFloat(productValueSellingPrice),
      unit_cost: parseFloat(unitCost),
      selling_price: parseFloat(sellingPrice),
      syncid: "abcd123",
    };

    fetch(`${API_URL}/inventorymgt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToPost),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Product added to stock successfully");
          window.location.href = "http://localhost:3000/inventory";
        } else {
          alert("Failed to add product to stock. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert("An error occurred while adding the product.");
      });

    handleCloseAddProductModal();
  };

  useEffect(() => {
    fetch(`${API_URL}/branches/${branchId}`)
      .then((res) => res.json())
      .then((resp) => {
        setBranchName(resp[0].branch_name);
      })
      .catch((err) => console.log(err.message));
  }, [branchId]);

  useEffect(() => {
    fetch(`${API_URL}/inventorymgt/inventory/products`)
      .then((res) => res.json())
      .then((resp) => {
        setItems(resp);
        setAvailableProducts(resp);
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

  const filteredProducts = availableProducts.filter((product) =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateProducts = () => {
    fetch(`${API_URL}/inventorymgt/${currentProduct.inventory_mgt_id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(currentProduct),
    })
      .then((res) => {
        if (res.ok) {
          alert("Updated successfully");
          window.location.reload();
        } else {
          throw new Error("Failed to update");
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert("Failed to update");
      });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct({ ...newProduct, images: files });
  };

  return (
    <div>
      <TopNav />
      <SideBar />
      <Container style={{ maxWidth: '80%', height: '80vh' }}>
        <header className="text-center my-4">
          <h1>Rems POS</h1>
          <h1>Inventory Management</h1>
          <Row className="justify-content-center">
            <Col md="auto">
              <h4 className="text-secondary">Company: Rems Anything</h4>
            </Col>
            <Col md="auto">
              <h4 className="text-secondary">Branch: {branchName}</h4>
            </Col>
          </Row>
        </header>

        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              onClick={handleShowCreateModal}
              className="me-2"
            >
              Create Product
            </Button>
            <Button variant="success" onClick={handleShowAddProductModal}>
              Add Product
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover style={{ marginLeft: 130, marginBottom: 150 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Available Quantity</th>
              <th>Unit Cost</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.inventory_mgt_id}>
                <td>{item.inventory_mgt_id}</td>
                <td>{item.product_name}</td>
                <td>{item.qty_balance}</td>
                <td>${item.unit_cost}</td>
                <td>${item.selling_price}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleShowUpdateModal(item)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(item.inventory_mgt_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

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
                  onChange={handleImageChange}
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

        {/* Update Product Modal */}
        <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentProduct?.product_name || ""}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      product_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="productQuantity" className="mt-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct?.qty_balance || 0}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      qty_balance: parseInt(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="unitCost" className="mt-3">
                <Form.Label>Unit Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct?.unit_cost || 0}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      unit_cost: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="sellingPrice" className="mt-3">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  value={currentProduct?.selling_price || 0}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      selling_price: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateProduct}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Product Modal */}
        <Modal show={showAddProductModal} onHide={handleCloseAddProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product to Stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search for product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DropdownButton
                as={InputGroup.Append}
                variant="outline-secondary"
                title="Select Product"
                id="input-group-dropdown-2"
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
            <Form.Group controlId="selectedProduct">
              <Form.Label>Selected Product</Form.Label>
              <Form.Control type="text" readOnly value={selectedProduct} />
            </Form.Group>
            <Form.Group controlId="addQuantity" className="mt-3">
              <Form.Label>Quantity to Add</Form.Label>
              <Form.Control
                type="number"
                value={addQuantity}
                onChange={(e) => setAddQuantity(parseInt(e.target.value) || 0)}
              />
            </Form.Group>
            <Form.Group controlId="productValueCost" className="mt-3">
              <Form.Label>Product Value Cost</Form.Label>
              <Form.Control
                type="number"
                value={productValueCost}
                onChange={(e) =>
                  setProductValueCost(parseFloat(e.target.value) || 0)
                }
              />
            </Form.Group>
            <Form.Group controlId="productValueSellingPrice" className="mt-3">
              <Form.Label>Product Value Selling Price</Form.Label>
              <Form.Control
                type="number"
                value={productValueSellingPrice}
                onChange={(e) =>
                  setProductValueSellingPrice(parseFloat(e.target.value) || 0)
                }
              />
            </Form.Group>
            <Form.Group controlId="unitCost" className="mt-3">
              <Form.Label>Unit Cost</Form.Label>
              <Form.Control
                type="number"
                value={unitCost}
                onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
              />
            </Form.Group>
            <Form.Group controlId="sellingPrice" className="mt-3">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                value={sellingPrice}
                onChange={(e) =>
                  setSellingPrice(parseFloat(e.target.value) || 0)
                }
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

export default Inventory;