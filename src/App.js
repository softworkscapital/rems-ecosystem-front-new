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
import SalesSettings from './Pos/SalesSettings';
import Invoice from './Pos/Invoice';
import InvoiceReview from './Pos/InvoiceReview';
import CreateSourceDocument from './Pos/CreateSourceDocument';
import PensionHome from './Pension/PensionHome';
import PensionBlank from './Pension/PensionBlank';
import InvestmentRevenue from './Pension/InvestmentRevenue';
import InvestmentPortifolios from './Pension/InvestmentPortifolios';
import NewMembers from './Pension/NewMembers';
import Products from './Pension/Products';
import SurveyQuestions from './Pension/SurveyQuestions';
import CreateQuestionnaire from './Pension/CreateQuestionnaire';
import SurveyAnswers from './Pension/SurveyAnswers';
import SurveyReviews from './Pension/SurveyReviews';
import SwitchView from './Pension/SwitchView';
import AnswerQuestionnaire from './Pension/AnswerQuestionnaire';
import ContributionsPayments from './Pension/ContributionsPayments';
import NewPensionProduct from './Pension/NewPensionProduct';
import Memberships from './Pension/Memberships';
import Dashboard from './Pension/Dashboard';
import CustomerProfile from './Pension/CustomerProfile';
import ApproveMembers from './Pension/ApproveMembers';


import InvestmentFunds from "./Pension/InvestimentFund";
import PlanContributions from "./Pension/PlanContributions";
import InvestmentAssets from "./Pension/InvestmentAsset";
import ContributionsRecievedAccounts from "./Pension/ContributionRecievedAccounts";
import PurchaseInvestmentAssets from "./Pension/PurchaseInvestmentAssets";
import ApproveAsset from "./Pension/ApproveAsset";
import AddInvestmentFund from "./Pension/AddInvestmentFund";


import FinStatementsMenu from "./Pension/FinStatementsMenu";
import FinDebtorsAgeAnalysis from "./Pension/FinDebtorsAgeAnalysis";
import FinStatementsPrescribedAssetInvestmentReport from "./Pension/FinStatementPrescribedAssetsInvestmentReport";
import FinUnclaimedBenefitsAgeAnalysis from "./Pension/FinUnclaimedBenefitsAgeAnalysis";
import FinMembershipStatistics from "./Pension/FinMembershipStatistics";
import FinAssetsOutsideZim from "./Pension/FinAssetsOutsideZim";
import FinSponsoringEmployerContributionArrears from "./Pension/FinSponsoringEmployerContributionArrears";
import FinTrialBalance from "./Pension/FinTrialBalance";



import Communications from './Pension/communications';
import Programmes from './Pension/Programmes';


import InvestmentFundsOverwiew from './Pension/InvestmentFundsOverwiew';


import About from './PensionClientSelfService/ClientAbout';
import ClientDashboard from './PensionClientSelfService/ClientDashboard';
import ClientLogin from './PensionClientSelfService/ClientLogin';
import ClientHome from './PensionClientSelfService/ClientHome';
import ClientProfile from './PensionClientSelfService/ClientProfile';
import ClientContribution from './PensionClientSelfService/ClientContribution';
import ClientPayouts from './PensionClientSelfService/ClientPayouts';
import ClientScenerio from './PensionClientSelfService/ClientScenario';
import ClientFeedback from './PensionClientSelfService/ClientFeedBack';
import ClientFAQ from './PensionClientSelfService/ClientFAQ';
import ClientAbout from './PensionClientSelfService/ClientAbout';


import PayrollEmployeeDetails from './Payroll/PayrollEmployeeDetails';
import PayrollAddAttendanceRecord from './Payroll/PayrollAddAttendance';
import PayrollEmployeeRoles from './Payroll/PayrollEmployeeRoles';
import PayrollAllowances from './Payroll/PayrollAllowances';
import PayrollAddBankDetail from './Payroll/PayrollAddBankDetail';
import PayrollEmployeeRecords from './Payroll/PayrollEmployeeRecords';
import PayrollIncome from './Payroll/Payrollncome';
import PayrollRecords from './Payroll/PayrollPayRuns';
import PayrollPaySlips from './Payroll/PayrollPaySlips';
import PayrollPayScales from './Payroll/PayrollPayScales';
import PayrollControlAccount from './Payroll/PayrollControlAccounts';
import PayrollBankFilePreView from './Payroll/PayrollBankFilePreView';


