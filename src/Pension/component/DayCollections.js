import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DayCollections = () => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Day Collections</Card.Title>
                <Row className="mb-2 text-start">
                    <Col>Total: $5000</Col>
                </Row>
                <Row className="mb-2 text-start">
                    <Col>New Clients: 10</Col>
                </Row>
                <Row className="text-start">
                    <Col>Transactions: 25</Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DayCollections;