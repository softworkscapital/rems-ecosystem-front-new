// Products.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import CustomerCard from './component/CustomerCard';
import { PENSION_API_URL } from './component/config';

// Sample customers for demonstration
const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '456-789-1234' },
];

const Products = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${PENSION_API_URL}/pension_products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="d-flex">
            <div style={{ width: '250px' }}>
                <SideBar />
            </div>
            <div className="flex-fill">
                <TopNav />
                <div className="container mt-4" style={{ maxWidth: '80%' }}>
                    <h2 className="mb-4">Pension Products</h2>

                    {/* Button to navigate to NewPensionProduct at the top */}
                    <button 
                        className="btn btn-primary mb-4 float-start" 
                        onClick={() => navigate('/NewPensionProduct')}
                    >
                        Add New Pension Product
                    </button>

                    <div className="mb-4">
                        <select
                            className="form-select"
                            onChange={(e) => {
                                const customer = customers.find(c => c.name === e.target.value);
                                handleSelectCustomer(customer);
                            }}
                        >
                            <option value="">Select Customer</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.name}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedCustomer && <CustomerCard customer={selectedCustomer} />}
                    <h4>SELECT PENSION PLAN FOR MEMBER:</h4>
                    <div className="row" style={{ marginBottom: 70 }}>
                        {products.map((product) => (
                            <div className="col-md-4 mb-3" key={product.pension_product_id}>
                                <div className="card border-light shadow-sm">
                                    <div className={`card-header ${product.color} text-white`}>
                                        <h5 className="mb-0">{product.product_name}</h5>
                                    </div>
                                    <div className="card-body text-start">
                                        <p className="card-text">{product.product_description}</p>
                                        <ul className="list-unstyled">
                                            <li><strong>Currency:</strong> {product.currency}</li>
                                            <li><strong>Contribution Amount:</strong> {product.contribution_amount}</li>
                                            <li><strong>Variance:</strong> {product.contribution_variance}</li>
                                            <li><strong>Frequency:</strong> {product.contribution_frequency}</li>
                                            <li><strong>Type:</strong> {product.pension_product_type}</li>
                                        </ul>
                                        <button className="btn btn-success w-100">Select Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Products;