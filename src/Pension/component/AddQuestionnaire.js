// AddQuestionnaire.js
import React from "react";

const AddQuestionnaire = ({
  questions,
  handleEdit,
  handleDelete,
  expandedQuestionId,
  handleExpand,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedSubject,
  setSelectedSubject,
  subjects,
  selectedResponseType,
  setSelectedResponseType,
  responseTypes,
  status,
  setStatus,
  frequency,
  setFrequency,
  surveyName,
  setSurveyName,
}) => {
  return (
    <div style={{ width: "100%" }}>
      {questions.map((q, index) => (
        <div
          key={q.survey_question_id}
          style={{
            marginBottom: "1rem",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "left",
            position: "relative",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", color: "#5e35b1", margin: 0 }}>
            {index + 1}. {q.question}
            <span
              onClick={() => handleExpand(q.survey_question_id)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "1.5rem",
              }}
            >
              {expandedQuestionId === q.survey_question_id ? "▲" : "▼"}
            </span>
          </h2>
          {expandedQuestionId === q.survey_question_id && (
            <div style={{ marginTop: "10px" }}>
              {/* Dropdowns for Category, Subject, Response Type */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label style={{ fontSize: "1.2rem" }}>Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ fontSize: "1rem", width: "50%" }}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label style={{ fontSize: "1.2rem" }}>Subject:</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    style={{ fontSize: "1rem", width: "50%" }}
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "1.2rem" }}>
                    Response Type:
                  </label>
                  <select
                    value={selectedResponseType}
                    onChange={(e) =>
                      setSelectedResponseType(e.target.value)
                    }
                    style={{ fontSize: "1rem", width: "50%" }}
                  >
                    {responseTypes.map((res) => (
                      <option key={res.id} value={res.name}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Label and Text Area */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label style={{ fontSize: "1.2rem", marginRight: "10px" }}>
                  Question:
                </label>
                <textarea
                  value={q.question}
                  readOnly
                  style={{
                    width: "70%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Status, Frequency, and Survey Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label style={{ fontSize: "1.2rem" }}>Status:</label>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                />
                <span
                  style={{
                    marginLeft: "10px",
                    fontSize: "1rem",
                    color: status ? "blue" : "grey",
                  }}
                >
                  {status ? "ON" : "OFF"}
                </span>
                <div style={{ flex: 1, marginLeft: "20px" }}>
                  <label style={{ fontSize: "1.2rem" }}>Frequency:</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    style={{ fontSize: "1rem", width: "50%" }}
                  >
                    <option value="Once">Once</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <label style={{ fontSize: "1.2rem" }}>
                    Survey Name:
                  </label>
                  <select
                    value={surveyName}
                    onChange={(e) => setSurveyName(e.target.value)}
                    style={{ fontSize: "1rem", width: "50%" }}
                  >
                    <option value="Survey 1">Survey 1</option>
                    <option value="Survey 2">Survey 2</option>
                  </select>
                </div>
              </div>

              {/* Model Answer Ranges */}
              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "1.2rem" }}>Model Answer Range 0-20:</label>
                <input
                  readOnly
                  placeholder=" Quite easy"
                  style={{
                    width: "22%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    marginLeft: "10px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "1.2rem" }}>Model Answer Range 20-40:</label>
                <input
                  readOnly
                  placeholder=" Easy"
                  style={{
                    width: "22%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    marginLeft: "10px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "1.2rem" }}>Model Answer Range 40-60:</label>
                <input
                  readOnly
                  placeholder=" Moderate"
                  style={{
                    width: "22%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    marginLeft: "10px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "1.2rem" }}>Model Answer Range 60-80:</label>
                <input
                  readOnly
                  placeholder=" Quite complex"
                  style={{
                    width: "22%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    marginLeft: "10px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label style={{ fontSize: "1.2rem" }}>Model Answer Range 80-100:</label>
                <input
                  readOnly
                  placeholder=" Very complex"
                  style={{
                    width: "22%",
                    height: "30px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    marginLeft: "10px",
                  }}
                />
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => handleEdit(q)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                marginRight: "0.5rem",
                fontSize: "20px",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(q.survey_question_id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              Delete
            </button>

            <button
              onClick={() => handleEdit(q)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "0.25rem",
                cursor: "pointer",
                marginLeft: "0.5rem",
                fontSize: "20px",
              }}
            >
              Add Qstn
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddQuestionnaire;