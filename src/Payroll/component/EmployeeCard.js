import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "./config";
import defaultImage from '../assets/images.png'; // Correct path to default image

const EmployeeCard = () => {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('selected_employee_id');
        if (storedId) {
          const response = await fetch(`${API_URL}/hr_employees/${storedId}`);
          if (response.ok) {
            const employees = await response.json();
            if (employees.length > 0) {
              setEmployeeData(employees[0]); // Set the first employee data
            }
          }
        }
      } catch (err) {
        console.error("Error fetching employee data:", err.message);
      }
    };

    fetchEmployeeData();
  }, []);

  if (!employeeData) {
    return <p>Loading...</p>; // Show loading state
  }

  const { name, surname, idnumber,dob,city, country, sex, accountCategory } = employeeData;

  return (
    <div className="row" style={{ padding: '10px', backgroundColor: '#ffffff', border: '1px solid grey', borderRadius: '10px', marginBottom: '15px', marginTop: '-10px' }}>
      {/* Left Section: Profile Picture */}
      <div className="col-md-4 d-flex justify-content-center align-items-center flex-column" style={{ padding: '10px' }}>
        <img 
          src={employeeData.image || defaultImage} 
          alt="Profile"
          style={{
            width: '200px',
            height: '175px',
            objectFit: 'cover',
            borderRadius: '10px',
            border: '2px solid #ccc', // Optional: border for emphasis
            // boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Optional: shadow effect
            marginBottom: '5px'
          }} 
        />

      </div>

      {/* Right Section: Employee Details */}
      <div className="col-md-8" style={{ padding: '10px' }}>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>Name:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{`${name} ${surname}`||'N/A'}</span>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>Date of Birth:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{dob|| 'N/A'}</span>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>National Id Number:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{idnumber || 'N/A'}</span>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>Gender:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{sex || 'N/A'}</span>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>Country:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{country || 'N/A'}</span>
          </div>
        </div>
        <div className="row" style={{ marginBottom: '5px', padding: '0' }}>
          <div className="col-md-3" align="left" style={{ padding: '0' }}>
            <strong>Account Category:</strong>
          </div>
          <div className="col-md-9" align="left" style={{ padding: '0' }}>
            <span>{accountCategory || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;