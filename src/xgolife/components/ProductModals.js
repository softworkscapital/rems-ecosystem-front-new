import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, DropdownButton, Dropdown, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { API_URL, UPLOADS_API_URL } from "../config";

const colors = [
  "Red", "Blue", "Green", "Yellow", "Black", "White", "Purple", "Orange", "Pink", "Brown",
];

const ProductModals = ({
  showCreateModal,
  showAddProductModal,
  handleCloseCreateModal,
  handleCloseAddProductModal,
  newProduct,
  setNewProduct,
  selectedProduct,
  setSelectedProduct,
  selectedProductID,
  setSelectedProductID,
  addQuantity,
  setAddQuantity,
  setLoading,
}) => {
  const [availableProducts, setAvailableProducts] = useState([]);

  const validateForm = () => {
    const errors = {};
    if (!newProduct.product_code) errors.product_code = "Product code is required.";
    if (!newProduct.product_name) errors.product_name = "Product name is required.";
    return errors;
  };

  useEffect(() => {
    const fetchAvailableProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/productdefinition`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const companyId = localStorage.getItem("company_id");
        const branchId = localStorage.getItem("branch_id");

        const filteredProducts = data.filter(product =>
          product.company_id === parseInt(companyId) && product.branch_id === parseInt(branchId)
        );

        setAvailableProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching available products:", error);
      }
    };

    fetchAvailableProducts();
  }, []);

  const uploadImages = async (companyId, branchId) => {
    const imageUploadPromises = Array.from(newProduct.images).map(async (file) => {
      const formDataToUpload = new FormData();
      formDataToUpload.append('company_id', companyId);
      formDataToUpload.append('branch_id', branchId);
      formDataToUpload.append('image', file);

      try {
        const response = await fetch(`${UPLOADS_API_URL}/uploads`, {
          method: "POST",
          body: formDataToUpload,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to upload image: ${errorData.message || response.statusText}`);
        }
        const responseData = await response.json();
        return responseData.path;
      } catch (error) {
        console.error('Upload error:', error);
        throw new Error(`Error uploading image: ${error.message}`);
      }
    });

    return Promise.all(imageUploadPromises);
  };

  const handleCreateProduct = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: Object.values(errors).join(', '),
      });
      return;
    }

    setLoading(true);
    try {
      const companyId = localStorage.getItem("company_id");
      const branchId = localStorage.getItem("branch_id");

      if (!companyId || !branchId) {
        Swal.fire({
          icon: 'error',
          title: 'Missing Information',
          text: 'Company ID and Branch ID must be set in local storage.',
        });
        return;
      }

      const uploadedImageUrls = await uploadImages(companyId, branchId);

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
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product created successfully!',
        });
        resetNewProduct();
        handleCloseCreateModal();
        window.location.reload(); // Reload the page to reflect the new product
      } else {
        throw new Error("Failed to create product");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductToStock = async () => {
    if (!selectedProductID || addQuantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please select a product and enter a valid quantity.',
      });
      return;
    }

    setLoading(true);
    try {
      const companyId = localStorage.getItem("company_id");
      const branchId = localStorage.getItem("branch_id");
      const dateTime = new Date().toISOString(); // Current date and time
      const unitCost = newProduct.unit_cost; // Assuming this is from the newProduct state
      const sellingPrice = newProduct.selling_price; // Assuming this is from the newProduct state
      const productValueCost = unitCost * addQuantity; // Total cost for the quantity
      const productValueSellingPrice = sellingPrice * addQuantity; // Total selling price for the quantity

      const requestBody = {
        inventory_mgt_id: null, // Assuming this will be auto-generated by the server
        company_id: companyId,
        branch_id: branchId,
        sale_records_id: null, // Assuming you might need to set this or manage it differently
        product_id: selectedProductID,
        date_time: dateTime,
        qty_purchased: addQuantity,
        qty_sold: 0, // Assuming you are starting with zero sold
        qty_balance: addQuantity, // Assuming balance is the same as purchased initially
        product_value_cost: productValueCost,
        product_value_selling_price: productValueSellingPrice,
        unit_cost: unitCost,
        selling_price: sellingPrice,
        pic1: newProduct.images[0] ? newProduct.images[0].name : null, // Assuming you want the first image's name
        pic2: newProduct.images[1] ? newProduct.images[1].name : null, // Second image
        pic3: newProduct.images[2] ? newProduct.images[2].name : null, // Third image
        syncid: null, // Assuming you will handle this later
      };

      // Log the object being sent
      console.log("Sending to inventory_mgt:", requestBody);

      const response = await fetch(`${API_URL}/inventorymgt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Product added to stock successfully!',
        });
        window.location.reload(); // Reload the page to see the added products
      } else {
        throw new Error('Failed to add product to stock');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetNewProduct = () => {
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
      color: "", // Reset color field
      images: [],
      unit_cost: 0,
      selling_price: 0,
    });
  };

  return (
    <>
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
              <Col md={6}>
                <Form.Group controlId="color">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    as="select"
                    value={newProduct.color}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, color: e.target.value })
                    }
                  >
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </Form.Control>
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
              {availableProducts.length > 0 ? (
                availableProducts.map((product) => (
                  <Dropdown.Item
                    key={product.product_id}
                    onClick={() => {
                      setSelectedProduct(product.product_name);
                      setSelectedProductID(product.product_id); // Store the product_id
                    }}
                  >
                    {product.product_name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No products available</Dropdown.Item>
              )}
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
          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="unitCost">
                <Form.Label>Unit Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.unit_cost}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, unit_cost: parseFloat(e.target.value) || 0 })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="sellingPrice">
                <Form.Label>Selling Price</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.selling_price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, selling_price: parseFloat(e.target.value) || 0 })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
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
    </>
  );
};

export default ProductModals;