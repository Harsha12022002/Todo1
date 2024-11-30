import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; 
import Check from "./Check";
import Example from "./Try";
import Login from "./Login";
import Signup from "./Signup";
function MyApp() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Sign" element={<Signup />} />
          <Route path="/Harsha" element={<Example />} />
          <Route path="/Home" element={<Check />} />
        </Routes>
      </Router>
    </div>
  );
}

export default MyApp;
