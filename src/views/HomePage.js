import React, { useState } from "react";
import { getGPTResponse } from "../api/openai";
import "./HomePage.css";

function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [botReply, setBotReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const reply = await getGPTResponse(userInput);
    setBotReply(reply);
    setLoading(false);
  };

  return (
    <div className="chatbot-homepage">
      <h1>StarBot - Crisis Intervention Assistant</h1>
      <p className="chatbot-subtext">How are you feeling today? Let me support you.</p>

      <div className="chatbot-input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your concern..."
          className="chatbot-input"
        />
        <button onClick={handleSend} className="chatbot-button">Send</button>
      </div>

      <div className="chatbot-response">
        {loading ? (
          <p><em>Typing...</em></p>
        ) : (
          botReply && <p><strong>Bot:</strong> {botReply}</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
