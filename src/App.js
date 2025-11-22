import React from "react";
import "./App.css";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="App">
      <h1>
        AI Art Prompt <span className="creator">Creator</span>
      </h1>

      <Chatbot />
    </div>
  );
}

export default App;
