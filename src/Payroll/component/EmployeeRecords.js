import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "./config";

const RecordCard = () => {
  const [recordData, setRecordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('selected_employee_id');
        if (storedId) {
          const response = await fetch(`${API_URL}/hr_employee_records/getting_records_by_employee_id/${storedId}`);
          if (response.ok) {
            const records = await response.json();
            if (records.length > 0) {
              setRecordData(records[0]); // Set the first allowance data
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

    fetchRecordData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p>{error}</p>; // Show error state
  }

  const {
        hr_pay_scale_rate_type,
        date,
        time,
        record_type,
        file_location
 
   
  } = recordData;

  return (
    <div style={cardStyle}>
      <div className="row" style={{ marginBottom: '5px', padding: '5px' }}>
      <div className="col-md-4" align="left" style={{ padding: '0' }}>
  {hr_pay_scale_rate_type || 'N/A'}
</div>
<div className="col-md-3" align="left" style={{ padding: '0' }}>
  {date || 'N/A'}
</div>
<div className="col-md-2" align="left" style={{ padding: '0' }}>
  {time || 'N/A'}
</div>
<div className="col-md-3" align="left" style={{ padding: '0' }}>
  {record_type || 'N/A'}{ ' USD' }
</div>
<div className="col-md-3" align="left" style={{ padding: '0' }}>
  {file_location || 'N/A'}
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



export default RecordCard;