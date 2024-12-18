import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';
import CustomerCard from './component/CustomerCard';
import income from '../Pension/component/images/income.svg';
import { API_URL } from '../config';
import { PENSION_API_URL } from './component/config';

const ContributionsPayments = () => {
    const curDate = new Date();

    // State variables
    const [debitAccMapId, setDebitAccMapId] = useState(1); 
    const [creditAccMapId, setCreditAccMapId] = useState(2); 
    const [finAccAccountMapId, setFinAccAccountMap] = useState(0);
    const [indexAccNameId, setIndexAccNameId] = useState("");
    const [indexAccName, setIndexAccName] = useState('');
    const [dualTransAccNameId, setDualTransAccNameId] = useState(0);
    const [dualTransAccName] = useState('Dual Transaction Account');
    const [datePaid] = useState(curDate.toISOString().slice(0, 10));
    const [description, setDescription] = useState("");
    const [costCenter, setCostCenter] = useState("");
    const [link] = useState(0);
    const [currency] = useState("USD");
    const rateToUsd = 24; 
    const [value, setValue] = useState(0);
    const [debit, setDebit] = useState(0);
    const [credit, setCredit] = useState(0);
    const [pmode, setPmode] = useState("Cash");
    const [requester, setRequester] = useState(localStorage.getItem('userName') || '');
    const [confirmed] = useState(true);
    const [authorized] = useState(true);
    const [committed] = useState(true);
    const [txnReference, setTxnReference] = useState('');
    const [flag] = useState(0);
    const [comment, setComment] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [pensionPlans, setPensionPlans] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [cashBank, setCashBank] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [creditBalance, setBalance] = useState(0);
    const [debitBalance, setDebitBalance] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [transHistory, setTransHistory] = useState([]);
    const [selectedPaymentStyle, setSelectedPaymentStyle] = useState('');
    const [selectedOtherPlan, setSelectedOtherPlan] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${PENSION_API_URL}/members`);
                if (!response.ok) throw new Error('Failed to load customers');
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Error', text: error.message });
            }
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (searchTerm.length > 1) {
            const results = customers.filter(customer =>
                customer.membership_id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCustomers(results);
        } else {
            setFilteredCustomers([]);
        }
    }, [searchTerm, customers]);

    const handleSelectCustomer = async (customer) => {
        setSelectedCustomer(customer);
        setSearchTerm('');
        await fetchPensionPlans(customer.membership_id);
    };

    const fetchPensionPlans = async (memberId) => {
        try {
            const response = await fetch(`${PENSION_API_URL}/member_products/product-plan/${memberId}`);
            if (!response.ok) throw new Error('Failed to load pension plans');
            const data = await response.json();
            console.log(data);
            setPensionPlans(Array.isArray(data) ? data : []);
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    useEffect(() => {
        const fetchBankAccounts = async () => {
            try {
                const response = await fetch(`${API_URL}/accountmap/acc/maps/index/info`);
                if (!response.ok) throw new Error('Failed to load cash bank accounts');
                const data = await response.json();
                setCashBank(data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBankAccounts();
    }, []);

    useEffect(() => {
        if (isLoaded) {
            const calculations = async () => {
                const checkBal = creditBalance + credit;
                const checkDebit = debitBalance - debit;
                await setBalance(checkBal);
                await setDebitBalance(checkDebit);
            };
            calculations();
        } else {
            setIsLoaded(true);
        }
    }, [value]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check for required fields
        if (!creditAccMapId || !selectedPlan || !value) {
            Swal.fire({ icon: 'warning', title: 'Missing Information', text: 'Please ensure all required fields are filled out.' });
            return;
        }
    
        const calculatedCredit = value * rateToUsd; 
        const calculatedValue = value; 
    
        const mapObj = {
            debitAccMapId, // Assuming this is defined earlier in your code
            creditAccMapId, // Assuming this is defined earlier in your code
            value,
            linkedOn: new Date().toISOString(), // Assuming this needs to be set
            linkedBy: '', // Assuming this needs to be set
            fin_acc_account_map_id: 15, // Assuming this is related
            index_acc_name_id: indexAccNameId,
            index_acc_name: indexAccName,
            dual_trans_acc_name_id: debitAccMapId,
            dual_trans_acc_name: dualTransAccName,
            datepaid: datePaid,
            datefor: datePaid,
            description,
            cost_center: '',
            link: 0,
            currency,
            rate_to_usd: rateToUsd,
            debit: '',
            credit: calculatedValue, // Assuming this is intended to be the calculated value
            pmode,
            requester,
            confirmed,
            authorized,
            committed, // Note: corrected spelling from 'comitted' to 'committed'
            txn_reference: txnReference,
            flag,
            comment,
            creditBalance: 0, // Assuming this needs to be set
            debitBalance: 0, // Assuming this needs to be set
            member_contribution_amount: calculatedValue,
            company_contribution_amount: 0,
            time_rec: new Date().toISOString(),
            interest: 0,
            principal: 0,
            deposit: 0,
            folio: '',
            balance: 0,
            total_paid_contributions: calculatedValue,
            branch_id: 0,
            member_id: selectedCustomer ? selectedCustomer.id : null,
            sync_status: 'Pending',
            sync_date_time: new Date().toISOString(),
            sub_account_1: '',
            sub_account_2: '',
            sub_account_3: calculatedValue,
            sub_account_4: '',
            sub_account_5: '',
            sales_shift_id: 0,
            operator: '',
            product_pension_plan_id: selectedPlan,
            months_behind: 0,




        };
    
        try {
            const response = await fetch(`${API_URL}/accountlinking/post/income`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mapObj),
            });
    
            // Check if the response is OK
            if (!response.ok) {
                // Attempt to parse the response as JSON for error message
                const errorText = await response.text(); // Get raw text
                let errorMessage = 'Failed to save payment'; // Default error message
    
                try {
                    const errorData = JSON.parse(errorText); // Try to parse JSON
                    errorMessage = errorData.message || errorMessage; // Use error message if available
                } catch (jsonError) {
                    // Handle case where response is not valid JSON
                    console.error('Error parsing JSON:', jsonError);
                }
    
                throw new Error(errorMessage); // Throw the error to be caught below
            }
    
            // Parse the successful response as JSON
            const responseData = await response.json();
            Swal.fire({ text: responseData.message || "Saved successfully", icon: "success" });
            resetForm(); // Reset the form after successful submission
        } catch (error) {
            // Show error message in SweetAlert
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };
    
    const resetForm = () => {
        setSelectedCustomer(null);
        setSelectedPlan('');
        setValue(0); // Reset to 0
        setDescription('');
        setComment('');
        setIndexAccNameId(0);
        setIndexAccName('');
        setSearchTerm('');
    };

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <div className="d-flex flex-grow-1">
                <div style={{ width: '250px' }}>
                    <SideBar />
                </div>
                <div className="flex-fill d-flex justify-content-center">
                    <div style={{ maxWidth: '90%', width: '100%' }}>
                        <TopNav />
                        <div className="container mt-4">
                            <h2 className="mb-4" style={{ marginTop: 80 }}>Contributions Payments</h2>
                            <div className="row" style={{ height: '90%' }}>
                                <div className="col-md-9">
                                    <div className="bg-white p-4 mb-4" style={{ borderRadius: '8px' }}>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by Membership ID"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            {filteredCustomers.length > 0 && (
                                                <ul className="list-group mt-2">
                                                    {filteredCustomers.map(customer => (
                                                        <li
                                                            key={customer.id}
                                                            className="list-group-item"
                                                            style={{ textAlign: 'left' }}
                                                            onClick={() => handleSelectCustomer(customer)}
                                                        >
                                                            {customer.membership_id} - {customer.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        {selectedCustomer ? (
                                            <>
                                                <CustomerCard customer={selectedCustomer} />
                                                <div className="pension-plans mt-4">
                                                    <h3>Pension Plans</h3>
                                                    <hr />
                                                    <div className="row">
                                                        {pensionPlans.map(plan => (
                                                           <div className="col-md-6"  key={plan.member_product_id}>
                                                                <div className="card mb-3" style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)' }}> {/* 50% transparent green */}
                                                                    <div className="card-body" >
                                                                        <h5 className="card-title"><strong>{plan.product_name}</strong></h5>
                                                                        <p className="card-text text-start">{plan.product_description}</p>
                                                                        <p className="card-text text-start"><strong>Contribution Amount:</strong> {plan.contribution_amount}{plan.currency}</p>
                                                                        <p className="card-text text-start"><strong>Product Type:</strong> {plan.pension_product_type}</p>
                                                                        <p className="card-text text-start"><strong>Contribution Frequency:</strong> {plan.contribution_frequency}</p>
                                                                        <p className="card-text text-start"><strong>Contribution Variance:</strong> {plan.contribution_variance}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="card mt-4">
                                                    <div className="card-body text-start">
                                                        <h3 className="card-title text-center">Make a Payment</h3>
                                                        <form onSubmit={handleSubmit}>
    <div className="mb-3 row">
        <label htmlFor="plan" className="form-label col-md-4">Select Plan</label>
        <div className="col-md-8">
            <select
                className="form-select"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
            >
                {pensionPlans.map(plan => (
                    <option key={plan.member_product_id} value={plan.member_product_id}>
                        {plan.product_name}
                    </option>
                ))}
            </select>
        </div>
    </div>


    {pensionPlans.map(plan => (
                                                           <div className="col-md-6"  key={plan.member_product_id}>
                                                                <div className="card mb-3">                                                                     <div  >
                                                                        <p className="card-text text-start"><strong>Contribution Frequency:</strong> {plan.company_contribution_amount}</p>
                                                                        <p className="card-text text-start"><strong>Contribution Variance:</strong> {plan.member_contribution_amount}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
  

    <div className="mb-3 row">
        <label htmlFor="paymentStyle" className="form-label col-md-4">Payment Style</label>
        <div className="col-md-8">
            <select
                className="form-select"
                value={selectedPaymentStyle}
                onChange={(e) => setSelectedPaymentStyle(e.target.value)}
            >
                <option value="Auto Spread Accordingly">Auto Spread Accordingly</option>
                <option value="Monthly Member Contribution Normal">Capitalize</option>
                <option value="Allocate Manual">Manually Allocate</option>
            </select>
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="otherPlan" className="form-label col-md-4">Select Other Plan</label>
        <div className="col-md-8">
            <select
                className="form-select"
                value={selectedOtherPlan}
                onChange={(e) => setSelectedOtherPlan(e.target.value)}
            >
                <option value="Monthly Member Contribution Normal">Monthly Member Contribution Normal</option>
                <option value="Monthly Member Contribution Voluntary">Monthly Member Contribution Voluntary</option>
                <option value="Monthly Member Areas">Monthly Member Areas</option>
                <option value="Monthly Member Other">Monthly Member Other</option>
                <option value="Monthly Corporate Contribution Normal">Monthly Corporate Contribution Normal</option>
                <option value="Monthly Corporate Contribution Voluntary">Monthly Corporate Contribution Voluntary</option>
                <option value="Monthly Corporate Areas">Monthly Corporate Areas</option>
                <option value="Monthly Corporate Other">Monthly Corporate Other</option>
                <option value="Other">Other</option>
            </select>
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="fin_acc_account_map_id" className="form-label col-md-4">To:</label>
        <div className="col-md-8">
            <select
                id="fin_acc_account_map_id"
                value={indexAccName}
                onChange={e => {
                    const selectedOption = cashBank.find(option => option.acc_account_name === e.target.value);
                    if (selectedOption) {
                        setIndexAccNameId(selectedOption.fin_acc_account_map_id);
                        setIndexAccName(selectedOption.acc_account_name);
                    }
                }}
                required
                className="form-control"
            >
                <option value="">Select Account</option>
                {cashBank.map(option => (
                    <option key={option.fin_acc_account_map_id} value={option.acc_account_name}>
                        {option.acc_account_name}
                    </option>
                ))}
            </select>
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="amount" className="form-label col-md-4">Amount</label>
        <div className="col-md-8">
            <input
                type="number"
                id="amount"
                className="form-control"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
            />
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="description" className="form-label col-md-4">Description</label>
        <div className="col-md-8">
            <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="paymentMode" className="form-label col-md-4">Payment Mode</label>
        <div className="col-md-8">
            <select
                id="paymentMode"
                className="form-select"
                value={pmode}
                onChange={(e) => setPmode(e.target.value)}
            >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
            </select>
        </div>
    </div>

    <div className="mb-3 row">
        <label htmlFor="notes" className="form-label col-md-4">Notes</label>
        <div className="col-md-8">
            <input
                id="notes"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
    </div>

    <button type="submit" className="btn btn-primary">Submit Payment</button>
</form>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <img src={income} alt="Default" style={{ width: '100%', marginTop: '20px' }} />
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="bg-white p-4" style={{ borderRadius: '8px', height: '80%' }}>
                                        <div className="card-body">
                                            <h3 className="card-title">Daily Received Funds</h3>
                                            <hr />
                                            <select className="form-select" value={currency} readOnly>
                                                <option value="USD">USD</option>
                                                <option value="ZAR">ZAR</option>
                                                <option value="ZIG">ZIG</option>
                                            </select>
                                            <div className="mt-3" style={{ backgroundColor: '#f0f8ff', padding: '10px', borderRadius: '5px' }}>
                                                <strong>Current Amount:</strong> {currency === 'USD' ? 1000 : currency === 'ZAR' ? 2000 : 1500}
                                            </div>
                                        </div>
                                    </div>
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

export default ContributionsPayments;