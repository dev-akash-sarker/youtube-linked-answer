import React, { useState } from "react";
import "./style.css";

export default function YouTubeQuestionApp() {
  const [videoLink, setVideoLink] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleVideoLinkChange = (e) => {
    setVideoLink(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleGenerateAnswer = async () => {
    try {
      const response = await fetch("http://localhost:8000/get-video-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoLink, question }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="youtube-question-app">
        <div className="header">
          <h1>YouTube Q&A</h1>
          <p>Paste a YouTube link and get answers based on your questions!</p>
        </div>
        <div className="input-container">
          <label>YouTube Video Link:</label>
          <input
            type="text"
            value={videoLink}
            onChange={handleVideoLinkChange}
          />
        </div>
        <div className="input-container">
          <label>Your Question:</label>
          <input type="text" value={question} onChange={handleQuestionChange} />
        </div>
        <button className="generate-btn" onClick={handleGenerateAnswer}>
          Generate Answer
        </button>
        {answer && (
          <div className="answer-container">
            <h3>Generated Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
      {/* OPEN AI API KEY: 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 */}
      {/* {google cloud API : AIzaSyAKdsEZ_UtJLF1NdN9ctukIy7UYy_HSR94} */}
    </>
  );
}
