import React, { useState } from "react";
import { API_URL } from "./component/config";
import { Link } from "react-router-dom";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import EmployeeCard from './component/EmployeeCard';
import BasicPaymentRate from './component/BasicPaymentRate';
import Deductions from './component/Deductions';
import EmployeeRecords from './component/EmployeeRecords';
import Allowances from './component/Allowances';
import Swal from 'sweetalert2';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const PayrollEmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For the input field
  const [filteredEmployee, setFilteredEmployee] = useState(null); // State to store the employee details
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    if (!searchTerm) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a User ID.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      setFilteredEmployee(null); // Clear employee details
      return;
    }

    console.log("Searched ID:", searchTerm); // Log the searched ID
    setLoading(true); // Start loading

    try {
      const response = await fetch(`${API_URL}/hr_employees/${searchTerm}`); // Fetch by hr_employee_id
      if (response.ok) {
        const employee = await response.json(); // Assuming this returns a single employee object

        // Check if employee data was returned
        if (employee && Object.keys(employee).length > 0) {
          // Store the hr_employee_id in AsyncStorage
          await AsyncStorage.setItem('selected_employee_id', searchTerm);
          console.log("Stored ID in AsyncStorage:", searchTerm); // Log the stored ID

          setFilteredEmployee(employee); // Set filtered employee state
        } else {
          // If no employee found
          Swal.fire({
            title: 'Error!',
            text: 'No employee found for the given ID.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
          setFilteredEmployee(null); // Clear employee details
        }
      } else {
        // If the response is not ok
        Swal.fire({
          title: 'Error!',
          text: 'Error while fetching employee data.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        setFilteredEmployee(null); // Clear employee details
      }
    } catch (err) {
      console.error("Error during fetch:", err.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred while fetching employee details.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      setFilteredEmployee(null); // Clear employee details
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <TopNav />
        <SideBar />
      </div>
      <div style={{ width: '950px', marginLeft: '280px', marginTop: '25px' }}>
        <h1>Employee Details</h1>
        <div className="col-xl-12">
          <div className="card">
            <h2 className="card-header">
              Employee Details 
              <Link className="btn btn-primary btnAdd" style={{ float: "right", marginRight: "10px" }} to="/AddEmployeeDetail">
                Add Employee Detail
              </Link>
              <Link className="btn btn-primary btnView" style={{ float: "right", marginRight: "10px" }} to="/EmployeeDetailsList">
                View Employee Details List
              </Link>
            </h2>
            <div className="card-body" style={{ overflowY: 'auto', maxHeight: '70vh', position: 'relative' }}>
              {/* Search bar */}
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="Search Employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginRight: '10px'
                  }}
                />
                <button 
                  onClick={handleSearch}
                  style={{
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Search
                </button>
              </div>
              {loading && <p>Loading...</p>} {/* Loading text */}
              {/* Display employee details */}
              {filteredEmployee && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', position: 'relative' }}>
                    <EmployeeCard employee={filteredEmployee} />
                    <div style={{ borderTop: '1px solid #ccc', margin: '10px 0' }} />
                    <BasicPaymentRate rate={filteredEmployee.paymentRate} />
                    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', position: 'relative' }}>
                      <EmployeeRecords employee={filteredEmployee} />
                      <div className="row">
                        <div className="col-md-12"><Deductions deductions={filteredEmployee.deductions} /></div>
                        <div className="col-md-12"><Allowances allowances={filteredEmployee.allowances} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PayrollEmployeeDetails;