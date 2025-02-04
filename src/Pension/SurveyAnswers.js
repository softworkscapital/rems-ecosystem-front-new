import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import { API_URL } from "./component/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [starRatings, setStarRatings] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [surveyNames, setSurveyNames] = useState([]);
  const [selectedSurveyId, setSelectedSurveyId] = useState(null);
  const [isSurveySelected, setIsSurveySelected] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCompanyId = await AsyncStorage.getItem("selectedCompanyId");
        const storedBranchId = await AsyncStorage.getItem("selectedBranchId");

        setCompanyId(storedCompanyId);
        setBranchId(storedBranchId);
        fetchSurveyNames();
      } catch (error) {
        console.error("Error fetching IDs from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []);

  const fetchSurveyNames = async () => {
    try {
      const response = await fetch(`${API_URL}/surveys`);
      if (!response.ok) {
        throw new Error("Failed to fetch survey names");
      }
      const data = await response.json();
      setSurveyNames(data);
    } catch (error) {
      console.error("Error fetching survey names:", error);
    }
  };

  const fetchQuestions = async (surveyId) => {
    try {
      const url = `${API_URL}/surveyquestions/survey_id/company_id/branch_id/${surveyId}/${companyId}/${branchId}`;
      
      const response = await fetch(url);
      const data = await response.json();
      const filteredQuestions = data.map((q) => ({
        survey_question_id: q.survey_question_id,
        question: q.question,
        survey_id: q.survey_id,
        company_id: q.company_id,
        branch_id: q.branch_id,
        isTextInput: q.response_type === "text",
      }));

      await AsyncStorage.setItem(
        "survey_question_id",
        JSON.stringify(filteredQuestions.map((q) => q.survey_question_id))
      );

      setQuestions(filteredQuestions);
      setStarRatings(Array(filteredQuestions.length).fill(0));
      setSuggestions(Array(filteredQuestions.length).fill(null));
      setCurrentQuestionIndex(0);
      setIsSurveySelected(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleStarSelect = (stars) => {
    const updatedRatings = [...starRatings];
    updatedRatings[currentQuestionIndex] = stars;
    setStarRatings(updatedRatings);
    setSelectedStars(stars);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const updatedSuggestions = [...suggestions];
      updatedSuggestions[currentQuestionIndex] = suggestion || null;
      setSuggestions(updatedSuggestions);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedStars(starRatings[currentQuestionIndex + 1] || 0);
      setSuggestion(updatedSuggestions[currentQuestionIndex + 1] || "");
      setShowSuggestionBox(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedStars(starRatings[currentQuestionIndex - 1] || 0);
      setSuggestion(suggestions[currentQuestionIndex - 1] || "");
      setShowSuggestionBox(false);
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const records = questions.map((question, index) => ({
      survey_question_id: question.survey_question_id,
      answer_scaled: starRatings[index] || 0,
      answer_scale: 5,
      answer_text: suggestions[index] || null,
      date_from: formatDate(new Date()),
      date_to: formatDate(new Date()),
      company_id: companyId,
      branch_id: branchId,
      survey_id: question.survey_id,
    }));

    try {
      for (const record of records) {
        const response = await fetch(`${API_URL}/survey_answers/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        });

        if (!response.ok) {
          throw new Error("Network error, check your internet connection");
        }
      }

      toast.success("All responses submitted successfully!");
      setSuggestion("");

      if (currentQuestionIndex < questions.length - 1) {
        handleNext();
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Network error, check your internet connection");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuggestionChange = (e) => {
    const updatedSuggestion = e.target.value;
    setSuggestion(updatedSuggestion);

    const updatedSuggestions = [...suggestions];
    updatedSuggestions[currentQuestionIndex] = updatedSuggestion || null;
    setSuggestions(updatedSuggestions);
  };

  const handleSurveySelect = (e) => {
    setSelectedSurveyId(e.target.value);
  };

  const handleGoClick = () => {
    if (selectedSurveyId) {
      fetchQuestions(selectedSurveyId);
    } else {
      toast.error("Please select a survey.");
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ height: "100vh", backgroundColor: "light grey" }}
    >
      <ToastContainer />
      <div style={{ width: "250px" }}>
        <SideBar />
      </div>
      <div className="flex-fill">
        <TopNav />
        <div
          className="container mt-4 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100%", padding: "2rem", paddingTop: "50px" }}
        >
          {!isSurveySelected ? (
            <>
              <h1
                style={{
                  color: "#5e35b1",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginBottom: "400px",
                  marginTop: "150px",
                }}
              >
                Select Survey Name
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label
                  htmlFor="surveySelect"
                  style={{
                    marginRight: "10px",
                    fontSize: "20px",
                    marginTop: "-700px",
                  }}
                >
                  Survey Name:
                </label>
                <select
                  id="surveySelect"
                  onChange={handleSurveySelect}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    flex: 1,
                    marginTop: "-700px",
                  }}
                >
                  <option value="">Select a survey</option>
                  {surveyNames.map((survey) => (
                    <option key={survey.survey_id} value={survey.survey_id}>
                      {survey.survey_name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleGoClick}
                  style={{
                    margin: "20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "1rem 1rem",
                    paddingTop: "5px",
                    paddingBottom: "10px",
                    border: "none",
                    borderRadius: "20px",
                    fontSize: "20px",
                    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.2)",
                    marginLeft: "10px",
                    marginTop: "-680px",
                  }}
                >
                  GO
                </button>
              </div>
            </>
          ) : (
            <>
              <h1
                style={{
                  fontSize: "2.5rem",
                  color: "#4a148c",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Employee Feedback Questionnaire
              </h1>

              <h2
                style={{
                  color: "black",
                  textAlign: "center",
                  marginBottom: "20px",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                `http://localhost:3000/SurveyAnswers?survey_id=${selectedSurveyId}&company_id=${companyId}&branch_id=${branchId}`
              </h2>

              {questions.length > 0 &&
              currentQuestionIndex < questions.length ? (
                <>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "20px",
                      marginLeft: "50px",
                    }}
                  >
                    Click the number of stars you want to give for the question.
                    If you need to provide more information, click the "Add
                    Suggestion" button to add your feedback. Use the "Next"
                    button to move to the next question, and the "Previous"
                    button to go back to the previous question. You can edit
                    your responses at any time.
                  </p>

                  <div
                    className="question-section"
                    style={{ textAlign: "center", marginBottom: "2rem" }}
                  >
                    <h2
                      style={{
                        fontSize: "1.8rem",
                        color: "#6a1b9a",
                        fontWeight: "bold",
                      }}
                    >
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p style={{ fontSize: "1.2rem", color: "#555" }}>
                      {questions[currentQuestionIndex].question}
                    </p>
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                      {starRatings[currentQuestionIndex] > 0 ? (
                        <span style={{ color: "gold" }}>
                          {Array(starRatings[currentQuestionIndex])
                            .fill("★")
                            .join("")}
                          {Array(5 - starRatings[currentQuestionIndex])
                            .fill("☆")
                            .join("")}
                        </span>
                      ) : (
                        <span style={{ color: "grey" }}>0</span>
                      )}
                    </div>
                    {suggestions[currentQuestionIndex] !== null && (
                      <p style={{ fontSize: "1rem", color: "#555" }}>
                        Suggestion:{" "}
                        {suggestions[currentQuestionIndex] || "No suggestion"}
                      </p>
                    )}
                  </div>

                  <button
                    style={{
                      backgroundColor: "#4caf50",
                      color: "white",
                      padding: "0.5rem 1rem",
                      border: "none",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      fontSize: "1rem",
                      marginBottom: "1rem",
                    }}
                    onClick={() => setShowSuggestionBox(!showSuggestionBox)}
                  >
                    {showSuggestionBox
                      ? "Hide Suggestion Box"
                      : "Add Suggestion"}
                  </button>

                  {showSuggestionBox && (
                    <textarea
                      style={{
                        width: "100%",
                        height: "100px",
                        padding: "10px",
                        borderRadius: "0.25rem",
                        border: "1px solid #ccc",
                        marginBottom: "1rem",
                        marginLeft: "200px",
                        fontSize: "1rem",
                        resize: "none",
                        transition: "border-color 0.3s",
                      }}
                      placeholder="Add your suggestion here..."
                      value={suggestion}
                      onChange={handleSuggestionChange}
                    />
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "2rem",
                      cursor: "pointer",
                      marginBottom: "1rem",
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        style={{
                          color: selectedStars > index ? "gold" : "grey",
                          transition:
                            "color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease",
                          margin: "0 0.2rem",
                          transform:
                            selectedStars > index ? "scale(1.1)" : "scale(1)",
                          boxShadow:
                            selectedStars > index
                              ? "0 0 10px rgba(255, 215, 0, 0.8)"
                              : "none",
                        }}
                        onClick={() => handleStarSelect(index + 1)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {currentQuestionIndex > 0 && (
                      <button
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "0.5rem 1rem",
                          border: "none",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                      >
                        Previous
                      </button>
                    )}

                    {currentQuestionIndex < questions.length - 1 && (
                      <button
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "0.5rem 1rem",
                          border: "none",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontSize: "1rem",
                        }}
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    )}
                  </div>

                  {currentQuestionIndex === questions.length - 1 && (
                    <button
                      style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Questionnaire"}
                    </button>
                  )}
                </>
              ) : (
                <p>No questions available.</p>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SurveyAnswers;
