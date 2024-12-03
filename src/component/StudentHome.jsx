import React, { useState } from "react";
import "./StudentHomePage.css"; // Import CSS file for styling
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "../config/firebase"
import { getStorage, ref, uploadBytes } from "firebase/storage";


window.tokenNumber = 0;
window.ComplarintNumber = 0;

export const StudentHomePage = () => {
  const [showContent, setShowContent] = useState(null);
  const [email, setEmail] = useState("");
  const [complaintSubject, setComplaintSubject] = useState("");
  const [complaint, setComplaint] = useState("");
  const [showScholarshipOptions, setShowScholarshipOptions] = useState(false);
  const [showExchangeProgramOptions, setShowExchangeProgramOptions] = useState(false);

  const handleRequestForm = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) =>false);
    setShowContent("degreeIssuanceForm");
  };

  const handleComplaintToggle = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) =>false);
    setShowContent("complaint");
  };

  const handleAppointmentBooking = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) =>false);
    setShowContent("appointmentBooking");
  };


  const handleViewAdmitCard = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) => false);
    setShowContent("viewAdmitCard");
  };

  const handleToggleScholarshipOptions = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) =>false);
    setShowScholarshipOptions((prevState) =>!prevState);
  };

  const handleToggleExchangeProgramOptions = () => {
    setShowContent(null);
    setShowScholarshipOptions((prevState) => false);
    setShowExchangeProgramOptions((prevState) =>false);
    setShowExchangeProgramOptions((prevState) =>!prevState);
  };

  const handleExchangeProgramsOption = (option) => {
    alert(option);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleComplaintSubjectChange = (e) => {
    setComplaintSubject(e.target.value);
  };

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  return (
    <div className="student-home-container">
      <div className="navbar">
        <button onClick={handleRequestForm}>Request Degree Issuance Form</button>
        <button onClick={handleComplaintToggle}>Submit Complaint</button>
        <button onClick={handleAppointmentBooking}>Book Appointment</button>
        <button onClick={handleViewAdmitCard}>View Admit Card</button>
        <button className="scholarship-button" onClick={handleToggleScholarshipOptions}>
          Scholarships
        </button>
        <button className="exchange-program-button" onClick={handleToggleExchangeProgramOptions}>
          Exchange Programs
        </button>
      </div>
      {showContent === "degreeIssuanceForm" && (
        <div>
        <h2>Degree Issuance Form</h2>
        <p>Form content will be displayed here</p>

        {/* User enters their full name roll number email reason for getting issuing another degreee */}

        <form>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" />
              <input type="text" id="roll" placeholder="Enter your roll number" />
              <input type="text" id="email" placeholder="Enter your email" />
              <input type="text" id="reason" placeholder="Enter reason for getting another degree" />
              <button type="submit" onClick={() => { 
                // data is saved in firebase database
                const db = getFirestore(); +
                
                addDoc(collection(db, "DegreeIssue"), {
                  email : document.getElementById("email").value,
                  name: document.getElementById("name").value,
                  roll: document.getElementById("roll").value,
                  reason: document.getElementById("reason").value,
                  tokenNumber: window.tokenNumber++,
                  Category: "Degree Issuance",
                  Urgency: tokenNumber % 3 === 0 ? "High" : "Low",
                  Status: "Pending"
                });
                alert("Degree issuance form submitted");
                
              }}>Submit</button>
          </div>
        </form>
      </div>
      )}
     
      {showContent === "complaint" && (
        <div className="complaint-popup">
          <h3>Enter your complaint details:</h3>
          <div>
            <label htmlFor="complaintSubject">Subject:</label>
            <input
              type="text"
              id="complaintSubject"
              placeholder="Enter complaint subject"
              value={complaintSubject}
              onChange={handleComplaintSubjectChange}
            />
          </div>
          <div>
            <label htmlFor="complaint">Complaint:</label>
            <textarea
              id="complaint"
              placeholder="Enter your complaint"
              value={complaint}
              onChange={handleComplaintChange}
            />
          </div>
          <button onClick={() => {
           
            const db = getFirestore();
                
            addDoc(collection(db, "Complaint"), {
              TokenNumber: window.ComplarintNumber++,
              Category: "Complaint",
              Subject: document.getElementById("complaintSubject").value,
              Complaint: document.getElementById("complaint").value,
              Status: "Pending"
            });
            alert("Degree issuance form submitted");
          }
          
          }>Submit</button>
        </div>
      )}
      {showContent === "appointmentBooking" && (
        <div>
          <h2>Book Appointment</h2>
          <input type="date"  /> 
          <input type="time" />
          <button onClick={() => { 

            const db = getFirestore();

            addDoc(collection(db, "Appointment"), {
              Category: "Appointment",
              Date: document.getElementById("date").value,
              Time: document.getElementById("time").value,
              Status: "Pending"
            });

          }}>Book</button>
        </div>
      )}
      {showContent === "viewAdmitCard" && (
        <div>
          <h2>View Admit Card</h2>
          <p>View admit card content will be displayed here</p>
        </div>

      )}
      {showScholarshipOptions && (
        <div className="scholarship-options">
          <form>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your full name" />
              <input type="text" id="roll" placeholder="Enter your roll number" />
              <input type="text" id="email" placeholder="Enter your email" />
              <input type="text" id="reason" placeholder="Enter reason for getting scholarship" />
              <label htmlFor="loan">Do you want a loan?</label>
              <select id="loan">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label htmlFor="documents">Upload Documents</label>
              <input type="file" id="documents" />
              <button type="submit" onClick={async () => {
                  // upload the file to storage in firebase 'Scholarship' folder
                  const storage = getStorage();
                  const file = document.getElementById("documents").files[0];
                  const storageRef = ref(storage, 'Scholarship/' + file.name);
                  const uploadTask = uploadBytes(storageRef, file);

                  uploadTask.on('state_changed', 
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                      // Handle unsuccessful uploads
                      console.log(error);
                    }, 
                    () => {
                      // Handle successful uploads on complete
                      alert("File uploaded successfully");
                    }
                  );
              }}>Submit</button>
            </div>
          </form>
        </div>
      )}
      {showExchangeProgramOptions && (
        <div className="exchange-program-options">
          <form>
            <div className="form-group">
              <label htmlFor="country">Select Country</label>
              <select id="country">
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="canada">Canada</option>
              </select>
              <input type="text" id="university" placeholder="Enter University" />
              <input type="text" id="program" placeholder="Enter Program" />
              <label htmlFor="documents">Upload Documents</label>
              <input type="file" id="documents" />
              <button type="submit" onClick={async () => {
                  // upload the file to storage in firebase 'Exchange' folder
                  const storage = getStorage();
                  const file = document.getElementById("documents").files[0];
                  const storageRef = ref(storage, 'Exchange/' + file.name);
                  const uploadTask = uploadBytes(storageRef, file);

                  uploadTask.on('state_changed', 
                    (snapshot) => {
                      // Observe state change events such as progress, pause, and resume
                      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log('Upload is ' + progress + '% done');
                    }, 
                    (error) => {
                      // Handle unsuccessful uploads
                      console.log(error);
                    }, 
                    () => {
                      // Handle successful uploads on complete
                      alert("File uploaded successfully");
                    }
                  );
                }}>Submit</button>
            </div>
          </form>
          
        </div>
      )}
    </div>
  );
};