import CashSaleReview from './Pos/CashSaleReview';
import CashSale from './Pos/CashSale';
import CompanySetup from './Pos/CompanySetup';
import BranchSetup from './Pos/BranchSetup';
import UserSetup from './Pos/UserSetup';


import CreateCompany from './xgolife/CreateCompany';
import CreateBranch from './xgolife/CreateBranch';
import CreateUser from './xgolife/CreateUser';
import AddStock from './xgolife/AddStock';
import ViewStore from './xgolife/ViewStore';
import XGoSwitchView from './xgolife/SwitchView';


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
          <Route path='/' element={<Login />}></Route>
          <Route path='/MainMenu' element={<MainMenu />}></Route>
          <Route path='/CashSaleReview' element={<CashSaleReview/>}></Route>
          <Route path='/ViewStore' element={<ViewStore/>}></Route>
          <Route path='/AddStock' element={<AddStock/>}></Route>
          <Route path='/CreateUser' element={<CreateUser/>}></Route>
          <Route path='/CreateBranch' element={<CreateBranch/>}></Route>
          <Route path='/CreateCompany' element={<CreateCompany/>}></Route>
          <Route path='/CashSale' element={<CashSale/>}></Route>
          <Route path='/CompanySetup' element={<CompanySetup/>}></Route>
          <Route path='/BranchSetup' element={<BranchSetup/>}></Route>
          <Route path='/UserSetup' element={<UserSetup/>}></Route>
          <Route path='/XGoSwitchView' element={<XGoSwitchView/>}></Route>


          <Route path='/PayrollEmployeeDetails' element={<PayrollEmployeeDetails />}></Route>
          <Route path='/PayrollAddAttendanceRecord' element={<PayrollAddAttendanceRecord />}></Route>
          <Route path='/PayrollEmployeeRoles' element={<PayrollEmployeeRoles />}></Route>
          <Route path='/PayrollAllowances' element={<PayrollAllowances />}></Route>
          <Route path='/PayrollAddBankDetail' element={<PayrollAddBankDetail />}></Route>
          <Route path='/PayrollEmployeeRecords' element={<PayrollEmployeeRecords />}></Route>
          <Route path='/PayrollIncome' element={<PayrollIncome />}></Route>
          <Route path='/PayrollRecords' element={<PayrollRecords />}></Route>
          <Route path='/PayrollPaySlips' element={<PayrollPaySlips />}></Route>
          <Route path='/PayrollPayScales' element={<PayrollPayScales />}></Route>
          <Route path='/PayrollControlAccount' element={<PayrollControlAccount />}></Route>
          <Route path='/PayrollBankFilePreView' element={<PayrollBankFilePreView />}></Route>


          <Route path='/InvoiceReview' element={<InvoiceReview />}></Route>
          <Route path='/Memberships' element={<Memberships />}></Route>
          <Route path='/CustomerProfile' element={<CustomerProfile />}></Route>
          <Route path='/Dashboard' element={<Dashboard />}></Route>
          <Route path='/ApproveMembers' element={<ApproveMembers />}></Route>
          <Route path='/NewMembers' element={<NewMembers />}></Route>
          <Route path='/NewPensionProduct' element={<NewPensionProduct />}></Route>
          <Route path='/ContributionsPayments' element={<ContributionsPayments />}></Route>
          <Route path='/Products' element={<Products />}></Route>
          <Route path='/SurveyQuestions' element={<SurveyQuestions />}></Route>
          <Route path='/CreateQuestionnaire' element={<CreateQuestionnaire />}></Route>
          <Route path='/SurveyAnswers' element={<SurveyAnswers />}></Route>
          <Route path='/SurveyReviews' element={<SurveyReviews/>}></Route>
          <Route path='/SwitchView' element={<SwitchView/>}></Route>
          <Route path='/AnswerQuestionnaire' element={<AnswerQuestionnaire/>}></Route>
          <Route path='/PensionHome' element={<PensionHome />}></Route>
          <Route path='/InvestmentRevenue' element={<InvestmentRevenue />}></Route>
          <Route path='/PensionBlank' element={<PensionBlank />}></Route>
          <Route path='/InvestmentPortifolios' element={<InvestmentPortifolios />}></Route>
          <Route path='/KwaunodaLogin' element={<KwaunodaLogin />}></Route>
          <Route path='/SalesSettings' element={<SalesSettings />}></Route>
          <Route path='/Invoice' element={<Invoice />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/Invoice' element={<Invoice />}></Route>
          <Route path='/CreateSourceDocument' element={<CreateSourceDocument />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/funnel' element={<MarketingFunnel />}></Route>
          <Route path='/followup' element={<FollowUp />}></Route>
          <Route path='/prospect' element={<NewProspect />}></Route>
          <Route path='/newuser' element={<AddUser />}></Route>
          <Route path='findashboard' element={<FinDashboard />}></Route>
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



          <Route path="/investimentFund" element={<InvestmentFunds />}></Route>
          <Route path="/PlanContribution" element={<PlanContributions />}></Route>
          <Route path="/investmentAssets" element={<InvestmentAssets />}></Route>
          <Route path="/ContributionsRecievedAccounts" element={<ContributionsRecievedAccounts />}></Route>
          <Route path="/PurchaseInvestment" element={<PurchaseInvestmentAssets />}></Route>
          <Route path="/ApproveAsset" element={<ApproveAsset/>}></Route>
          <Route path="/AddInvesmentFund" element={<AddInvestmentFund/>}></Route>



          <Route path="/FinStatementsMenu" element={<FinStatementsMenu/>}></Route>
          <Route path="/FinDebtorsAgeAnalysis" element={<FinDebtorsAgeAnalysis/>}></Route>
          <Route path="/FinStatementsPrescribedAssetInvestmentReport" element={<FinStatementsPrescribedAssetInvestmentReport/>}></Route>
          <Route path="/FinUnclaimedBenefitsAgeAnalysis" element={<FinUnclaimedBenefitsAgeAnalysis/>}></Route>
          <Route path="/FinMembershipStatistics" element={<FinMembershipStatistics/>}></Route>
          <Route path="/FinAssetsOutsideZim" element={<FinAssetsOutsideZim/>}></Route>
          <Route path="/FinSponsoringEmployerContributionArrears" element={<FinSponsoringEmployerContributionArrears/>}></Route>
          <Route path="/FinTrialBalance" element={<FinTrialBalance/>}></Route>


          <Route path="/TimeKeepings" element={<Communications/>}></Route>
          <Route path="/Programmes" element={<Programmes/>}></Route>
          <Route path="/InvestmentFundsOverwiew" element={<InvestmentFundsOverwiew/>}></Route>



          <Route path='/ClientAbout' element={<About/>}></Route>
          <Route path='/ClientDashboard' element={<ClientDashboard/>}></Route>
          <Route path='/ClientLogin' element={<ClientLogin/>}></Route>
          <Route path='/ClientHome' element={<ClientHome/>}></Route>
          <Route path='/ClientProfile' element={<ClientProfile/>}></Route>
          <Route path='/ClientContribution' element={<ClientContribution/>}></Route>
          <Route path='/ClientPayouts' element={<ClientPayouts/>}></Route>
          <Route path='/ClientScenerio' element={<ClientScenerio/>}></Route>
          <Route path='/ClientFeedback' element={<ClientFeedback/>}></Route>
          <Route path='/ClientFAQ' element={<ClientFAQ/>}></Route>
          <Route path='/ClientAbout' element={<ClientAbout/>}></Route>
 
 
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
