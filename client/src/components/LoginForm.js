import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../auth';
import '../style/login-form.css';

function LoginForm({setShowSignUp}) {
    const [username, setUsername] = useState("Demo-User");
    const [password, setPassword] = useState("password");
    let history = useHistory();
    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    const submitForm = (e) => {
        e.preventDefault();

        async function loginUser() {
            const response = await fetchWithCSRF(`/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.current_user_id);
                history.push('/home');
            }
        }
        loginUser();
    };

    const handleSignupClick = () => {
        setShowSignUp(true);
    };

    return (
        <div className="login-form-container">
            <div className="welcome-div">
                Welcome! Login and get started
            </div>
            <div className="div-wrapping-form">
                <form className="login-form-form" onSubmit={submitForm}>
                    <div className="inside-login-form-div">
                        <label className="login-form-username-label">Username: </label>
                        <div className="login-form-input-div">
                            <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
                        </div>
                        <label className="login-form-passwordlabel">Password: </label>
                        <div className="login-form-input-div">
                            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                        </div>
                    </div>
                    <div className="login-form-button-div">
                        <button>Login</button>
                    </div>
                </form>
            </div>
            {errors.length ? errors.map((err) => 
                <div className="login-errors">
                    <span key={err} >{err}</span>
                </div>
                ): ''}
                <div onClick={handleSignupClick} className="sign-up-link">
                don't have an account yet?  <br /> signup here!
            </div>
        </div>
    );
};
export default LoginForm; 