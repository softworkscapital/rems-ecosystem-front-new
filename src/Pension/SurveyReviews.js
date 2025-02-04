import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import ReviewCard from "./component/ReviewCard"; // Import the ReviewCard component
import { API_URL } from "./component/config";
import Swal from 'sweetalert2'; // Import Swal for alerts

const SurveyReviews = () => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [surveyNames, setSurveyNames] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState("");
  const [reviewData, setReviewData] = useState(null);
  const [showReviewCard, setShowReviewCard] = useState(false);

  useEffect(() => {
    const fetchSurveyNames = async () => {
      try {
        const response = await fetch(`${API_URL}/surveys`);
        if (!response.ok) {
          throw new Error("Failed to fetch survey names");
        }
        const data = await response.json();
        
        console.log("Fetched Survey Names and IDs:", data);
        setSurveyNames(data);
      } catch (error) {
        console.error("Error fetching survey names:", error);
      }
    };

    fetchSurveyNames();
  }, []);

  const fetchSurveyReviews = async () => {
    try {
      if (!selectedSurvey) {
        throw new Error("Survey ID must be provided");
      }
      if (!dateFrom || !dateTo) {
        throw new Error("Date From and Date To must be provided");
      }

      const url = `${API_URL}/survey_answers/summary/${selectedSurvey}/${dateFrom}/${dateTo}`;
      const response = await fetch(url, {
        method: "GET", // Use GET method
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch survey reviews: ${await response.text()}`);
      }

      const result = await response.json();
      console.log("Fetched survey reviews:", result);
      setReviewData(result);
      setShowReviewCard(true);
      
    } catch (error) {
      console.error("Error fetching survey reviews:", error);
      Swal.fire({ title: 'Error', text: error.message, icon: 'error', confirmButtonText: 'OK' });
    }
  };

  const handleViewReviews = async () => {
    console.log("Before fetching reviews:", { selectedSurvey, dateFrom, dateTo });
    setLoading(true);
    await fetchSurveyReviews();
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", backgroundColor: "light grey", overflowY: "scroll" }}>
      <ToastContainer />
      <div style={{ width: "250px" }}>
        <SideBar />
      </div>
      <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
        <TopNav />
        
        {!showReviewCard && (
          <>
            <h1 style={{
              color: "#5e35b1",
              textTransform: "uppercase",
              marginBottom: "20px",
              marginTop: '-10px',
            }}>
              Review Survey
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', width: '300px' }}>
              <label htmlFor="surveyName" style={{ marginRight: '10px', fontSize: '20px' }}>Survey Name</label>
              <select
                id="surveyName"
                value={selectedSurvey}
                onChange={(e) => setSelectedSurvey(e.target.value)}
                style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flex: 1 }}
              >
                <option value="">Select a survey</option>
                {surveyNames.map((survey) => (
                  <option key={survey.survey_id} value={survey.survey_id}>{survey.survey_name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', width: '300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <label htmlFor="dateFrom" style={{ marginRight: '10px', fontSize: '20px' }}>Date From</label>
                <input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor="dateTo" style={{ marginRight: '30px', fontSize: '20px' }}>Date To</label>
                <input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>
            </div>

            <button
              onClick={handleViewReviews}
              disabled={loading}
              style={{
                margin: "20px",
                backgroundColor: "#007bff",
                color: "white",
                padding: "1rem 1rem",
                paddingTop: "10px",
                paddingBottom: "10px",
                
                border: "none",
                borderRadius: "20px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "20px",
                boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
              }}
            >
              {loading ? 'Loading...' : 'View Reviews'}
            </button>
          </>
        )}

        {showReviewCard && reviewData && (
          <ReviewCard survey={reviewData.survey} results={reviewData.answers} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default SurveyReviews;