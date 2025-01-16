
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import './index.css'
import { GlobalProvider } from "./contexts/GlobalContext";


function App() {
  

  return (
    <GlobalProvider>
      <Router>
          <div>
            <Routes>
              
              <Route path="/" element={<Dashboard />} />
              
            </Routes>
          </div>
      </Router>
    </GlobalProvider>
  )
}

export default App
