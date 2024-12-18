import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProfileCard from "./components/ProfileCard";

const ClientFAQ = () => {
  const [openSection, setOpenSection] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleQuestion = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  const faqData = [
    {
      topic: "Pension Plans",
      questions: [
        {
          question: "What is the cost overall?",
          answer: "The cost is small. Approximately $220!",
        },
        {
          question: "Can I change my plan later?",
          answer: "Yes, you can change your plan at any time.",
        },
      ],
    },
    {
      topic: "Individual Memberships",
      questions: [
        {
          question: "What are the benefits?",
          answer: "Details about individual memberships.",
        },
        {
          question: "How do I sign up?",
          answer: "You can sign up online or at our office.",
        },
      ],
    },
    {
      topic: "Group Memberships",
      questions: [
        {
          question: "How do I enroll?",
          answer: "Details about group memberships.",
        },
      ],
    },
    {
      topic: "Copertae Memberships",
      questions: [
        {
          question: "What is included?",
          answer: "Details about copertae memberships.",
        },
      ],
    },
    {
      topic: "Contributions",
      questions: [
        {
          question: "How can I contribute?",
          answer: "Details about contributions.",
        },
        {
          question: "How can I contribute more money?",
          answer: "You can increase your contributions through your account settings.",
        },
      ],
    },
    {
      topic: "Payouts",
      questions: [
        {
          question: "When can I start receiving payouts?",
          answer: "Information about payouts.",
        },
      ],
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <ProfileCard />
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-gray-900">Payment Overview</h6>
          </div>
          <div className="card-body">
            {faqData.map((item, index) => (
              <div className="card mb-4" key={index}>
                <button
                  className="d-block card-header py-3"
                  onClick={() => toggleSection(index)}
                  aria-expanded={openSection === index}
                  aria-controls={`collapseCard${index}`}
                  style={{ background: 'none', border: 'none', padding: 10, cursor: 'pointer', width: '100%' }}
                >
                
                    
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h6 className="m-0 font-weight-bold text-gray-900">{item.topic}</h6>
                    <span>{openSection === index ? "▼" : "▲"}</span>
                  </div>
                </button>
               
                <div className={`collapse ${openSection === index ? "show" : ""}`} id={`collapseCard${index}`}>
                  <div className="card-body grid-container">
                    {item.questions.map((q, qIndex) => (
                      <div key={qIndex} className="grid-item">
                        <button
                          className="d-block font-weight-bold text-gray-700"
                          onClick={() => toggleQuestion(qIndex)}
                          aria-expanded={openQuestion === qIndex}
                          aria-controls={`collapseQuestion${index}-${qIndex}`}
                          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%' }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>{q.question}</span>
                            <span>{openQuestion === qIndex ? "▼" : "▲"}</span>
                          </div>
                        </button>
                        <div className={`collapse ${openQuestion === qIndex ? "show" : ""}`} id={`collapseQuestion${index}-${qIndex}`}>
                         <hr></hr>
                          <div className="card-body">{q.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientFAQ;