import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SideBar from './component/SideBar';
import TopNav from './component/TopNav';
import Footer from './component/Footer';

const questions = [
    { question: "Are the working environment at your workplace good?", answers: [], correctAnswer: "" },
    { question: "Is the workload manageable?", answers: [], correctAnswer: "" },
    { question: "Do you feel valued at work?", answers: [], correctAnswer: "" },
    // Add more questions up to 20
];

const SurveyQuestions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Any initial setup can go here
    }, []);

    const handleStarSelect = (stars) => {
        setSelectedStars(stars);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedStars(0); // Reset selected stars for the next question
        } else {
            // Navigate to a completion or results page
            navigate('/completion'); // Change to your desired route
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <SideBar />
            </div>
            <div className="flex-fill">
                <TopNav />
                <div className="container mt-4 d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                    <h1 className="text-center">QUESTIONNAIRE</h1>
                    <h2 className="text-center">{currentQuestion.question}</h2>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        marginBottom: '1rem'
                    }}>
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                style={{
                                    color: selectedStars > index ? 'gold' : 'grey',
                                    transition: 'color 0.3s ease',
                                    margin: '0 0.1rem'
                                }}
                                onClick={() => handleStarSelect(index + 1)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <button 
                        style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }} 
                        onClick={handleNext} 
                        disabled={selectedStars === 0}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Next
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default SurveyQuestions;