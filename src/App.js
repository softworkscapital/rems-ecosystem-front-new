import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import Menu from './Menu';
import MarketingFunnel from './MarketingFunnel';
import NewProspect from './NewProspect';
import FollowUp from './FollowUp';
import AddUser from './AddUser';
import FinDashboard from './Finance/FinDashboard';
import Income from './Finance/Income';
import Expenses from './Finance/AdminExpenses';
import Accounts from './Finance/Accounts';
import AddExpenses from './Finance/AddExpenses';
import AddAccount from './Finance/AddAccount';
import AccountMap from './Finance/AccountMap';
import DirectExpenses from './Finance/DirectEpenses';
import CashBank from './Finance/CashBank';
import CreateAccount from './Finance/CreateAccount';
import AddDirectExp from './Finance/AddDirectExp';
import Projects from './Finance/Projects';
import AddIncome from './Finance/AddIncome';
import CostCenter from './Finance/CostCenter';
import AddCostcenter from './Finance/AddCostcenter';
import PosHome from './Pos/pos';
import Inventory from './Pos/inventory';
import PettyCash from './Pos/pettyCash';
import AccReg from './AccountReg';
import OpenShift from './Pos/openShift';
import PosGasDash from './PosGas/PosGas';
import SalesShift from './PosGas/SalesShift';
import ControlPanel from './PosGas/ControlPanel';
import MySite from './PosGas/MySite';
import Ecosystem from './PosGas/Ecosystem';
import CreateProduct from './PosGas/CreateProduct';
import BuyProduct from './PosGas/BuyProduct';
import ProcessingOrder from './PosGas/ProcessingOrder';
import MainMenu from './start/MainMenu';
import KwaunodaLogin from './KwaunodaLogin';
import Views from './PosGas/Views';
import MyProducts from './PosGas/MyProducts';

function App() {

  const [count, setcount] = useState(0);

  const add = () => setcount((prev) => prev + 1);
  const subtract = () => setcount((prev) => prev - 1);

  return (
    <BrowserRouter>
      <div className="App">
        <div>
        </div>
        {/* <Home></Home> */}
        <Routes>
          <Route path='/' element={<MainMenu />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/KwaunodaLogin' element={<KwaunodaLogin />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/funnel' element={<MarketingFunnel />}></Route>
          <Route path='/followup' element={<FollowUp />}></Route>
          <Route path='/prospect' element={<NewProspect />}></Route>
          <Route path='/newuser' element={<AddUser />}></Route>
          <Route path='/findashboard' element={<FinDashboard />}></Route>
          <Route path='/income' element={<Income />}></Route>
          <Route path='/expenses' element={<Expenses />}></Route>
          <Route path='/directexpenses' element={<DirectExpenses />}></Route>
          <Route path='/accounts' element={<Accounts />}></Route>
          <Route path='/cashbank' element={<CashBank />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/eddexpenses' element={<AddExpenses />}></Route>
          <Route path='/adddirectexpenses' element={<AddDirectExp />}></Route>
          <Route path='/addaccounts' element={<AddAccount />}></Route>
          <Route path='/accountmap' element={<AccountMap />}></Route>
          <Route path='/createacc' element={<CreateAccount />}></Route>
          <Route path='/addincome' element={<AddIncome />}></Route>
          <Route path='/costcenter' element={<CostCenter />}></Route>
          <Route path='/addcostcenter' element={<AddCostcenter />}></Route>
          <Route path='/pos' element={<PosHome />}></Route>
          <Route path='/inventory' element={<Inventory />}></Route>
          <Route path='/pettycash' element={<PettyCash />}></Route>
          <Route path='/openshift' element={<OpenShift />}></Route>
          <Route path='/account/registration' element={<AccReg />}></Route>
          <Route path='posgas' element={<PosGasDash/>}></Route>
          <Route path='saleshift' element={<SalesShift/>}></Route>
          <Route path='ControlPanel' element={<ControlPanel/>}></Route>
          <Route path='MySite' element={<MySite/>}></Route>
          <Route path='Ecosystem' element={<Ecosystem/>}></Route>
          <Route path='CreateProduct' element={<CreateProduct/>}></Route>
          <Route path='BuyProduct' element={<BuyProduct/>}></Route>
          <Route path='ProcessingOrder' element={<ProcessingOrder/>}></Route>
          <Route path='Views' element={<Views/>}></Route>
          <Route path='MyProducts' element={<MyProducts/>}></Route>
 
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
