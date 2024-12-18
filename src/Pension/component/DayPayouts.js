import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const DayPayouts = () => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Day PayOuts</Card.Title>
                <Row className="mb-2 text-start">
                    <Col>Total: $3000</Col>
                </Row>
                <Row className="mb-2 text-start">
                    <Col>Clients Paid: 5</Col>
                </Row>
                <Row className="text-start">
                    <Col>Transactions: 15</Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DayPayouts;