import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { LoginPage } from "../src/component/LoginPage" 
import { StudentHomePage } from "../src/component/StudentHome"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

function App() {

  return (
    <div >
      <LoginPage/>
    </div>
  )
}

export default App
