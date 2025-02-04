import React from "react";

const ReviewCard = ({ survey, results }) => {
  // Check if survey is defined and has at least one item
  if (!survey || !survey.length || !results) return null;

  const currentSurvey = survey[0]; // Access the first survey
  console.log("Survey:", currentSurvey);
  console.log("Results:", results);

  return (
    <div style={{ padding: "20px", backgroundColor: "light grey" }}>
      <h1
        style={{
          color: "#5e35b1",
          fontSize: "30px",
          marginTop: "80px",
          marginRight: "10px",
        }}
      >
        Survey Name: {currentSurvey.survey_name}
      </h1>
      <p style={{ fontSize: "18px", marginTop: "10px", marginBottom: "50px" }}>
        <strong>Description:</strong> {currentSurvey.survey_description}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {results.map((result) => (
          <div
            key={result.survey_question_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              marginLeft: "50px",
              width: "1000px",
            }}
          >
            <p
              style={{
                color: "#333",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <span style={{ flex: "1", textAlign: "center" }}>
                Question ID:
              </span>
              <span
                style={{ flex: "1", textAlign: "center", marginRight: "20px" }}
              >
                {result.survey_question_id}
              </span>
            </p>
            <p
              style={{
                color: "#333",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <span
                style={{ flex: "1", textAlign: "center", marginLeft: "70px" }}
              >
                Highest Preferred Frequency:
              </span>
              <span
                style={{ flex: "1", textAlign: "center", marginRight: "20px" }}
              >
                {result.Highest_Preferred_Frequency || "N/A"}
              </span>
            </p>
            <hr />
            <h3>Frequencies:</h3>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {Object.entries(result.Frequencies).map(([key, value]) => (
                <li style={{ color: "#333", fontSize: "16px" }} key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>

            <p
              style={{
                color: "#333",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <span
                style={{ flex: "1", textAlign: "center", marginRight: "20px" }}
              >
                Total Participants:
              </span>
              <span style={{ flex: "1", textAlign: "center" }}>
                {result.Total_Participants || "N/A"}
              </span>
            </p>

            <p
              style={{
                color: "#333",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <span
                style={{ flex: "1", textAlign: "center", marginLeft: "35px" }}
              >
                Preferred Answer Range:
              </span>
              <span
                style={{ flex: "1", textAlign: "center", marginRight: "20px" }}
              >
                {result.Preferred_Answer_Range || "N/A"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
