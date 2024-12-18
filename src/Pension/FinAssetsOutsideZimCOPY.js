import React, { useEffect, useState } from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";
import { API_URL } from "./component/config";
import { useNavigate } from "react-router-dom";

const FinAssetsOutsideZim = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const navigate = useNavigate();

  const typesOrder = [
    'Non Current Assets',
    'Non Current Assets Intangibles',
    'Current Assets',
    'Non Current Liabilities',
    'Current Liabilities',
    'Direct Expenses',
    'Direct Expenses Adjustments',
    'Revenue',
    'Revenue Adjustments',
    'Other Revenue'
  ];

  useEffect(() => {
    const fetchAssetsOutsideZimData = async () => {
      try {
        const response = await fetch(`${API_URL}/bi_sum_yearly_account_totals/get_joined_yearly_account_map_info`);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        console.log("honai", result);

        // Correctly map type based on fin_acc_account_class
        const categorizedData = result.map(item => {
          let mappedType = typesOrder.find(type => type === item.fin_acc_account_class) || 'Other';
          return {
            ...item,
            type: mappedType
          };
        });

        // Group the data based on the predefined types
        const grouped = typesOrder.reduce((acc, type) => {
          const items = categorizedData.filter(item => item.type === type);
          acc[type] = items.length > 0 ? items : []; // Include empty arrays for each type
          return acc;
        }, {});

        setGroupedData(grouped);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAssetsOutsideZimData();
  }, []);

  const goToMenu = () => {
    navigate('/FinStatementsMenu');
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopNav />
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, padding: "20px", marginTop: "80px" }}>

          {/* Card with Menu Button and Date Pickers */}
          <div className="card mb-4" style={{ padding: "15px" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div className="form-group mr-3">
                <label htmlFor="startDate" style={{ fontWeight: 'bold', marginRight: '10px' }}>Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group mr-3">
                <label htmlFor="endDate" style={{ fontWeight: 'bold', marginRight: '10px' }}>End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={goToMenu}>Menu</button>
            </div>
          </div>

          {/* Card with Table */}
          <div className="card" style={{ padding: "20px" }}>
            <h2 className="mb-4" style={{ marginTop: 15, textAlign: 'center' }}>Assets Outside Zimbabwe As at End of Year (US$ Values)</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold', borderRightWidth: '4px', borderRightColor: 'white' }}>Account Name</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 1</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 2</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 3</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 4</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold', borderRightWidth: '6px', borderRightColor: 'white' }}>Total</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 1</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 2</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 3</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 4</th>
                    <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedData).map(([type, items], index) => (
                    <React.Fragment key={index}>
                      {items.length > 0 && (
                        <>
                          <tr>
                            <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>{type}</td>
                          </tr>
                          {items.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td style={{ fontWeight: 'bold', textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>{item.acc_account_name}<br /><span style={{ textAlign: 'end' }}>{item.account_type}</span></td>
                              <td>{item.account_balance_todate_sub_account_1}</td>
                              <td>{item.account_balance_todate_sub_account_2}</td>
                              <td>{item.account_balance_todate_sub_account_3}</td>
                              <td>{item.account_balance_todate_sub_account_4}</td>
                              <td style={{ fontWeight: 'bold', borderRightWidth: '6px', borderRightColor: 'black' }}>{item.balance}</td>
                              <td>{item.bi_sum_2023_sub_account_1}</td>
                              <td>{item.bi_sum_2023_sub_account_2}</td>
                              <td>{item.bi_sum_2023_sub_account_3}</td>
                              <td>{item.bi_sum_2023_sub_account_4}</td>
                              <td style={{ fontWeight: 'bold' }}>{item.balance}</td>
                            </tr>
                          ))}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FinAssetsOutsideZim;
