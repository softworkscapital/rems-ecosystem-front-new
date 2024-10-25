import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import Swal from "sweetalert2";
import { API_URL } from "../config";

const ControlPanel = () => {
  const [accounts, setAccounts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  let [myBranchName, setMyBranchName] = useState();

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [closingInventory, setClosingInventory] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [destinationBranch, setDestinationBranch] = useState(""); // State for destination branch
  const [newalastClosingValue, setNewalastClosingValue] = useState(""); // State for destination branch

  // Purchase Modal State
  const [supplier, setSupplier] = useState("");
  const [costCentre, setCostCentre] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [datePaid, setDatePaid] = useState("");
  const [volume, setVolume] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");

  // Transfer Modal State
  const [destination, setDestination] = useState("");
  const [transferVolume, setTransferVolume] = useState("");

  // Adjustment Modal State
  const [adjustmentDestination, setAdjustmentDestination] = useState("");
  const [adjustmentVolume, setAdjustmentVolume] = useState("");
  const [purpose, setPurpose] = useState("");

  const company_id = localStorage.getItem("company_id");
  const username = localStorage.getItem("userName");

  const [multiSyncStatus, setMultiSyncStatus] = useState(null);

  //-----------------GET BRANCHES OBJECT TO POPULATE THE DROP DOWN

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          `${API_URL}/branches/company/${company_id}`
        );
        const branchesData = await response.json();
        console.log("Branches fetched:", branchesData); // Debugging
        setBranches(branchesData);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, [company_id]);

  const handleBranchChange = (event) => {
    const branchId = event.target.value;
    setSelectedBranch(branchId);
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      if (selectedBranch) {
        console.log("Selected branch ID:", selectedBranch); // Debugging
        try {
          const response = await fetch(
            `${API_URL}/inventory/branch/${selectedBranch}`
          );
          const inventoryData = await response.json();
          console.log("Fetched inventory data:", inventoryData); // Debugging
          
          // Store the multi_sync_control_status in state
          if (inventoryData && inventoryData.multi_sync_control_status) {
            setMultiSyncStatus(inventoryData.multi_sync_control_status);
          }

          setAccounts(inventoryData);
        } catch (error) {
          console.error("Error fetching inventory data:", error);
        }

        newlastCloseStockHandler();
      }
    };

    fetchInventoryData();
  }, [selectedBranch]);

  // const handleBranchChange = (e) => {
  //   setSelectedBranch(e.target.value);
  // };

  //###################################################### GET LAST CLOSE STOCK FOR HEADER ######################################################

  const newlastCloseStockHandler = async () => {
    try {
      // Fetch the last closing inventory for the selected branch
      const lastCloseResponse = await fetch(
        `${API_URL}/inventory/lastClose/${selectedBranch}`
      );

      // Check if the response is valid
      if (!lastCloseResponse.ok) {
        throw new Error("Failed to fetch last closing inventory");
      }

      // Get the last closing inventory data
      const lastCloseData = await lastCloseResponse.json();
      const lastClosingValue = lastCloseData.closing_inventory;
      localStorage.setItem("newalastClosingValue", lastClosingValue);
      setNewalastClosingValue(lastClosingValue);

      console.log("tai wana manje ", lastClosingValue);

      // Get branch name
      const branchName = await getBranchNameById(selectedBranch);
      setMyBranchName(branchName);
      console.log("Ndawana ", branchName);
    } catch (error) {
      console.error("Error getting new last closing header", error);
    }
  };

  //###################################################### GET BRANCH SYNC STATUS ######################################################

  const checkSyncStatus = async () => {
    try {

      //////////////////////////////////////////////
            // Fetch the inventory data for the selected branch to check its status
            const branchStatusResponse = await fetch(
              `${API_URL}/branches/branchstatus/${selectedBranch}`
            );

      
            // Check if the response is valid
            if (!branchStatusResponse.ok) {
              throw new Error("Failed to fetch branch inventory data");
            }else{
                     // Get the inventory data
            const branchStatusReceived = await branchStatusResponse.json();
            // console.log("sahwiraaa", branchStatusReceived);
            const branchStatus = branchStatusReceived[0].multi_sync_control_status;
            console.log(branchStatus);

            return branchStatus; // Exit the function if the branch is In Use

          }

//////////////////////////////////////////////////////////////////////////////////

    } catch (error) {
      console.error("Error checking branch status:", error);
      Swal.fire({
        text: "An error occurred while checking the branch status. Please try again.",
        icon: "error",
      });
    }
  };
  

  //###################################################### GET BRANCH NAME BY BRANCH ID ######################################################

  const getBranchNameById = async (selectedBranch) => {
    try {
      const branchNameResponse = await fetch(
        `${API_URL}/branches/branchname/${selectedBranch}`
      );

      if (!branchNameResponse.ok) {
        // Check if the response is valid
        throw new Error("Failed to fetch branch name");
      }
      const branchData = await branchNameResponse.json();
      const myBranchName = branchData[0]?.branch_name;
      //console.log("ndiniNdawana ",myBranchName);
      return myBranchName; // Return the branch name
    } catch (error) {
      console.error("Error getting branch name by id", error);
      return null; // Return null or handle error as needed
    }
  };

  //###################################################### PURCHASE HANDLE ######################################################//

  const handlePurchaseSubmit = async () => {
   let myStatus='';
   myStatus= await checkSyncStatus();
   console.log("iweeeee",myStatus);
                     // // Check if the branch is "In Use"
                     if (myStatus === "In Use") {
                      Swal.fire({
                        text: "You cannot purchase for a branch that is In Use. Please contact the branch team.",
                        icon: "warning",
                      });
                    }else{


    try {


      // Proceed to fetch the last closing inventory for the selected branch
      const lastCloseResponse = await fetch(
        `${API_URL}/inventory/lastClose/${selectedBranch}`
      );

      // Check if the response is valid
      if (!lastCloseResponse.ok) {
        throw new Error("Failed to fetch last closing inventory");
      }

      // Get the last closing inventory data
      const lastCloseData = await lastCloseResponse.json();
      const lastClosingValue = lastCloseData.closing_inventory;

      // Get the current date and time
      const currentDate = new Date();
      const dateRec = currentDate.toISOString().split("T")[0];
      const timeRec = currentDate.toTimeString().split(" ")[0];

      const branchName = await getBranchNameById(selectedBranch);

      // Calculate the new last closing inventory value
      const newLastClosingValue = lastClosingValue + parseFloat(volume || 0);
      console.log("Last Closing Inventory:", lastClosingValue);
      console.log("New Last Closing Inventory:", newLastClosingValue);

      const thecomment = `Primary Inventory Purchases From New Inventory ${parseFloat(
        volume || 0
      )} sent to branch ${branchName} ${dateRec}`;

      // Prepare the inventory data to be posted
      const newInventoryData = {
        lpg_inventory_stock_sheets_id: null,
        date_rec: dateRec,
        time_rec: timeRec,
        branch: branchName,
        branch_id: selectedBranch,
        company_id: localStorage.getItem("company_id"),
        opening_inventory: lastClosingValue,
        added_inventory: parseFloat(volume || 0),
        closing_inventory: newLastClosingValue || 0,
        sold_inventory: 0,
        dispatched_inventory: 0,
        cost_per_unit: parseFloat(costPerUnit || 0),
        comment: thecomment,
        username: localStorage.getItem("userName"),
        confirmed: "",
        sales_shifts_id: "",
        sync_id: null,
      };

      // Send POST request to update inventory
      const postResponse = await fetch(`${API_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInventoryData),
      });

      // Check if the POST request was successful
      if (postResponse.ok) {
        Swal.fire({
          text: "Purchase Successful.",
          icon: "success",
        });

        // Refresh inventory data for the selected branch
        const inventoryRefreshResponse = await fetch(
          `${API_URL}/inventory/branch/${selectedBranch}`
        );
        const updatedInventoryData = await inventoryRefreshResponse.json();
        setAccounts(updatedInventoryData);

        setShowPurchaseModal(false);
      } else {
        Swal.fire({
          text: "Error updating inventory.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error in purchase submission:", error);
      Swal.fire({
        text: "An error occurred. Please try again.",
        icon: "error",
      });
    }

    newlastCloseStockHandler(); // Update current stock header
    }

  };

  //############################################### TRANSFARE HANDLE ###################################//

  const handleTransferSubmit = async () => {
    try {
      // Check the status of both source and destination branches
      const sourceStatus = await checkSyncStatus(selectedBranch);
      const destinationStatus = await checkSyncStatus(destinationBranch);
  
      // If either branch is "In Use", show a warning and return
      if (sourceStatus === "In Use" || destinationStatus === "In Use") {
        Swal.fire({
          text: "You cannot transfer stock if either one of the branches is In Use. Please contact the branch team.",
          icon: "warning",
        });
        return;
      }
  
      // Fetch last closing inventory for source and destination branches
      const sourceCloseResponse = await fetch(
        `${API_URL}/inventory/lastClose/${selectedBranch}`
      );
      const sourceCloseData = await sourceCloseResponse.json();
      const sourceLastClosingValue = sourceCloseData.closing_inventory;
  
      const destinationCloseResponse = await fetch(
        `${API_URL}/inventory/lastClose/${destinationBranch}`
      );
      const destinationCloseData = await destinationCloseResponse.json();
      const destinationLastClosingValue = destinationCloseData.closing_inventory;
  
      const currentDate = new Date();
      const dateRec = currentDate.toISOString().slice(0, 10);
      const timeRec = currentDate.toTimeString().split(" ")[0];
  
      const sourceBranchName = await getBranchNameById(selectedBranch);
      const destinationBranchName = await getBranchNameById(destinationBranch);
  
      setPurpose(purpose);
  
      const thecomment = `Transferred ${transferVolume} KGS ${purpose} From ${sourceBranchName} To ${destinationBranchName} by ${localStorage.getItem("userName")}`;
  
      const sourceInventoryData = {
        lpg_inventory_stock_sheets_id: null,
        date_rec: dateRec,
        time_rec: timeRec,
        branch: sourceBranchName,
        branch_id: selectedBranch,
        company_id: localStorage.getItem("company_id"),
        opening_inventory: sourceLastClosingValue,
        added_inventory: -parseFloat(transferVolume || 0),
        closing_inventory: sourceLastClosingValue - parseFloat(transferVolume || 0),
        sold_inventory: 0,
        dispatched_inventory: 0,
        cost_per_unit: 0,
        comment: thecomment,
        username: localStorage.getItem("userName"),
        confirmed: "",
        sales_shifts_id: "",
        sync_id: null,
      };
  
      const destinationInventoryData = {
        lpg_inventory_stock_sheets_id: null,
        date_rec: dateRec,
        time_rec: timeRec,
        branch: destinationBranchName,
        branch_id: destinationBranch,
        company_id: localStorage.getItem("company_id"),
        opening_inventory: destinationLastClosingValue,
        added_inventory: parseFloat(transferVolume || 0),
        closing_inventory: destinationLastClosingValue + parseFloat(transferVolume || 0),
        sold_inventory: 0,
        dispatched_inventory: 0,
        cost_per_unit: 0,
        comment: `Received ${transferVolume} KGS ${purpose} From ${sourceBranchName} To ${destinationBranchName} by ${localStorage.getItem("userName")}`,
        username: localStorage.getItem("userName"),
        confirmed: "",
        sales_shifts_id: "",
        sync_id: null,
      };
  
      const sourcePostResponse = await fetch(`${API_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sourceInventoryData),
      });
  
      const destinationPostResponse = await fetch(`${API_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationInventoryData),
      });
  
      if (sourcePostResponse.ok && destinationPostResponse.ok) {
        Swal.fire({
          text: "Transfer Successful.",
          icon: "success",
        });
  
        const updatedSourceInventoryData = await fetch(
          `${API_URL}/inventory/branch/${selectedBranch}`
        );
        const updatedDestinationInventoryData = await fetch(
          `${API_URL}/inventory/branch/${destinationBranch}`
        );
  
        setAccounts(await updatedSourceInventoryData.json());
        // Optionally update destination branch inventory state if needed
  
        setShowTransferModal(false);
      } else {
        Swal.fire({
          text: "Error updating inventory.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error in transfer submission:", error);
      setToastMessage("Error in transfer submission.");
      setShowToast(true);
    }
  
    newlastCloseStockHandler(); // Update current stock header
  };

  //############################################### ADJUSTMENT HANDLE ###################################//

  const handleAdjustmentSubmit = async () => {
    try {
      // Check the status of the selected branch
      const branchStatus = await checkSyncStatus(selectedBranch);
  
      // If the branch is "In Use", show a warning and return
      if (branchStatus === "In Use") {
        Swal.fire({
          text: "You cannot adjust inventory for a branch that is In Use. Please contact the branch team.",
          icon: "warning",
        });
        return;
      }
  
      // Fetch the last closing inventory for the selected branch
      const lastCloseResponse = await fetch(
        `${API_URL}/inventory/lastClose/${selectedBranch}`
      );
  
      const lastCloseData = await lastCloseResponse.json();
      const lastClosingValue = lastCloseData.closing_inventory;
  
      const currentDate = new Date();
      const dateRec = currentDate.toISOString().split("T")[0];
      const timeRec = currentDate.toTimeString().split(" ")[0];
  
      const branchName = await getBranchNameById(selectedBranch);
  
      const adjustingVolume = parseFloat(adjustmentVolume || 0);
      const newClosingInventory = lastClosingValue + adjustingVolume;
  
      const thecomment = `Being Inventory Physical Count Variance ${adjustingVolume} KGS At Branch ${branchName} by ${localStorage.getItem("userName")}`;
  
      const newInventoryData = {
        lpg_inventory_stock_sheets_id: null,
        date_rec: dateRec,
        time_rec: timeRec,
        branch: branchName,
        branch_id: selectedBranch,
        company_id: localStorage.getItem("company_id"),
        opening_inventory: lastClosingValue,
        added_inventory: adjustingVolume,
        closing_inventory: newClosingInventory,
        sold_inventory: 0,
        dispatched_inventory: 0,
        cost_per_unit: parseFloat(costPerUnit || 0),
        comment: thecomment,
        username: localStorage.getItem("userName"),
        confirmed: "",
        sales_shifts_id: "",
        sync_id: null,
      };
  
      // Send POST request to update inventory
      const postResponse = await fetch(`${API_URL}/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInventoryData),
      });
  
      if (postResponse.ok) {
        Swal.fire({
          text: "Adjustment Successful.",
          icon: "success",
        });
  
        // Refresh inventory data for the selected branch
        const inventoryRefreshResponse = await fetch(
          `${API_URL}/inventory/branch/${selectedBranch}`
        );
        const updatedInventoryData = await inventoryRefreshResponse.json();
        setAccounts(updatedInventoryData);
  
        // Close the adjustment modal after successful adjustment
        setShowAdjustmentModal(false);
      } else {
        Swal.fire({
          text: "Error updating inventory.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error in adjustment submission:", error);
      setToastMessage("Error in adjustment submission.");
      setShowToast(true);
    }
  
    newlastCloseStockHandler(); // Update current stock header
  };


  //###############################################  MODALS ######################################################

  const openPurchaseModal = () => {
    if (selectedBranch) {
      setShowPurchaseModal(true);
      setToastMessage("");
    } else {
      setToastMessage("Select a branch first.");
      setShowToast(true);
    }
  };

  const openTransferModal = () => {
    if (selectedBranch) {
      setShowTransferModal(true);
      setToastMessage("");
    } else {
      setToastMessage("Select a branch first.");
      setShowToast(true);
    }
  };

  const openAdjustmentModal = () => {
    if (selectedBranch) {
      setShowAdjustmentModal(true);
      setToastMessage("");
    } else {
      setToastMessage("Select a branch first.");
      setShowToast(true);
    }
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div>
      <div className="dashboard-main-wrapper">
        <TopNav />
        <SideBar />
        <div className="dashboard-wrapper">
          <div className="container-fluid dashboard-content">
            <div className="row">
              <div className="col-xl-12">
                <div className="">
                  <h5 class="header" style={{ fontFamily: "sans-serif" }}>
                    Control Panel
                  </h5>
                </div>
              </div>
            </div>

            <div>
              <div className="form-group row align-items-center mb-3">
                <label
                  htmlFor="branchSelect"
                  className="col-sm-2 col-form-label"
                >
                  Select Branch
                </label>
                <div className="col-sm-8">
                  <select
                    id="branchSelect"
                    className="form-control"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                  >
                    <option value="">Select a branch</option>
                    {branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {`${branch.branch_name} (${branch.multi_sync_control_status})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center mb-3">
              <h5>{myBranchName}</h5>
            </div>
            <div className="text-center mb-3">
              <h2>{newalastClosingValue} KG</h2>
            </div>

            <div className="row mb-3">
              <div className="col text-center">
                <div className="d-flex flex-column flex-sm-row justify-content-center">
                  <button
                    className="btn btn-success mx-1 mb-2 mb-sm-0"
                    onClick={openPurchaseModal}
                  >
                    Purchase Product
                  </button>
                  <button
                    className="btn btn-warning mx-1 mb-2 mb-sm-0"
                    onClick={openTransferModal}
                  >
                    Stock Transfer
                  </button>
                  <button
                    className="btn btn-danger mx-1 mb-2 mb-sm-0"
                    onClick={openAdjustmentModal}
                  >
                    Stock Adjustment
                  </button>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Branch</th>
                    <th>Date</th>
                    <th>Opening</th>
                    <th>Adjustment</th>
                    <th>Closing</th>
                    <th>Sold</th>
                    <th>Dispatched</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <tr key={account.lpg_inventory_stock_sheets_id}>
                        <td>{account.branch}</td>
                        <td>{account.date_rec}</td>
                        <td>{account.opening_inventory}</td>
                        <td>{account.added_inventory}</td>
                        <td>{account.closing_inventory}</td>
                        <td>{account.sold_inventory}</td>
                        <td>{account.dispatched_inventory}</td>
                        <td style={{ textAlign: "left" }}>{account.comment}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No inventory data available for this branch.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div
          className="toast show"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1052,
            width: "300px",
            padding: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <div className="toast-body">
            {toastMessage}
            <button
              type="button"
              className="btn-close"
              onClick={closeToast}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", zIndex: 1051 }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Purchase Product</h5>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Volume</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Cost Per Unit
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      value={costPerUnit}
                      onChange={(e) => setCostPerUnit(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowPurchaseModal(false);
                    setShowToast(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePurchaseSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {showTransferModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", zIndex: 1051 }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Stock Transfer</h5>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Source Branch
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                      <option value="">Select Source Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Destination Branch
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      value={destinationBranch}
                      onChange={(e) => setDestinationBranch(e.target.value)}
                    >
                      <option value="">Select Destination Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Volume</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      value={transferVolume}
                      onChange={(e) => setTransferVolume(e.target.value)}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Notes</label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowTransferModal(false);
                    setShowToast(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleTransferSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Adjustment Modal */}
      {showAdjustmentModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", zIndex: 1051 }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Stock Adjustment</h5>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">
                    Adjust Branch
                  </label>
                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                      <option value="">Select Source Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Volume</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      value={adjustmentVolume}
                      onChange={(e) => setAdjustmentVolume(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Purpose</label>
                  <div className="col-sm-8">
                    <textarea
                      className="form-control"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAdjustmentModal(false);
                    setShowToast(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAdjustmentSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
