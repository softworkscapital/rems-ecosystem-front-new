import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import EmployeeRecords from './EmployeeRecords';
import DirectEpenses from './DirectEpenses';
import PayScales from './PayScales';
import EmployeeDetails from './EmployeeDetails'
import Attendances from './Attendances';
import Allowances from './Allowances';
import Deductions from './Deductions';
import AddDeduction from './AddDeduction';
import DeductionType from './DeductionType';
import DeductionRun from './DeductionRun';
import EmployeeRoles from './EmployeeRoles';
import AddEmployeeRole from './AddEmployeeRole';
import AllowanceRun from './AllowanceRun';
import AllowanceType from './AllowanceType';
import AddAllowance from './AddAllowance';
import AddEmployeeRecord from './AddEmployeeRecord';
import AddEmployeeDetail from './AddEmployeeDetail';
import AddAttendance from './AddAttendance';
import PayRuns from './PayRuns';
import TimeKeepings from './TimeKeepings';
import PaySlips from './PaySlips';
import AddAllowanceType from './AddAllowanceType';
import AddDeductionRun from './AddDeductionRun';
import ControlAccounts from './ControlAccounts';
import RunPayRoll from './RunPayRoll';
import AddDeductionType from './AddDeductionType';
import Banks from './Banks';
import BankFilePreView from './BankFilePreView';
import AddTimeKeeping from './AddTimeKeeping';
import AddPayScale from './AddPayScale';
import AddBankDetail from './AddBankDetail';
import EmployeeDetailsList from './EmployeeDetailsList';



import PensionHome from './Pension/PensionHome';
import PensionBlank from './Pension/PensionBlank';
import InvestmentPortifolios from './Pension/InvestmentPortifolios';
import NewMembers2 from './NewMembers2';
import PensionHome2 from './PensionHome2';


function App() {
  const [count, setcount] = useState(0);

  const add = () => setcount((prev) => prev + 1);
  const subtract = () => setcount((prev) => prev - 1);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/EmployeeRecords" />} /> {/* Redirect to EmployeeRecords */}
          <Route path="/EmployeeRecords" element={<EmployeeRecords />} />
          <Route path="/DirectEpenses" element={<DirectEpenses />} />
          <Route path="/NewMembers2" element={<NewMembers2 />} />
          <Route path="/PensionHome2" element={<PensionHome2 />} />
          <Route path="/PayScales" element={<PayScales />} />
          <Route path="/EmployeeDetailsList" element={<EmployeeDetailsList />} />
          <Route path="/Attendances" element={<Attendances />} />
          <Route path="/AddAttendance" element={<AddAttendance />} />
          <Route path="/EmployeeDetails" element={<EmployeeDetails/>} />
          <Route path="/EmployeeRoles" element={<EmployeeRoles/>} />
          <Route path="/AddEmployeeRole" element={<AddEmployeeRole/>} />
          <Route path="/Allowances" element={<Allowances/>}/>  
          <Route path="/AddAllowance" element={<AddAllowance/>}/> 
          <Route path="/AllowanceRun" element={<AllowanceRun/>}/>
          <Route path="/AllowanceType" element={<AllowanceType/>}/>
          <Route path="/DeductionRun" element={<DeductionRun/>}/>
          <Route path="/DeductionType" element={<DeductionType/>}/>
          <Route path="/Deductions" element={<Deductions/>}/>
          <Route path="/AddDeduction" element={<AddDeduction/>}/>
          <Route path="/AddEmployeeRecord" element={<AddEmployeeRecord/>}/>
          <Route path="/AddEmployeeDetail" element={<AddEmployeeDetail/>}/>
          <Route path="/PayRuns" element={<PayRuns/>}/>
          <Route path="/TimeKeepings" element={<TimeKeepings/>}/>
          <Route path="/PaySlips" element={<PaySlips/>}/>
          <Route path="/AddAllowanceType" element={<AddAllowanceType/>}/>
          <Route path="/AddDeductionRun" element={<AddDeductionRun/>}/>
          <Route path="/ControlAccounts" element={<ControlAccounts/>}/>
          <Route path="/RunPayRoll" element={<RunPayRoll/>}/>
          <Route path="/AddDeductionType" element={<AddDeductionType/>}/>
          <Route path="/Banks" element={<Banks/>}/>
          <Route path="/BankFilePreView" element={<BankFilePreView/>}/>
          <Route path="/AddTimeKeeping" element={<AddTimeKeeping/>}/>
          <Route path="/AddPayScale" element={<AddPayScale/>}/>
          <Route path="/AddBankDetail" element={<AddBankDetail/>}/>


          <Route path="/PensionHome" element={<PensionHome/>}/>
          <Route path="/PensionBlank" element={<PensionBlank/>}/>
          <Route path="/InvestmentPortifolios" element={<InvestmentPortifolios/>}/>


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;