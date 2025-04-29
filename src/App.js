import { Link } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Home Page</h1>
      <Link to="/form">Go to Form</Link>
    </div>
  );
}

export default App;
