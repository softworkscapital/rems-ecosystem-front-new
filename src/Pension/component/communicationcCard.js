import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';

const CommunicationCards = () => {
    const cardsData = [
        {
            header: "Happy Birthday",
            title: "Celebrate Your Special Day!",
            content: "Wishing you a very happy birthday! May your day be filled with joy and laughter."
        },
        {
            header: "Breast Cancer Awareness",
            title: "Join the Fight Against Breast Cancer",
            content: "October is Breast Cancer Awareness Month. Let's raise awareness and support those affected."
        },
        {
            header: "Men's Health Month",
            title: "Take Charge of Your Health",
            content: "June is Men's Health Month. It's time for men to prioritize their health."
        },
        {
            header: "Exiting Member",
            title: "Stay Updated!",
            content: "We have exciting updates for our members! Stay tuned for upcoming events."
        },
        {
            header: "Outstanding Arrears",
            title: "Clear Your Dues",
            content: "Members are reminded to settle any outstanding arrears. Let's keep our community thriving!"
        },
        {
            header: "New Members",
            title: "Join Our Community",
            content: "We are accepting new members! If you know someone who would benefit from our services, let them know."
        },
        {
            header: "New Beneficial Plans",
            title: "Explore Our New Plans",
            content: "Check out our new beneficial plans designed to offer you more value."
        },
        {
            header: "Happy New Month",
            title: "Welcome to a New Month!",
            content: "Happy new month! May this month bring you joy and success."
        }
    ];

    return (
        <Row>
            {cardsData.map((card, index) => (
                <Col md={4} key={index} style={{ marginBottom: "12px" }}>
                    <Card className="h-100" style={{ paddingTop: "10px" }}>
                        <Card.Title>{card.header}</Card.Title>
                        <hr style={{ margin: "0" }} /> {/* Divider line */}
                        <Card.Body className="d-flex flex-column"> {/* Flex column for layout */}
                            <div className="flex-grow-1"> {/* Allows Card.Body to grow */}
                                
                                <Card.Text style={{ textAlign: "left" }}>{card.content}</Card.Text> {/* Align text left */}
                            </div>
                            <Form inline className="d-flex align-items-center mt-auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter phone number"
                                    className="me-2"
                                    style={{ flex: 1 }} // Adjust width as needed
                                />
                                <Button
                                    variant="primary"
                                    type="button"
                                    onClick={() => console.log(`Sending message: ${card.header}: ${card.title} - ${card.content}`)}
                                >
                                    Send Sample
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Form.Check
                                type="switch"
                                id={`custom-switch-${index}`}
                                label=""
                                className="float-end"
                            />
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default CommunicationCards;