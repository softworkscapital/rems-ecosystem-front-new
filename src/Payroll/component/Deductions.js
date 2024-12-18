import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "./config";

const DeductionCard = () => {
  const [deductionData, setDeductionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeductionData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('selected_employee_id');
        if (storedId) {
          const response = await fetch(`${API_URL}/hr_deduction_registers/deduction_type_joinedby_deduction_register/${storedId}`);
          if (response.ok) {
            const allowances = await response.json();
            if (allowances.length > 0) {
              setDeductionData(allowances[0]); // Set the first allowance data
            } else {
              setError('No allowances found for this employee.');
            }
          } else {
            setError('Error fetching allowances');
          }
        } else {
          setError('No employee ID found');
        }
      } catch (err) {
        console.error("Error fetching allowance data:", err.message);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDeductionData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error state
  }

  const {
    deduction_name,
    begin_date,
    end_date,
    current,
    cycle_period,
    currency
 
   
  } = deductionData;

  return (
    <div style={cardStyle}>
      <div className="row" style={{ marginBottom: '5px', padding: '5px' }}>
      <div className="col-md-4" align="left" style={{ padding: '0' }}>
  {deduction_name || 'N/A'}
</div>
<div className="col-md-3" align="left" style={{ padding: '0' }}>
  {begin_date || 'N/A'} {" to "} {end_date || 'N/A'}
</div>
<div className="col-md-2" align="left" style={{ padding: '0' }}>
  {cycle_period || 'N/A'}
</div>
<div className="col-md-3" align="left" style={{ padding: '0' }}>
  {current || 'N/A'}{ ' USD' }
</div>
</div>
</div>




  );
};

const cardStyle = {
  padding: '10px',
  backgroundColor: '#ffffff',
  border: '1px solid grey',
  borderRadius: '10px',
  marginBottom: '15px',
  marginTop: '-10px',
};

export default DeductionCard;