import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import { API_URL } from "./component/config";

const SurveyQuestions = () => {
  const [questions, setQuestions] = useState([]); // Placeholder for questions
  const [newQuestion, setNewQuestion] = useState(""); // Input for new question
  const [expandedQuestionId, setExpandedQuestionId] = useState(null); // For expanding questions
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [branchId, setBranchId] = useState(null);

  useEffect(() => {
    // Load questions from API
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_URL}/surveyquestions/`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }
        const data = await response.json();
        setQuestions(data); // Assuming the API returns an array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("There was a problem fetching the questions.");
      }
    };

    fetchQuestions();

    // Load company and branch IDs from localStorage
    const storedCompanyId = localStorage.getItem("company_id");
    const storedBranchId = localStorage.getItem("branch_id");

    setCompanyId(storedCompanyId);
    setBranchId(storedBranchId);
  }, []);




  const handleExpand = (id) => {
    setExpandedQuestionId((prevId) => (prevId === id ? null : id)); // Toggle expand/collapse
  };

  const handleDelete = async (survey_question_id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setLoading(true);
      try {
        console.log("Deleting question with ID:", survey_question_id); // Debugging log
        const response = await fetch(`${API_URL}/surveyquestions/${survey_question_id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the question.");
        }

        // Update the questions state
        const updatedQuestions = questions.filter((q) => q.survey_question_id !== survey_question_id);
        setQuestions(updatedQuestions);
        toast.success("Question deleted!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("There was a problem deleting your question.");
      } finally {
        setLoading(false);
      }
    }
  };


  const handleSave = async (survey_question_id) => {
    const questionToUpdate = questions.find(q => q.survey_question_id === survey_question_id);
    
    if (!questionToUpdate) {
      toast.error("Question not found.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/surveyquestions/${survey_question_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionToUpdate),
      });

      if (!response.ok) {
        throw new Error("Failed to update the question.");
      }

      const result = await response.json();
      console.log("API Response for update:", result);
      toast.success("Question updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was a problem updating your question.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="d-flex flex-column" style={{ height: "100vh", backgroundColor: "light grey", overflowY: "scroll" }}>
      <ToastContainer />
      <div style={{ width: "250px" }}>
        <SideBar />
      </div>
      <div className="flex-fill">
        <TopNav />
        <div className="container mt-4 d-flex flex-column align-items-start" style={{ padding: "2rem", position: "relative", marginRight: "20px" }}>
          <h1 style={{ fontSize: "3rem", color: "#5e35b1", fontStyle: "italic", fontWeight: "bold", textAlign: "center", marginBottom: "20px", marginTop:'20px' }}>
            QUESTIONNAIRE
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "20px", textAlign: "center", fontWeight: "bold", marginLeft: "-70px" }}>
            Below are you can write the questions you would like to ask the organisation, CLICK the add question button to add the first question, 
            when you are done click the submit button to save you questions, you can also delete and edit your question.
          </p>

          <div style={{ width: "100%", marginLeft: "-70px", backgroundColor: "white" }}>
            {questions.map((q, index) => (
              <div key={q.survey_question_id} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", textAlign: "left", position: "relative" }}>
                <h2 style={{ fontSize: "1.5rem", color: "#5e35b1", margin: 0 }}>
                  {index + 1}. {q.question || "New Question"}
                  <span
                    onClick={() => handleExpand(q.survey_question_id)}
                    style={{ cursor: "pointer", position: "absolute", right: "10px", top: "10px", fontSize: "1.5rem" }}
                  >
                    {expandedQuestionId === q.survey_question_id ? "▲" : "▼"}
                  </span>
                </h2>
                {expandedQuestionId === q.survey_question_id && (
                  <div style={{ marginTop: "10px" }}>
                    {/* Dropdowns for Category, Subject, Response Type */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ flex: 1, marginRight: "10px" }}>
                        <label style={{ fontSize: "1.2rem" }}>Category:</label>
                        <select
                          value={q.category}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].category = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Category</option>
                          <option value="Category 1">Category 1</option>
                          <option value="Category 2">Category 2</option>
                        </select>
                      </div>
                      <div style={{ flex: 1, marginRight: "10px" }}>
                        <label style={{ fontSize: "1.2rem" }}>Subject:</label>
                        <select
                          value={q.subject}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].subject = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Subject</option>
                          <option value="Subject 1">Subject 1</option>
                          <option value="Subject 2">Subject 2</option>
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: "1.2rem" }}>Response Type:</label>
                        <select
                          value={q.response_type}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].response_type = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Response Type</option>
                          <option value="Type 1">Type 1</option>
                          <option value="Type 2">Type 2</option>
                        </select>
                      </div>
                    </div>

                    {/* Question Label and Text Area */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem", marginRight: "10px" }}>Question:</label>
                      <textarea
                        value={q.question}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].question = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        style={{ width: "70%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem" }}
                      />
                    </div>

                    {/* Status, Frequency, and Survey Name */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Status:</label>
                      <input
                        type="checkbox"
                        checked={q.status}
                        onChange={() => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].status = !updatedQuestions[index].status;
                          setQuestions(updatedQuestions);
                        }}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                      <span style={{ marginLeft: "10px", fontSize: "1rem", color: q.status ? "blue" : "grey" }}>
                        {q.status ? "ON" : "OFF"}
                      </span>
                      <div style={{ flex: 1, marginLeft: "20px" }}>
                        <label style={{ fontSize: "1.2rem" }}>Frequency:</label>
                        <select
                          value={q.frequency}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].frequency = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Frequency</option>
                          <option value="Once">Once</option>
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>
                      <div style={{ flex: 1, marginLeft: "10px" }}>
                        <label style={{ fontSize: "1.2rem" }}>Survey Name:</label>
                        <select
                          value={q.survey_name}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].survey_name = e.target.value;
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Survey</option>
                          <option value="Survey 1">Survey 1</option>
                          <option value="Survey 2">Survey 2</option>
                        </select>
                      </div>
                    </div>

                    {/* Model Answer Ranges */}
                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Model Answer Range 0-20:</label>
                      <input
                        value={q.answer_range_0_20}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer_range_0_20 = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        placeholder=" "
                        style={{ width: "22%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", marginLeft: "10px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Model Answer Range 20-40:</label>
                      <input
                        value={q.answer_range_21_40}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer_range_21_40 = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        placeholder=" "
                        style={{ width: "22%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", marginLeft: "10px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Model Answer Range 40-60:</label>
                      <input
                        value={q.answer_range_41_60}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer_range_41_60 = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        placeholder=" "
                        style={{ width: "22%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", marginLeft: "10px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Model Answer Range 60-80:</label>
                      <input
                        value={q.answer_range_61_80}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer_range_61_80 = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        placeholder=" "
                        style={{ width: "22%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", marginLeft: "10px" }}
                      />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "1.2rem" }}>Model Answer Range 80-100:</label>
                      <input
                        value={q.answer_range_81_100}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].answer_range_81_100 = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                        placeholder=" "
                        style={{ width: "22%", height: "30px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "1rem", marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
                  <button
                    onClick={() => handleSave(q.survey_question_id)}
                    style={{ backgroundColor: "green", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "20px" }}
                  >
                     {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => handleDelete(q.survey_question_id)}
                    style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1rem", marginLeft: '20px',border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "20px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

        
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SurveyQuestions;