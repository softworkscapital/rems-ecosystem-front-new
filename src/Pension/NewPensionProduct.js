import React, { useState, useEffect } from 'react';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import { PENSION_API_URL } from './component/config';
import { API_URL } from "./component/config";
import Swal from 'sweetalert2';

const NewPensionProduct = () => {
    const [currency, setCurrency] = useState('USD');
    const [contributionAmount, setContributionAmount] = useState('');
    const [contributionVariance, setContributionVariance] = useState('');
    const [contributionFrequency, setContributionFrequency] = useState('Monthly');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [pensionProductType, setPensionProductType] = useState('');
    const [minimumContribution, setMinimumContribution] = useState('');
    const [pensionEntityType, setPensionEntityType] = useState('');
    const [entityContribution, setEntityContribution] = useState('');
    const [estimatePayout, setEstimatePayout] = useState('');
    const [contributionsHoldingAccount, setContributionsHoldingAccount] = useState('');
    const [finAccInvestmentFundDetailsId, setFinAccInvestmentFundDetailsId] = useState('');
    const [pensionFundDetailsData, setPensionFundDetailsData] = useState([]);

    const [selectedSubAccounts, setSelectedSubAccounts] = useState({
        sub_account1: 'No',
        sub_account2: 'No',
        sub_account3: 'Yes',
    });

    useEffect(() => {
        const fetchFundsDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/fin_acc_investment_fund_details`);
                if (!response.ok) throw new Error(`Failed to fetch funds: ${await response.text()}`);
                const data = await response.json();
                setPensionFundDetailsData(data);
            } catch (error) {
                console.error('Fetch error:', error);
                Swal.fire({ title: 'Error', text: error.message, icon: 'error', confirmButtonText: 'OK' });
            } 
        };
    
        fetchFundsDetails();
    }, []);

    const handleCreatePensionProduct = async () => {
        const productData = {
            currency,
            contribution_amount: contributionAmount,
            contribution_variance: contributionVariance,
            contribution_frequency: contributionFrequency,
            product_name: productName,
            product_description: productDescription,
            pension_product_type: pensionProductType,
            minimum_contribution: minimumContribution,
            pension_entity_type: pensionEntityType,
            entity_contribution: entityContribution,
            estimate_payout: estimatePayout,
            contributions_holding_account: contributionsHoldingAccount,
            fin_acc_investment_fund_details_id: finAccInvestmentFundDetailsId,
            ...selectedSubAccounts,
        };

        // Basic validation
        if (!currency || !contributionAmount || !productName || !pensionProductType) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all required fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await fetch(`${PENSION_API_URL}/pension_products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            Swal.fire({
                title: 'Success!',
                text: 'Pension product created successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            resetForm(); // Reset the form after successful submission
            
        } catch (error) {
            console.error("Error submitting pension product:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error creating the pension product. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const resetForm = () => {
        setCurrency('USD');
        setContributionAmount('');
        setContributionVariance('');
        setContributionFrequency('Monthly');
        setProductName('');
        setProductDescription('');
        setPensionProductType('');
        setMinimumContribution('');
        setPensionEntityType('');
        setEntityContribution('');
        setEstimatePayout('');
        setContributionsHoldingAccount('');
        setFinAccInvestmentFundDetailsId('');
        setSelectedSubAccounts({
            sub_account1: 'No',
            sub_account2: 'No',
            sub_account3: 'No',
        });
    };

    const handleSubAccountChange = (index, value) => {
        const newSelections = {
            sub_account1: 'No',
            sub_account2: 'No',
            sub_account3: 'No',
        };

        newSelections[`sub_account${index + 1}`] = value;
        setSelectedSubAccounts(newSelections);
    };

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <div className="d-flex flex-grow-1">
                <div style={{ width: '250px' }}>
                    <SideBar />
                </div>
                <div className="flex-fill d-flex justify-content-center">
                    <div style={{ maxWidth: '80%', width: '100%' }}>
                        <TopNav />
                        <div className="container mt-6 mb-6" style={{ marginTop: 80, marginBottom: 70 }}>
                            <h2 className="mb-4 text-center">Create New Pension Product</h2>

                            <div className="card bg-white mt-4">
                                <div className="card-body mt-4">

                                    {/* Product Info Card */}
                                    <div className="card mb-4 bg-light mx-4">
                                        <div className="card-body">
                                            <h5 className="card-title">Product Info</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="productName" className="col-sm-3 col-form-label text-start">Product Name</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="text"
                                                            id="productName"
                                                            className="form-control"
                                                            value={productName}
                                                            onChange={(e) => setProductName(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="productDescription" className="col-sm-3 col-form-label text-start">Product Description</label>
                                                    <div className="col-sm-9">
                                                        <textarea
                                                            id="productDescription"
                                                            className="form-control"
                                                            value={productDescription}
                                                            onChange={(e) => setProductDescription(e.target.value)}
                                                            required
                                                        ></textarea>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="pensionProductType" className="col-sm-3 col-form-label text-start">Pension Product Type</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            id="pensionProductType"
                                                            className="form-select"
                                                            value={pensionProductType}
                                                            onChange={(e) => setPensionProductType(e.target.value)}
                                                        >
                                                            <option value="">Select Type</option>
                                                            <option value="Defined Contribution">Defined Contribution</option>
                                                            <option value="Defined Benefit">Defined Benefit</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="fund_details_id" className="col-sm-3 col-form-label text-start">Linked Fund Name</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            id="fund_details_id"
                                                            className="form-select"
                                                            value={finAccInvestmentFundDetailsId}
                                                            onChange={(e) => setFinAccInvestmentFundDetailsId(e.target.value)}
                                                        >
                                                            {pensionFundDetailsData.map((fund) => (
                                                                <option key={fund.investment_fund_details_id} value={fund.investment_fund_details_id}>
                                                                    {fund.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="currency" className="col-sm-3 col-form-label text-start">Currency</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            id="currency"
                                                            className="form-select"
                                                            value={currency}
                                                            onChange={(e) => setCurrency(e.target.value)}
                                                        >
                                                            <option value="USD">USD</option>
                                                            <option value="EUR">EUR</option>
                                                            <option value="GBP">GBP</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Product Details Card */}
                                    <div className="card mb-4 bg-light mx-4">
                                        <div className="card-body">
                                            <h5 className="card-title">Product Details</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="contributionAmount" className="col-sm-3 col-form-label text-start">Contribution Amount</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="number"
                                                            id="contributionAmount"
                                                            className="form-control"
                                                            value={contributionAmount}
                                                            onChange={(e) => setContributionAmount(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="contributionVariance" className="col-sm-3 col-form-label text-start">Contribution Variance</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            id="contributionVariance"
                                                            className="form-select"
                                                            value={contributionVariance}
                                                            onChange={(e) => setContributionVariance(e.target.value)}
                                                        >
                                                            <option value="Fixed Contribution">Fixed Contribution</option>
                                                            <option value="Flexible Benefit">Flexible Benefit</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="contributionFrequency" className="col-sm-3 col-form-label text-start">Contribution Frequency</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            id="contributionFrequency"
                                                            className="form-select"
                                                            value={contributionFrequency}
                                                            onChange={(e) => setContributionFrequency(e.target.value)}
                                                        >
                                                            <option value="Monthly">Monthly</option>
                                                            <option value="Quarterly">Quarterly</option>
                                                            <option value="Yearly">Yearly</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Additional Product Details Card */}
                                    <div className="card mb-4 bg-light mx-4">
                                        <div className="card-body">
                                            <h5 className="card-title">Additional Product Details</h5>
                                            <form>
                                                <div className="row mb-3">
                                                    <label htmlFor="minimumContribution" className="col-sm-3 col-form-label text-start">Minimum Contribution</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="number"
                                                            id="minimumContribution"
                                                            className="form-control"
                                                            value={minimumContribution}
                                                            onChange={(e) => setMinimumContribution(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                        <label htmlFor="pensionEntityType" className="col-sm-3 col-form-label text-start">Pension Entity Type</label>
                                                        <div className="col-sm-9">
                                                            <select
                                                                id="pensionEntityType"
                                                                className="form-select"
                                                                value={pensionEntityType}
                                                                onChange={(e) => setPensionEntityType(e.target.value)}
                                                            >
                                                                <option value="">Select Entity Type</option>
                                                                <option value="Individual">Individual</option>
                                                                <option value="Corporate">Corporate</option>
                                                                <option value="Corporate">Association</option>
                                                                <option value="Corporate">Grouping</option>
                                                                <option value="Non-Profit">Non-Profit</option>
                                                                {/* Add more options as needed */}
                                                            </select>
                                                        </div>
                                                    </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="entityContribution" className="col-sm-3 col-form-label text-start">Entity Contribution</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="number"
                                                            id="entityContribution"
                                                            className="form-control"
                                                            value={entityContribution}
                                                            onChange={(e) => setEntityContribution(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="estimatePayout" className="col-sm-3 col-form-label text-start">Estimate Payout</label>
                                                    <div className="col-sm-9">
                                                        <input
                                                            type="number"
                                                            id="estimatePayout"
                                                            className="form-control"
                                                            value={estimatePayout}
                                                            onChange={(e) => setEstimatePayout(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="contributionsHoldingAccount" className="col-sm-3 col-form-label text-start">Contributions Holding Account</label>
                                                    <div className="col-sm-9">
                                                    <select
                                                    id="contributionsHoldingAccount"
                                                    className="form-select"
                                                    value={contributionsHoldingAccount}
                                                    onChange={(e) => setContributionsHoldingAccount(e.target.value)}
                                                    >
                                                    <option value="">Select Account</option>
                                                    <option value="Account 1">Account 1</option>
                                                    <option value="Account 2">Account 2</option>
                                                    <option value="Account 3">Account 3</option>
                                                    {/* Add more options as needed */}
                                                    </select>
                                                    </div>
                                                    </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Sub Accounts Selection Card */}
                                    <div className="card mb-4 bg-light mx-4">
                                        <div className="card-body">
                                            <h5 className="card-title">Select Sub Accounts</h5>
                                            {['Sub Account 1', 'Sub Account 2', 'Sub Account 3'].map((account, index) => (
                                                <div className="row mb-3" key={index}>
                                                    <label className="col-sm-3 col-form-label text-start">{account}</label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            className="form-select"
                                                            onChange={(e) => handleSubAccountChange(index, e.target.value)}
                                                        >
                                                            <option value="No">No</option>
                                                            <option value="Yes">Yes</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        onClick={handleCreatePensionProduct}
                                    >
                                        Create Pension Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default NewPensionProduct;