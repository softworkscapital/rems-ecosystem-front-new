import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config'; // Ensure this is the correct path to your config

const TopNav = () => {
    const [username, setUsername] = useState(localStorage.getItem('userName'));
    const [companyname, setCompanyName] = useState('');
    const [branchname, setBranchName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [branchId, setBranchId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedCompanyId = await AsyncStorage.getItem('selectedCompanyId');
                const storedBranchId = await AsyncStorage.getItem('selectedBranchId');
                const username = localStorage.getItem('userName');

                console.log("Fetched Company ID from AsyncStorage:", storedCompanyId);
                console.log("Fetched Branch ID from AsyncStorage:", storedBranchId);

                setCompanyId(storedCompanyId);
                setBranchId(storedBranchId);

                if (storedCompanyId) {
                    const companyResponse = await fetch(`${API_URL}/companysetup/company_name/${storedCompanyId}`);
                    const companyData = await companyResponse.json();
                    setCompanyName(companyData.name || 'Company not found');
                }

                if (storedBranchId) {
                    const branchResponse = await fetch(`${API_URL}/branches/branch_name/${storedBranchId}`);
                    const branchData = await branchResponse.json();
                    setBranchName(branchData.branch_name || 'Branch not found');
                }
            } catch (error) {
                console.error("Error fetching data from AsyncStorage or API:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <div className="d-flex align-items-center" style={{ marginLeft: '20px'}}>
                <a  href="../menu"><p class="navbar-brand">REMS PENSION FUND </p> <p style={{marginTop: '-40px',marginLeft: '-150px'}}>Logged in as: {username}</p></a>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '500px', fontSize:"15px" }}>
                        <p style={{ margin: '0 10px' }}>Company: {companyname || 'Loading...'}</p>
                        <p style={{ margin: '0 10px' }}>Branch: {branchname || 'Loading...'}</p>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <li className="nav-item">
                            <div id="custom-search" className="top-search-bar">
                                <input className="form-control" type="text" placeholder="Search.." />
                            </div>
                        </li>
                        <li className="nav-item dropdown connection">
                            <a className="nav-link" href="/menu" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="../assets/images/menu.png" alt="" className="user-avatar-md rounded-circle" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right connection-dropdown"></ul>
                        </li>
                        <li className="nav-item dropdown nav-user">
                            <a className="nav-link nav-user-img" href="/" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src="../assets/images/logout.png" alt="" className="user-avatar-md rounded-circle" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                                <div className="nav-user-info">
                                    <h5 className="mb-0 text-white nav-user-name">John Abraham</h5>
                                    <span className="status"></span><span className="ml-2">Available</span>
                                </div>
                                <a className="dropdown-item" href="0"><i className="fas fa-user mr-2"></i>Account</a>
                                <a className="dropdown-item" href="0"><i className="fas fa-cog mr-2"></i>Setting</a>
                                <a className="dropdown-item" href="0"><i className="fas fa-power-off mr-2"></i>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default TopNav;