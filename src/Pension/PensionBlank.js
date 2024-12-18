import React from 'react';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import NewMembers from './NewMembers';
import membershipIllustration from '../Pension/component/images/membership.svg';

const PensionBlank = () => {
  const navigate = useNavigate();

  const handleAddNewMember = () => {
    navigate('/NewMembers');
  };

  return (
    <div className="d-flex">
      <div style={{ width: '250px' }}>
        <SideBar />
      </div>
      <div className="flex-fill">
        <TopNav />
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: '80%', height: '80vh' }}>
          <Row className="mb-4 w-100" style={{ marginTop: 85, marginBottom: 80 }}>
            <Col xs={12}>
              <InputGroup>
                <FormControl
                  placeholder="Search members"
                  aria-label="Search member"
                  aria-describedby="basic-addon2"
                />
                <Button variant="primary" id="button-addon2">
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
            </Col>
          </Row>
          <img src={membershipIllustration} alt="Membership Illustration" className="img-fluid mt-4" style={{ height: '65%', marginTop: 120 }} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PensionBlank;