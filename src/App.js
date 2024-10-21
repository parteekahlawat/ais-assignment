import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const questionData = {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTime, setIsTime] = useState(false);

  useEffect(() => {
    if (timer > 0 && !isSubmitted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTime(true);
    }
  }, [timer, isSubmitted]);
 
  // option clicked funtion
  const handleOptionClick = (option) => {
    if (!isSubmitted) {
      setSelectedOption(option);
    }
  };

  // submit funtion
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // reload funtion
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <h1> AIS Questionnaire</h1>
      <div className="timer">Time left: {timer}s</div>

      {isTime ? (
        <div className="popup">
          <p>Time's up! Do you want to reload the page and try again?</p>
          <button onClick={handleReload}>Reload</button>
        </div>
      ) : (
        <>
          <div className="question">{questionData.question}</div>
          <div className="options">
            {questionData.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === option ? 'selected' : ''} ${
                  isSubmitted
                    ? option === questionData.correctAnswer
                      ? "correct"
                      : selectedOption === option
                      ? "incorrect"
                      : ""
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={isSubmitted}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={selectedOption === null || isSubmitted}
          >
            {isSubmitted ? "Next" : "Submit"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
