import React from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";

function PettyCash() {
  return (
    <div>
      <TopNav />
      <SideBar />
      <Container>
        <header className="text-center my-4">
          <h1>Rems POS</h1>
          <h1 className="">Add Petty Cash</h1>
        </header>

        <Form
          className="mb-3"
          align="center"
          style={{
            marginRight: "300px",
            marginLeft: "300px",
            marginTop: "50px",
            backgroundColor: "white", // Set background to white
            padding: "20px", // Add padding for inner spacing
            borderRadius: "5px", // Optional: add border radius for softer corners
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Optional: add shadow for depth
          }}
        >
          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Product Description"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Receipt Total"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Amount Paid"
              style={{ borderRadius: 0 }}
            />
          </div>

          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Change"
              style={{ borderRadius: 0 }}
            />
          </div>

          <Form.Select
            style={{
              borderRadius: 0,
              backgroundColor: "#fff",
              height: "40px",
              marginBottom: "20px",
            }}
          >
            <option value="Select Branch">Select Currency</option>
            <option value="Branch1">USD</option>
            <option value="Branch2">ZIG</option>
            <option value="Branch3">RAND</option>
          </Form.Select>

          <Button
            className="btn btn-primary"
            style={{ marginTop: "20px", width: "100%" }}
          >
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Add Petty Cash
            </Link>
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default PettyCash;