import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import SideBar from "./component/SideBar";
import TopNav from "./component/TopNav";
import Footer from "./component/Footer";
import { API_URL } from "./component/config";
import { useLocation } from 'react-router-dom';

const CreateQuestionnaire = () => {
  const location = useLocation();
  const { companyId, branchId } = location.state || {}; // Get companyId and branchId from location state

  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [surveyIdMap, setSurveyIdMap] = useState({});

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }

    // Fetch surveys on component mount
    const fetchSurveys = async () => {
      try {
        const response = await fetch(`${API_URL}/surveys`);
        if (!response.ok) {
          throw new Error("Failed to fetch surveys.");
        }
        const surveyData = await response.json();
        setSurveys(surveyData);
        
        const surveyMap = {};
        surveyData.forEach(survey => {
          surveyMap[survey.survey_name] = survey.survey_id;
        });
        setSurveyIdMap(surveyMap);
      } catch (error) {
        console.error("Error fetching surveys:", error);
        toast.error("There was a problem fetching surveys.");
      }
    };

    fetchSurveys();
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = () => {
    const nextId = questions.length + 1;
    const newQuestionObj = {
      survey_question_id: nextId,
      question: newQuestion,
      category: "",
      subject: "",
      response_type: "",
      status: false,
      frequency: "",
      survey_name: "",
      survey_id: null,
      answer_range_0_20: "",
      answer_range_21_40: "",
      answer_range_41_60: "",
      answer_range_61_80: "",
      answer_range_81_100: "",
    };

    setQuestions([...questions, newQuestionObj]);
    setNewQuestion("");
  };

  const handleExpand = (id) => {
    setExpandedQuestionId(prevId => (prevId === id ? null : id));
  };

  const handleDelete = async (survey_question_id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/surveyquestions/${survey_question_id}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete the question.");
        }
  
        const updatedQuestions = questions.filter(q => q.survey_question_id !== survey_question_id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const records = questions.map((q) => ({
      category: q.category || "Default Category",
      subject: q.subject || "Default Subject",
      question: q.question,
      response_type: q.response_type || "Default Response Type",
      status: q.status ? "ON" : "OFF",
      frequency: q.frequency || "Once",
      survey_id: surveyIdMap[q.survey_name] || null,
      company_id: companyId, // Use companyId from props
      branch_id: branchId,   // Use branchId from props
      answer_range_0_20: q.answer_range_0_20 || "Quite easy",
      answer_range_21_40: q.answer_range_21_40 || "Easy",
      answer_range_41_60: q.answer_range_41_60 || "Moderate",
      answer_range_61_80: q.answer_range_61_80 || "Quite complex",
      answer_range_81_100: q.answer_range_81_100 || "Very complex",
    }));

    try {
      for (const record of records) {
        const response = await fetch(`${API_URL}/surveyquestions`, {
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

      toast.success("All questions successfully sent! Visit the Evaluate Questions page to view your questionnaire.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was a problem submitting your details.");
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
          <h1 style={{ fontSize: "3rem", color: "#5e35b1", fontStyle: "italic", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
            QUESTIONNAIRE
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "20px", textAlign: "center", fontWeight: "bold", marginLeft: "-70px" }}>
            Below you can write the questions you would like to ask the organisation. CLICK the add question button to add the first question, 
            when you are done click the submit button to save your questions, you can also delete and edit your questions.
          </p>
          <button
            onClick={handleAddQuestion}
            style={{
              backgroundColor: "#007bff",
              marginTop: "15px",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              marginLeft: "1040px",
              borderRadius: "170px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            Add Question
          </button>

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
                            updatedQuestions[index].survey_name = e.target.value; // Update survey_name
                            updatedQuestions[index].survey_id = surveyIdMap[e.target.value]; // Set survey_id based on selection
                            setQuestions(updatedQuestions);
                          }}
                          style={{ fontSize: "1rem", width: "50%" }}
                        >
                          <option value="">Select Survey</option>
                          {surveys.map(survey => (
                            <option key={survey.survey_id} value={survey.survey_name}>{survey.survey_name}</option>
                          ))}
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
                    onClick={() => handleDelete(q.survey_question_id)}
                    style={{ backgroundColor: "red", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "20px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {questions.length > 0 && (
            <button
              onClick={handleSubmit}
              style={{ backgroundColor: "#007bff", marginBottom: "20px", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "170px", cursor: "pointer", position: "relative", left: "0", fontSize: "20px", marginLeft: "-60px" }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateQuestionnaire;