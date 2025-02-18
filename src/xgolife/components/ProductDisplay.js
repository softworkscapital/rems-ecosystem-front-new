import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Alert, Pagination } from 'react-bootstrap';
import defaultImage from "../assets/default.png";
import { API_URL, UPLOADS_API_URL } from "../config";

const ProductDisplay = ({ loading, setLoading }) => {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPageState] = useState(1);
    const itemsPerPage = 12; 
    const [currentItems, setCurrentItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    
    const companyId = localStorage.getItem("company_id");
    const branchId = localStorage.getItem("branch_id");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await fetch(`${API_URL}/productdefinition/full_products_definations/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                
                // Filter products based on company_id and branch_id
                const filteredItems = data.filter(item => 
                    item.company_id === parseInt(companyId) && item.branch_id === parseInt(branchId)
                );

                setItems(filteredItems);
                setTotalPages(Math.ceil(filteredItems.length / itemsPerPage));
                setCurrentItems(filteredItems.slice(0, itemsPerPage));
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [companyId, branchId, setLoading]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(items.slice(startIndex, endIndex));
    }, [currentPage, items]);

    return (
        <>
            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <>
                    {items.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No products yet.
                        </Alert>
                    ) : (
                        <Row>
                            {currentItems.map((item, index) => (
                                <Col key={item.product_id} md={3} className="mb-4">
                                    <Card className="h-100 shadow-sm border-warning">
                                        <div className="position-relative" style={{ height: "150px", overflow: "hidden" }}>
                                            <Card.Img
                                                variant="top"
                                                src={item.uploaded_product_image_ref ? `${UPLOADS_API_URL}/${item.uploaded_product_image_ref}` : defaultImage}
                                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="h5 mb-2">{item.product_name}</Card.Title>
                                            <Card.Text className="text-muted small mb-2">{item.product_brand}</Card.Text>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-success fw-bold">${item.selling_price}</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            {/* Fill empty columns if less than 4 items */}
                            {[...Array(4 - currentItems.length)].map((_, idx) => (
                                <Col key={`empty-${idx}`} md={3} className="mb-4" style={{ visibility: 'hidden' }}>
                                    <Card className="h-100 shadow-sm border-warning">
                                        <div className="position-relative" style={{ height: "150px", overflow: "hidden" }}>
                                            <Card.Img
                                                variant="top"
                                                src={defaultImage}
                                                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
            {items.length > 0 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First onClick={() => setCurrentPageState(1)} />
                        <Pagination.Prev onClick={() => setCurrentPageState((prev) => Math.max(prev - 1, 1))} />
                        {[...Array(totalPages)].map((_, idx) => (
                            <Pagination.Item
                                key={idx + 1}
                                active={idx + 1 === currentPage}
                                onClick={() => setCurrentPageState(idx + 1)}
                            >
                                {idx + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => setCurrentPageState((prev) => Math.min(prev + 1, totalPages))} />
                        <Pagination.Last onClick={() => setCurrentPageState(totalPages)} />
                    </Pagination>
                </div>
            )}
        </>
    );
};

export default ProductDisplay;