import React, { useState } from 'react';
import { auth} from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';



export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Type, setType] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // check email and password is valid or not
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            alert('User logged in');
            // making the mail global so that it can be used in other components
            window.email = email;
            // // if valid and user type is student rediret to student page
            alert(Type)
            if (Type === 'student') {
                navigate('/student');
            }
            else if (Type === 'admin') {
                // navigate('/admin');
            }
            else if (Type === 'director') {
                // navigate('/director');
            }
        
        }
        catch (error) {
            console.log(error);
            alert('Invalid credentials');
        }
     
    };

     return (
         <div className="login-container">
             <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                 </div>

                 <div className="form-group">
                    <label htmlFor="type">Type</label>
                     {/* Selects the type of user by default is says "selct user mode" */}
                    <select
                        id="type"
                        value={Type}
                         onChange={(e) => setType(e.target.value)}
                     >
                        <option value="">Select user mode</option>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                         <option value="director">Director</option>
                    </select>
                </div>
                 <button type="submit" onClick={handleLogin}>Login</button>
                </form>
        </div>
    );
};
