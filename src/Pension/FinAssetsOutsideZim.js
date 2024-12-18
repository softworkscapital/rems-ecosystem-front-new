import React, { useEffect, useState } from "react";
import "../assets/css/sb-admin-2.min.css";
import "../assets/css/sb-admin-2.css";
import Sidebar from './component/SideBar';
import TopNav from "./component/TopNav";
import { API_URL } from "./component/config";
import { useNavigate } from "react-router-dom";

const FinAssetsOutsideZim = () => {
  const [nonCurrentAssetsData, setNonCurrentAssetsData] = useState([]);
  const [currentAssetsData, setCurrentAssetsData] = useState([]);
  const [nonCurrentAssetsIntangibles, setNonCurrentAssetsIntangibles] = useState([]);
  const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState([]);
  const [currentLiabilities, setCurrentLiabilities] = useState([]);
  const [directExpenses, setDirectExpenses] = useState([]);
  const [adminExpenses, setAdminExpenses] = useState([]);
  const [directExpensesAdjustments, setDirectExpensesAdjustments] = useState([]);
  const [test22Revenue, setTest22Revenue] = useState([]);
  const [expensesOnEAIT, setExpensesOnEAIT] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [revenueAdjustments, setRevenueAdjustments] = useState([]);
  const [otherRevenue, setOtherRevenue] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const goToMenu = () => {
    navigate('/FinStatementsMenu');
  };

  useEffect(() => {
    const fetchAssetsOutsideZimData = async () => {
      try {
        const response = await fetch(`${API_URL}/bi_sum_yearly_account_totals/get_joined_yearly_account_map_info`);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        console.log('Fetched response:', result);

        // Filter for Non Current Assets
        const nonCurrentAssets = result
          .filter(item => item.fin_acc_account_class === 'Non Current Assets')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Non Current Assets Data:', nonCurrentAssets);
        setNonCurrentAssetsData(nonCurrentAssets);

        // Filter for Current Assets
        const currentAssets = result
          .filter(item => item.fin_acc_account_class === 'Current Assets')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Current Assets Data:', currentAssets);
        setCurrentAssetsData(currentAssets);

        // Filter for Non Current Assets Intangibles
        const nonCurrentAssetsIntangibles = result
          .filter(item => item.fin_acc_account_class === 'Non Current Assets Intangibles')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Non Current Assets Intangibles Data:', nonCurrentAssetsIntangibles);
        setNonCurrentAssetsIntangibles(nonCurrentAssetsIntangibles); // Make sure to create state for this

        // Filter for Non Current Liabilities
        const nonCurrentLiabilities = result
          .filter(item => item.fin_acc_account_class === 'Non Current Liabilities')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Non Current Liabilities Data:', nonCurrentLiabilities);
        setNonCurrentLiabilities(nonCurrentLiabilities); // Make sure to create state for this

        // Filter for Current Liabilities
        const currentLiabilities = result
          .filter(item => item.fin_acc_account_class === 'Current Liabilities')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Current Liabilities Data:', currentLiabilities);
        setCurrentLiabilities(currentLiabilities); // Make sure to create state for this

        // Filter for Direct Expenses
        const directExpenses = result
          .filter(item => item.fin_acc_account_class === 'Direct Expenses')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Direct Expenses Data:', directExpenses);
        setDirectExpenses(directExpenses); // Make sure to create state for this
        // Filter for Direct Expenses
        const adminExpenses = result
          .filter(item => item.fin_acc_account_class === 'Admin Expenses')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Admin Expenses Data:', adminExpenses);
        setAdminExpenses(adminExpenses); // Make sure to create state for this

        // Filter for Direct Expenses Adjustments
        const directExpensesAdjustments = result
          .filter(item => item.fin_acc_account_class === 'Direct Expenses Adjustments')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Direct Expenses Adjustments Data:', directExpensesAdjustments);
        setDirectExpensesAdjustments(directExpensesAdjustments); // Make sure to create state for this

        // Filter for Revenue
        const revenue = result
          .filter(item => item.fin_acc_account_class === 'Revenue')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Revenue Data:', revenue);
        setRevenue(revenue); // Make sure to create state for this

        // Filter for Revenue Adjustments
        const revenueAdjustments = result
          .filter(item => item.fin_acc_account_class === 'Revenue Adjustments')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Revenue Adjustments Data:', revenueAdjustments);
        setRevenueAdjustments(revenueAdjustments); // Make sure to create state for this

        // Filter for Other Revenue
        const otherRevenue = result
          .filter(item => item.fin_acc_account_class === 'Other Revenue')
          .map(item => ({
            fin_acc_account_class: item.fin_acc_account_class,
            account_type: item.fin_acc_account_type,
            acc_account_name: item.acc_account_name,
            account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
            account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
            account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
            account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
            balance: item.balance,
            bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
            bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
            bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
            bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
          }));

        console.log('Processed Other Revenue Data:', otherRevenue);
        setOtherRevenue(otherRevenue); // Make sure to create state for this

        const expensesOnEAIT = result
        .filter(item => item.fin_acc_account_class === 'Expenses on EAIT')
        .map(item => ({
          fin_acc_account_class: item.fin_acc_account_class,
          account_type: item.fin_acc_account_type,
          acc_account_name: item.acc_account_name,
          account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
          account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
          account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
          account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
          balance: item.balance,
          bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
          bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
          bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
          bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
        }));

      console.log('Processed Expenses on EAIT Data:', expensesOnEAIT);
      setExpensesOnEAIT(expensesOnEAIT); // Make sure to create state for this

     
      // Filter for Test22 Revenue
      const test22Revenue = result
        .filter(item => item.fin_acc_account_class === 'Test22 Revenue')
        .map(item => ({
          fin_acc_account_class: item.fin_acc_account_class,
          account_type: item.fin_acc_account_type,
          acc_account_name: item.acc_account_name,
          account_balance_todate_sub_account_1: item.account_balance_todate_sub_account_1,
          account_balance_todate_sub_account_2: item.account_balance_todate_sub_account_2,
          account_balance_todate_sub_account_3: item.account_balance_todate_sub_account_3,
          account_balance_todate_sub_account_4: item.account_balance_todate_sub_account_4,
          balance: item.balance,
          bi_sum_2023_sub_account_1: item.bi_sum_2023_sub_account_1,
          bi_sum_2023_sub_account_2: item.bi_sum_2023_sub_account_2,
          bi_sum_2023_sub_account_3: item.bi_sum_2023_sub_account_3,
          bi_sum_2023_sub_account_4: item.bi_sum_2023_sub_account_4,
        }));

      console.log('Processed Test22 Revenue Data:', test22Revenue);
      setTest22Revenue(test22Revenue); // Make sure to create state for this


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAssetsOutsideZimData();
  }, []);

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
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold', borderRightWidth: '4px', borderRightColor: 'white' }}>Total</th>
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 1</th>
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 2</th>
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 3</th>
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Sub Account 4</th>
                  <th style={{ backgroundColor: '#343a40', color: 'white', fontWeight: 'bold' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* Non Current Assets */}
                {nonCurrentAssetsData.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || nonCurrentAssetsData[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{ textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Repeat similar mapping for other categories */}
                {/* Non Current Assets Intangibles */}
                {nonCurrentAssetsIntangibles.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || nonCurrentAssetsIntangibles[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Current Assets */}
                {currentAssetsData.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || currentAssetsData[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Non Current Liabilities */}
                {nonCurrentLiabilities.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || nonCurrentLiabilities[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{ textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Current Liabilities */}
                {currentLiabilities.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || currentLiabilities[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{ textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Direct Expenses */}
                {directExpenses.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || directExpenses[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Direct Expenses Adjustments */}
                {directExpensesAdjustments.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || directExpensesAdjustments[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Admin Expenses  */}
                {adminExpenses.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || adminExpenses[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Admin Expenses  */}
                {expensesOnEAIT.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || expensesOnEAIT[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Revenue */}
                {revenue.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || revenue[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Revenue Adjustments */}
                {revenueAdjustments.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || revenueAdjustments[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}


                {/*Revenue Adjustments */}
                {test22Revenue.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || test22Revenue[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Other Revenue */}
                {otherRevenue.map((item, index) => (
                  <React.Fragment key={index}>
                    {index === 0 || otherRevenue[index - 1].fin_acc_account_class !== item.fin_acc_account_class ? (
                      <tr>
                        <td colSpan={11} style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'left' }}>
                          {item.fin_acc_account_class}
                        </td>
                      </tr>
                    ) : null}
                    <tr>
                      <td style={{textAlign: 'left', borderRightWidth: '4px', borderRightColor: 'black' }}>
                        {item.acc_account_name}<br />
                        <span style={{ textAlign: 'end' }}>{item.account_type}</span>
                      </td>
                      <td>{item.account_balance_todate_sub_account_1}</td>
                      <td>{item.account_balance_todate_sub_account_2}</td>
                      <td>{item.account_balance_todate_sub_account_3}</td>
                      <td>{item.account_balance_todate_sub_account_4}</td>
                      <td style={{ borderRightWidth: '4px', borderRightColor: 'black'}}>{}</td>
                      <td>{item.bi_sum_2023_sub_account_1}</td>
                      <td>{item.bi_sum_2023_sub_account_2}</td>
                      <td>{item.bi_sum_2023_sub_account_3}</td>
                      <td>{item.bi_sum_2023_sub_account_4}</td>
                      <td>{item.balance}</td>
                    </tr>
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






