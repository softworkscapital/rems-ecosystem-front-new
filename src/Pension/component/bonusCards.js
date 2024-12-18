import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './cardSwitch.css'; // Import your CSS file

const BonusCards = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Define the card data with paths for navigation
    const cardsData = [
        {
            title: "10 Year Anniversary!",
            content: "🎉 Congratulations on reaching 10 incredible years with us! Your loyalty and dedication have truly made a difference. To celebrate this amazing milestone, we’re thrilled to offer you a **10% bonus** on your benefits! Thank you for being an essential part of our journey. Let’s make this anniversary unforgettable together!",
        },
        {
            title: "25 Year Celebration!",
            content: "🎊 Happy 25th Anniversary! What an extraordinary journey it has been! Your unwavering support and commitment have shaped our success. As a token of our appreciation, enjoy a **15% bonus** on your benefits! Let’s celebrate the past and look forward to a bright future filled with more achievements and shared dreams!",
        },
        {
            title: "50 Years of Excellence!",
            content: "🥳 Celebrating 50 years of excellence! This remarkable milestone marks half a century of achievements, growth, and community. We couldn’t have made it this far without your incredible support. To honor this momentous occasion, we’re excited to give you a **20% bonus** on your benefits! Here’s to many more years of success, innovation, and shared milestones!",
        },
        {
            title: "75 Year Legacy!",
            content: "🎈 Happy 75th Anniversary! What a journey it has been over these three-quarters of a century! Your trust and loyalty have been the cornerstone of our legacy. As a heartfelt thank you, enjoy a **25% bonus** on your benefits! Together, let’s celebrate the countless memories we’ve created and the bright future that lies ahead. Here’s to many more years of shared success and community!",
        }
    ];

    const handleCardClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <Row>
            {cardsData.map((card, index) => (
                <Col md={12} key={index} style={{ marginBottom: "12px" }}>
                    <Card className="h-100" style={{ paddingTop: "10px" }}>
                        <Card.Title style={{ paddingLeft: "10px", textAlign: "left" }}>Programme: {card.title}</Card.Title>
                        <hr style={{ margin: "0" }} /> {/* Divider line */}
                        <Card.Body className="d-flex flex-column"> {/* Flex column for layout */}
                            <div className="flex-grow-1"> {/* Allows Card.Body to grow */}
                                <Card.Text style={{ textAlign: "left" }}>{card.content}</Card.Text> {/* Align text left */}
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${index}`}
                                label=""
                                className="float-end"
                                custom
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default BonusCards;