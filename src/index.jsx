import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LoginPage } from './component/LoginPage';
import { StudentHomePage } from './component/StudentHome';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


function Root (){
    return (
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage/>} />
                    <Route path="/student" element={<StudentHomePage />} />
                </Routes>
            </Router>
        </React.StrictMode>  
    );
}
    

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);