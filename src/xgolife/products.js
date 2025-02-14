import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../xgolife/SideBar'; 
import TopBar from '../xgolife/TopBar';   

const ViewStore = () => {
  const initialCategories = [
    { 
      name: 'Electronics', 
      products: [
        { id: 1, name: 'Smartphone', description: 'Latest model smartphone', price: 699.99, quantity: 10, image: '' },
        { id: 2, name: 'Laptop', description: 'High-performance laptop', price: 1299.99, quantity: 5, image: '' },
        { id: 3, name: 'Headphones', description: 'Noise-cancelling headphones', price: 199.99, quantity: 15, image: '' },
        { id: 4, name: 'Smartwatch', description: 'Feature-rich smartwatch', price: 249.99, quantity: 8, image: '' },
      ]
    },
    { 
      name: 'Groceries', 
      products: [
        { id: 5, name: 'Organic Apples', description: 'Fresh organic apples', price: 2.99, quantity: 50, image: '' },
        { id: 6, name: 'Whole Grain Bread', description: 'Nutritious whole grain bread', price: 3.49, quantity: 30, image: '' },
        { id: 7, name: 'Milk', description: 'Organic whole milk', price: 1.99, quantity: 20, image: '' },
        { id: 8, name: 'Eggs', description: 'Free-range eggs', price: 3.99, quantity: 12, image: '' },
      ]
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', quantity: '', image: null });
  const [showModal, setShowModal] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);

  const handleCreateProduct = () => {
    if (newProduct.name) {
      const productWithImage = { ...newProduct, id: Date.now() };
      const updatedCategories = categories.map(category => {
        if (category.name === selectedCategory || selectedCategory === 'All') {
          return {
            ...category,
            products: [...category.products, productWithImage],
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewProduct({ name: '', description: '', price: '', quantity: '', image: null });
      setShowModal(false);
    }
  };

  const allProducts = categories.flatMap(category => category.products);

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TopBar />
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '20px' }}>
        <div className="container py-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="mb-4 text-center fw-bold">Store Inventory</h2>

            {/* Buttons to Open Modal */}
            <div className="mb-4 d-flex justify-content-center">
              <button className="btn btn-primary me-2" onClick={() => { setShowModal(true); setIsCreatingProduct(true); }}>Create Product</button>
              <button className="btn btn-success" onClick={() => { setShowModal(true); setIsCreatingProduct(false); }}>Add Inventory</button>
            </div>

            {/* Category Dropdown and Search Box in a Row */}
            <div className="mb-4 d-flex align-items-center">
              <select 
                className="form-select me-2" 
                onChange={(e) => setSelectedCategory(e.target.value)} 
                value={selectedCategory}
              >
                <option value="All">All Products</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <label className="me-2" htmlFor="productSearch">Products:</label>
              <input 
                id="productSearch" 
                type="text" 
                className="form-control" 
                placeholder="Search Products..." 
              />
            </div>

            {/* Display Products for Selected Category or All Products */}
            <div className="row g-3">
              {(selectedCategory === 'All' ? allProducts : categories.find(category => category.name === selectedCategory).products).map((item) => (
                <motion.div
                  key={item.id}
                  className="col-md-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="card h-100" style={{ borderColor: '#FFC000', backgroundColor: '#ffffff' }}>
                    <img src={item.image} alt={item.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                      <p className="card-text"><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for Creating Product and Adding Inventory */}
      {showModal && (
        <div className="modal show d-block" style={{ zIndex: 1050 }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isCreatingProduct ? 'Create New Product' : 'Add Inventory'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {isCreatingProduct ? (
                  <>
                    <input 
                      type="text" 
                      className="form-control mb-2" 
                      placeholder="Product Name" 
                      value={newProduct.name} 
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                    />
                    <input 
                      type="text" 
                      className="form-control mb-2" 
                      placeholder="Description" 
                      value={newProduct.description} 
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} 
                    />
                    <input 
                      type="number" 
                      className="form-control mb-2" 
                      placeholder="Price" 
                      value={newProduct.price} 
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                    />
                    <input 
                      type="number" 
                      className="form-control mb-2" 
                      placeholder="Quantity" 
                      value={newProduct.quantity} 
                      onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} 
                    />
                    <input 
                      type="file" 
                      className="form-control mb-2" 
                      onChange={(e) => setNewProduct({ ...newProduct, image: URL.createObjectURL(e.target.files[0]) })} 
                    />
                    <button type="button" className="btn btn-success" onClick={handleCreateProduct}>Create Product</button>
                  </>
                ) : (
                  <div>
                    <h6>Select a Product to Add Inventory</h6>
                    <select className="form-select mb-2">
                      <option value="">Select Product</option>
                      {allProducts.map(product => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                    <input 
                      type="number" 
                      className="form-control mb-2" 
                      placeholder="Quantity to Add" 
                    />
                    <button type="button" className="btn btn-success">Add Inventory</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStore;