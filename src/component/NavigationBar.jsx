// NavigationBar.js

import React from "react";
import "./NavigationBar.css"; // Import CSS file for styling

export const NavigationBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
}
