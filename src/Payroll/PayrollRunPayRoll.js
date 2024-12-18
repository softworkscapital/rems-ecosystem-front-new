import React, { useState, useEffect } from "react";
import { API_URL } from "./component/config";
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [payrollData, setPayrollData] = useState([]);
  const [payAllowanceTypesData, setPayAllowanceTypesData] = useState([]);
  const [payDeductionTypesData, setPayDeductionTypesData] = useState([]);
  const [newAllowanceRunRecord, setNewAllowanceRunRecord] = useState({});
  const [specialHourlyRate, setSpecialHourlyRate] = useState(0);
  const [overtimeHourlyRate, setOvertimeHourlyRate] = useState(0);
  const [actualDays, setActualDays] = useState(0);
  const [basicPay, setBasicPay] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/hr_employees/active_employees/`);
        const data = await response.json();
        setEmployeeDetails(data);
      } catch (err) {
        console.error("Error fetching employee details:", err.message);
      }
    };

    fetchEmployeeDetails();
  }, []);



  const calculateBasicPay = () => {
    const totalHourlyRate = (specialHourlyRate + overtimeHourlyRate + specialHourlyRate);
    const calculatedBasicPay = totalHourlyRate * actualDays;
    setBasicPay(calculatedBasicPay);
  };

  const handleRunPayroll = async () => {
    let basicPay = 100;
    let employee_id = 0;
    let company_id = 1;
    let payroll_cycle_run_id = 1;
    let username = "test User";

    // Handle Allowances
    for (let x = 0; x < employeeDetails.length; x++) {
      employee_id = employeeDetails[x].hr_employee_id;
      company_id = employeeDetails[x].company_id;

      try {
        console.log("company_id",company_id);
        console.log("employee_id",employee_id);
        // GET ALL ALLOWANCE TYPES
        let response = await fetch(`${API_URL}/hr_allowance_registers/company_id/employee_id/${company_id}/${employee_id}`);
        let allowanceTypesData = await response.json();
        setPayAllowanceTypesData(allowanceTypesData);

        console.log("allowanceTypesData",allowanceTypesData);

        for (let j = 0; j < allowanceTypesData.length; j++) {
          // GET ALLOWANCE TYPE DEFINITION
          response = await fetch(`${API_URL}/hr_allowance_types/${allowanceTypesData[j].allowance_type_id}`);
          let allowanceTypeDefinitionData = await response.json();

          for (let i = 0; i < allowanceTypeDefinitionData.length; i++) {
            let allowance_value = allowanceTypeDefinitionData[i].rate * basicPay;

            const newRecord = {
              hr_allowance_run_id: '',
              employee_id: employee_id,
              allowance_type_id: allowanceTypeDefinitionData[i].hr_allowance_type_id,
              company_id: company_id,
              payroll_cycle_run_id: payroll_cycle_run_id,
              username: username,
              amount: allowance_value
            };

            const postResponse = await fetch(`${API_URL}/hr_allowance_runs`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newRecord),
            });

            if (postResponse.ok) {
              const newRecordResponse = await postResponse.json();
              Swal.fire({
                title: 'Success!',
                text: 'Allowance record added successfully!',
                icon: 'success',
                confirmButtonText: 'Okay'
              }).then(() => {
                navigate('/AllowanceRun');
              });
            } else {
              const errorText = await postResponse.text();
              Swal.fire({
                title: 'Error!',
                text: `Failed to add new allowance run record. Status: ${postResponse.status} - ${errorText}`,
                icon: 'error',
                confirmButtonText: 'Okay'
              });
            }
          }
        }
      } catch (err) {
        console.error("Error:", err.message);
        Swal.fire({
          title: 'Error!',
          text: 'An unexpected error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    }
    


// #################################################################################
// CODE FOR DEDUCTIONS 


  // Handle Deductions
  for (let j= 0; j < employeeDetails.length; j++) {
    employee_id = employeeDetails[j].hr_employee_id;
    company_id = employeeDetails[j].company_id;

    try {
      console.log("company_id ye deduction",company_id);
      console.log("employee_id ye deduction",employee_id);
      // GET ALL DEDUCTION TYPES
      let response = await fetch(`${API_URL}/hr_deduction_registers/company_id/employee_id/${company_id}/${employee_id}`);
      let deductionTypesData = await response.json();
      setPayDeductionTypesData(deductionTypesData);

      console.log("allowanceTypesData",deductionTypesData);

      for (let j = 0; j < deductionTypesData.length; j++) {
        // GET DEDUCTION TYPE DEFINITION
        response = await fetch(`${API_URL}/hr_deduction_types/${deductionTypesData[j].deduction_type_id}`);
        let deductionTypeDefinitionData = await response.json();

        for (let i = 0; i < deductionTypeDefinitionData.length; i++) {
          let deduction_value = deductionTypeDefinitionData[i].rate * basicPay;

          const newRecord = {
            hr_deduction_run_id: '',
            employee_id: employee_id,
            deduction_type_id: deductionTypeDefinitionData[i].hr_deduction_type_id,
            company_id: company_id,
            payroll_cycle_run_id: payroll_cycle_run_id,
            username: username,
            amount: deduction_value
          };

          const postResponse = await fetch(`${API_URL}/hr_deduction_runs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecord),
          });

          if (postResponse.ok) {
            const newRecordResponse = await postResponse.json();
            Swal.fire({
              title: 'Success!',
              text: 'Allowance record added successfully!',
              icon: 'success',
              confirmButtonText: 'Okay'
            }).then(() => {
              navigate('/DeductionRun');
            });
          } else {
            const errorText = await postResponse.text();
            Swal.fire({
              title: 'Error!',
              text: `Failed to add new allowance run record. Status: ${postResponse.status} - ${errorText}`,
              icon: 'error',
              confirmButtonText: 'Okay'
            });
          }
        }
      }
    } catch (err) {
      console.error("Error:", err.message);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  }














    
    // ##### // Start of new code for deductions

    // for (let x = 0; x < employeeDetails.length; x++) {
    //   employee_id = employeeDetails[x].hr_employee_id;

    //   try {
    //     // GET ALL DEDUCTION TYPES
    //     let response = await fetch(`${API_URL}/hr_deduction_registers/company_id/employee_id/${company_id}/${employee_id}`);
    //     let deductionTypesData = await response.json();
    //     setDeductionTypesData(deductionTypesData);

    //     for (let j = 0; j < deductionTypesData.length; j++) {
    //       // GET DEDUCTION TYPE DEFINITION
    //       response = await fetch(`${API_URL}/hr_deduction_types/${deductionTypesData[j].deduction_type_id}`);
    //       let deductionTypeDefinitionData = await response.json();

    //       for (let i = 0; i < deductionTypeDefinitionData.length; i++) {
    //         let deduction_value = deductionTypeDefinitionData[i].rate * basicPay;

    //         const newDeductionRecord = {
    //           hr_deduction_run_id: '',
    //           employee_id: employee_id,
    //           deduction_type_id: deductionTypeDefinitionData[i].hr_deduction_type_id,
    //           company_id: company_id,
    //           payroll_cycle_run_id: payroll_cycle_run_id,
    //           username: username,
    //           amount: deduction_value
    //         };

    //         const postDeductionResponse = await fetch(`${API_URL}/hr_deduction_runs`, {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(newDeductionRecord),
    //         });

    //         if (postDeductionResponse.ok) {
    //           const newDeductionRecordResponse = await postDeductionResponse.json();
    //           Swal.fire({
    //             title: 'Success!',
    //             text: 'Deduction record added successfully!',
    //             icon: 'success',
    //             confirmButtonText: 'Okay'
    //           }).then(() => {
    //             navigate('/DeductionRun'); // Navigate to the Deductions page
    //           });
    //         } else {
    //           const errorText = await postDeductionResponse.text();
    //           Swal.fire({
    //             title: 'Error!',
    //             text: `Failed to add new deduction run record. Status: ${postDeductionResponse.status} - ${errorText}`,
    //             icon: 'error',
    //             confirmButtonText: 'Okay'
    //           });
    //         }
    //       }
    //     }
    //   } catch (err) {
    //     console.error("Error:", err.message);
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'An unexpected error occurred. Please try again.',
    //       icon: 'error',
    //       confirmButtonText: 'Okay'
    //     });
    //   }
    // }








    // ##### // End of new code for deductions
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
            <h2 className="card-header">Run Payroll</h2>
            <button onClick={handleRunPayroll} style={{ padding: '10px 20px', cursor: 'pointer' }}>
              Run Payroll
            </button>
            <div className="card-body">
              <div className="table-responsive" style={{ overflowY: 'auto', maxHeight: '400px', maxWidth: '1000px' }}>
                {/* Here you can display payroll data in a table if needed */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default EmployeeDetails;