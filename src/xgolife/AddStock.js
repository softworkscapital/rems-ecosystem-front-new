import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../xgolife/SideBar'; 
import TopBar from '../xgolife/TopBar';   

const AddStock = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    price: '',
    quantity: '',
    branch: ''
  });

  // Mock data for branches
  const branches = [
    { id: 1, name: 'Branch 1' },
    { id: 2, name: 'Branch 2' },
    { id: 3, name: 'Branch 3' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Stock Data:', formData);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <TopBar />
      <Sidebar />
      <div style={{ marginLeft: '260px', padding: '20px' }}>
        <div className="container py-5">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card shadow-lg"
            style={{ borderColor: '#FFC000' }}
          >
            <div className="card-header bg-white border-bottom" style={{ borderColor: '#FFC000' }}>
              <h3 className="mb-0 text-center fw-bold">Add New Stock</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    style={{ borderColor: '#FFC000' }}
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Price</label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ borderColor: '#FFC000' }}>$</span>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        style={{ borderColor: '#FFC000' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="0"
                      style={{ borderColor: '#FFC000' }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Associated Branch</label>
                  <select
                    className="form-select"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    style={{ borderColor: '#FFC000' }}
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    style={{ borderColor: '#FFC000' }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn text-dark"
                    style={{ backgroundColor: '#FFC000' }}
                  >
                    Add Stock
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddStock;