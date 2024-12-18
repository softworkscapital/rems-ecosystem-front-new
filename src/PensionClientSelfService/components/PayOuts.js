import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "../config";
const PayOutsTable = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  const fetchContributions = () => {
    const userId = localStorage.getItem("user");
    fetch(`${API_URL}/pay_outs/getting_by_member_id/${userId}`)
      .then((res) => res.json())
      .then((resp) => {
        setIsLoading(false);
        if (resp.length > 0) {
          setPaymentData(resp); // Update state with fetched data
        } else {
          Swal.fire({
            text: "Account has No Transactions!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        Swal.fire({
          text: "System Boot Failed, Please check your network connection!",
          icon: "error",
        });
      });
  };

  useEffect(() => {
    fetchContributions(); // Fetch contributions when the component mounts
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Payment Overview</h6>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Transaction Reference</th>
              <th>Date Time</th>
              <th>Description</th>
              <th>Folio</th>
              <th>Amount (USD)</th>
              <th>Balance</th>
              <th>Contribution Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((item) => (
              <tr key={item.ref}>
                {" "}
                {/* Use a unique identifier */}
                <td>{item.ref}</td>
                <td>
                  {item.daterec}
                  <br></br>
                  {item.timerec}
                  <br></br> for {item.datefor}
                </td>
                <td>
                  <div>{item.description}</div>
                  <small>
                    {" "}
                    <div className="text-gray-600">
                      Paid {item.amntrec}.{item.currency}@ rate 1:rate = USD
                      value{" "}
                    </div>
                    <div className="text-gray-600">
                      company contribution: {item.member_contribution_amount}.
                      {item.currency}
                      <br></br>
                    </div>
                    <div className="text-gray-600">
                      member contribution:{item.company_contribution_amount}.
                      {item.currency}
                    </div>{" "}
                  </small>
                </td>
                <td>{item.folio || "N/A"}</td>{" "}
                {/* Display folio or a default value */}
                <td>{item.amntrec.toLocaleString()} USD</td>{" "}
                {/* Format number */}
                <td>{item.balance ? item.balance.toLocaleString() : "N/A"}</td>
                <td>{item.balance ? item.balance.toLocaleString() : "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 0 ? "bg-success" : "bg-danger"
                    }`}
                    style={{ borderRadius: "12px", padding: "5px 10px" }}
                  >
                    {item.balance ? item.feesdue.toLocaleString() : "N/A"}
                  </span>
                </td>
                {/* Display balance */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayOutsTable;
