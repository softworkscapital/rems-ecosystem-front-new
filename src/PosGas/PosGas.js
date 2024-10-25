import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import TopNav from "../TopNav";
import Footer from "../Footer";
import { API_URL } from "../config";

const PosGas = () => {
  const [awareness, setAwareness] = useState(0);
  const [interest, setInterest] = useState(0);
  const [decision, setDecision] = useState(0);
  const [action, setAction] = useState(0);
  const [staticAcc, setStaticAcc] = useState([]);
  const [adminExpBal, setAdminExpBal] = useState(0);
  const [directExpBal, setDirectExpBal] = useState(0);
  const [incomeBal, setIncomeBal] = useState(0);
  const [branches, setBranches] = useState([]); // online branches data
  const [branchesOnline, setBranchesOnline] = useState([]); // online branches
  const [companyId, setCompanyId] = useState();
  const [branchIds, setBranchIds] = useState([]); // handle multiple branch IDs
  const [branchNames, setBranchNames] = useState({}); // Store branch names

  // Set companyId only once on mount
  useEffect(() => {
    const companyIdFromLocalStorage = localStorage.getItem("company_id");
    setCompanyId(companyIdFromLocalStorage);
  }, []);

  // Fetch online branches
  useEffect(() => {
    if (companyId) {
      fetch(`${API_URL}/payments/branchesonline/company/${companyId}`)
        .then((res) => res.json())
        .then((resp) => {
          setBranchesOnline(resp);
          const ids = resp.map((branch) => branch.branch_id); // Change 'id' to 'branch_id'
          setBranchIds(ids);
        })
        .catch((err) =>
          console.log("Error getting online branches:", err.message)
        );
    }
  }, [companyId]);

  // Fetch data for each online branch and branch names
  useEffect(() => {
    const fetchBranchesData = async () => {
      if (branchIds.length > 0 && companyId) {
        try {
          console.log("branchidd", branchIds);
          const responses = await Promise.all(
            branchIds.map((branchId) =>
              fetch(`${API_URL}/payments/branch/${branchId}/${companyId}`).then(
                (res) => res.json()
              )
            )
          );

          const allBranchesData = responses.flat(); // Flatten the array if necessary
          setBranches(allBranchesData);
          console.log("all branches", allBranchesData);
          console.log("companyid", companyId);

          // Fetch branch names for each branch ID
          const names = {};
          for (const id of branchIds) {
            const name = await getBranchNameById(id);
            if (name) {
              names[id] = name; // Store branch name by branch ID
            }
          }
          setBranchNames(names); // Update state with branch names
        } catch (error) {
          console.error("Error fetching branches data:", error);
        }
      }
    };

    fetchBranchesData();
  }, [branchIds, companyId]);

  const getBranchNameById = async (n) => {
    try {
      const branchNameResponse = await fetch(
        `${API_URL}/branches/branchname/${n}`
      );

      if (!branchNameResponse.ok) {
        throw new Error("Failed to fetch branch name");
      }

      const branchData = await branchNameResponse.json();
      return branchData[0]?.branch_name || null; // Return branch name or null
    } catch (error) {
      console.error("Error getting branch name by id", error);
      return null;
    }
  };

  return (
    //     <div>
    //       <TopNav />
    //       <SideBar />
    //       <div>
    //         <h2>Branches</h2>
    //         {branches.map(branch => (
    //           <div key={branch.branch_id}>
    //             <h3>Branch ID: {branch.branch_id}</h3>
    //             <h4>Branch Name: {branchNames[branch.branch_id] || "Loading..."}</h4>
    //             {/* Other details about the branch */}
    //           </div>
    //         ))}
    //       </div>
    //       <Footer />
    //     </div>
    //   );
    // };

    // export default PosGas;

    //###########################################################################3

    // const getBranchNameById = async (n) => {
    //   try {
    //     const branchNameResponse = await fetch(
    //       `${API_URL}/branches/branchname/${n}`
    //     );

    //     if (!branchNameResponse.ok) {
    //       throw new Error("Failed to fetch branch name");
    //     }

    //     const branchData = await branchNameResponse.json();
    //     const myBranchName = branchData[0]?.branch_name;
    //     return myBranchName;
    //   } catch (error) {
    //     console.error("Error getting branch name by id", error);
    //     return null;
    //   }
    // };

    // useEffect(() => {
    //   const getLastClosingStock = () => {
    //     fetch(`${API_URL}/salesshiftgas/${branchId}`)
    //       .then((res) => res.json())
    //       .then((resp) => {
    //         setClosingStock(resp[0].closing_inventory);
    //       })
    //       .catch((err) => console.log(err.message));
    //   };

    //   getLastClosingStock();
    // }, []);

    // return (
    <div>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Concept - Bootstrap 4 Admin Dashboard Template</title>
          <link
            rel="stylesheet"
            href="../assets/vendor/bootstrap/css/bootstrap.min.css"
          />
          <link
            href="../assets/vendor/fonts/circular-std/style.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="../assets/libs/css/style.css" />
          <link
            rel="stylesheet"
            href="../assets/vendor/fonts/fontawesome/css/fontawesome-all.css"
          />
        </head>

        <body>
          <div class="dashboard-main-wrapper">
            <TopNav></TopNav>
            <SideBar></SideBar>

            <div class="dashboard-wrapper">
              <div class="container-fluid dashboard-content" style={{}}>
                <div
                  class="row"
                  style={{ marginLeft: "1%", textAlign: "center" }}
                >
                  <h5 class="header" style={{ fontFamily: "sans-serif" }}>
                    Remote View{" "}
                  </h5>

                  {branches.map((option) => (
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                      <div key={option.branch_id}>
                        <div class="card">
                          <div class="card-body">
                            <h3
                              class="text-muted"
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "bold",
                              }}
                            >
                              <h4>
                                {branchNames[option.branch_id] || "Loading..."}
                                {option.branch_id}
                              </h4>
                            </h3>
                            <div
                              className="metric-value d-inline-block text-end"
                              style={{ fontFamily: "sans-serif" }}
                            >
                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "left",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    Sales (USD):{" "}
                                  </h2>
                                </div>
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    {option.amnt} {"USD"}
                                  </h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "left",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    Operator Name:{" "}
                                  </h2>
                                </div>
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    {option.username}{" "}
                                  </h2>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "left",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    Sold Stock:{" "}
                                  </h2>
                                </div>
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    {option.quantity} {"KG"}
                                  </h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "left",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    Current Stock Level:{" "}
                                  </h2>
                                </div>
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    {/* {closingStock - option.quantity} {"KG"}{" "} */}
                                    {"TBA"}
                                  </h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      textAlign: "left",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    Reoder Level:{" "}
                                  </h2>
                                </div>
                                <div className="col-xl-6 col-md-6 col-6">
                                  <h2
                                    className="mb-1"
                                    style={{
                                      fontSize: "15px",
                                      fontFamily: "sans-serif",
                                    }}
                                  >
                                    {/* {closingStock} {"KG"}{" "} */}
                                    {"TBA"}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="sparkline-revenue"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ width: "100%", float: "right" }}>
              <Footer></Footer>
            </div>
          </div>
          <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
          <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
          <script src="../assets/vendor/slimscroll/jquery.slimscroll.js"></script>
          <script src="../assets/libs/js/main-js.js"></script>
        </body>
      </html>
    </div>
  );
};

export default PosGas;
