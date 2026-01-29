import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice";
import { setCredentials } from "../store/authSlice";
import './LoginPage.css';

export default function LoginPage(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [errorMsg,setErrorMsg]=useState('');

    const [login, {isLoading}]= useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const userData = await login({username,password}).unwrap();
            dispatch(setCredentials({user: userData,token: userData.token}));
            navigate('/');
        } catch (err) {
            setErrorMsg('Invalid username or password');
        }
    };
    
    return(
        <div className="login-container">
            <div className="login-card">
                <h2>Welcome back</h2>
                <p className="login-subtitle">Please enter your details to sign in</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        placeholder="Enter your username"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="••••••••"
                        />
                    </div>

                    <div className="login-helpers">
                        <label className="remember-me">
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>

                    {errorMsg && <p className="error-text">{errorMsg}</p>}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="register-text">
                    Don't have an account? <a href="#">Create one for free</a>
                </p>
            </div>
        </div>
    )
}