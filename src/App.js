// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Routes, Route,  BrowserRouter as Router} from "react-router-dom";
import Home from "./pages/home";
import Overview from "./pages/overview";
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/reports";
import Team from "./pages/team";
import Salud from "./pages/health";


function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" exact component={Overview} />
        <Route path="/reports" exact component={Reports} />
        <Route path="/salud" exact component={Salud} />
        <Route path="/reports/reports2" exact component={ReportsTwo} />
        <Route path="/reports/reports3" exact component={ReportsThree} />
        <Route path="/team" exact component={Team} />
      </Routes>
      
    </>
  );
}

export default App;
