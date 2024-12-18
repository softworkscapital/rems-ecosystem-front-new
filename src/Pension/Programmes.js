import React, { useState } from "react";
import { Container, Row, Col, Button  } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";
import Footer from './component/Footer';
import BonusCards from "./component/bonusCards"; // Capitalize the component name

const Programmes = () => {
    const [message, setMessage] = useState('');

       // const [driversData, setDriversData] = useState([]);

    // const getDrivers = async () => {
    //   try {
    //     const response = await fetch(`${APILINK}/driver/`);
    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     console.log(data);
  
    //     // Extract the phone numbers into an array
    //     const phoneNumbers = data.map((driver) => driver.phone);
    //     console.log("Phone Numbers:", phoneNumbers);
  
    //     // Store the array of phone numbers in state
    //     setDriversData(phoneNumbers);
    //   } catch (error) {
    //     console.log("Failed to fetch drivers:", error);
    //   }
    // };

    // useEffect(() => {
    //     getDrivers(); // Fetch drivers on component mount
    //   }, []);

    // const sendSmsBroadcast = async () => {
    //     if (driversData.length === 0) {
    //       toast.error("No phone numbers available to send SMS.");
    //       return;
    //     }
    
    //     const phoneNumbers = driversData.join(", "); // Create a comma-separated string
    
    //     try {
    //       const response = await fetch(
    //         "https://srv547457.hstgr.cloud:3003/smsendpoint",
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             clientid: "1001",
    //             clientkey: "hdojFa502Uy6nG2",
    //             message,
    //             recipients: phoneNumbers.split(", "), // Split back into an array for recipients
    //             senderid: "REMS",
    //           }),
    //         }
    //       );
    
    //       if (!response.ok) {
    //         const errorText = await response.text();
    //         console.error("Error sending OTP:", response.status, errorText);
    //         toast.error("Failed to send OTP.");
    //         return false;
    //       }
    
    //       toast.success("Message sent successfully!");
    //       return true;
    //     } catch (error) {
    //       console.error("Network Error:", error);
    //       toast.error("Could not send OTP. Please check your connection.");
    //       return false;
    //     }
    //   };
    
    //   const handleSend = async (e) => {
    //     e.preventDefault();
    
    //     console.log("Message sent:", message);
    
    //     await sendSmsBroadcast(); // Call the SMS sending function
    //     setMessage("");
    //     await getDrivers(); // Refresh the driver list after sending
    //   };

    const handleSend = (e) => {
        e.preventDefault();
        // Logic for sending the message
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <TopNav />
        <div style={{ display: "flex", flex: 1 }}>
            <div style={{ width: "300px" }}> {/* Fixed width for Sidebar */}
                <Sidebar />
            </div>
            <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>
                <Container fluid>
                    <Row>
                        <Col md={12} className="text-center">
                            <h2 className="mb-4" style={{ marginTop: 12 }}>Bonus Programmes</h2>
                        </Col>
                    </Row>
                    {/* Row for buttons, aligned to the right and closely spaced */}
                    <Row className="mb-4" style={{ justifyContent: "flex-end" }}>
                        <Col md="auto" className="text-end">
                            <Button variant="primary" size="sm" style={{ marginRight: "0" }}>
                                Add
                            </Button>
                        </Col>
                        <Col md="auto" className="text-end">
                            <Button variant="success" size="sm" style={{ marginRight: "0" }}>
                                Green
                            </Button>
                        </Col>
                        <Col md="auto" className="text-end">
                            <Button variant="warning" size="sm" style={{ marginRight: "0" }}>
                                Suspend
                            </Button>
                        </Col>
                        <Col md="auto" className="text-end">
                            <Button variant="danger" size="sm" style={{ marginRight: "0" }}>
                                Remove
                            </Button>
                        </Col>
                    </Row>
                    <BonusCards /> {/* Use the capitalized component name */}
                </Container>
            </div>
        </div>
        <Footer />
        <ToastContainer />
    </div>
);
};

export default Programmes;