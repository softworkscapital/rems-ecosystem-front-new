import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Update import

const FinCards = ({ cardsData }) => {
    const navigate = useNavigate(); // Use useNavigate instead

    const handleCardClick = (path) => {
        navigate(path); // Use navigate to go to the specified path
    };

    return (
        <Row>
            {cardsData.map((card, index) => (
                <Col md={12} key={index} style={{ marginBottom: "12px" }}>
                    <Card 
                        className="mb-3" 
                        style={{ cursor: "pointer" }} 
                        onClick={() => handleCardClick(card.path)} // Navigate to the respective path
                    >
                        <Card.Body>
                            <Card.Title>{card.title}</Card.Title>
                            <Card.Text>{card.content}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default FinCards;