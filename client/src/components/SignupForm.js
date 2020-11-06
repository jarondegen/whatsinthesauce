import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../auth';
import { Redirect } from 'react-router-dom';
import '../style/signup-form.css';

const SignUpForm = ({setShowSignUp}) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    const [errors, setErrors] = useState([])

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password != confirmPassword && !errors.includes('passwords must match')) {
            setErrors([...errors, 'passwords must match'])
            return
        }
        if (password != confirmPassword && errors.includes('passwords must match')) {
            return
        }
        const data = await fetchWithCSRF('/api/users/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, username: userName, email: email }),
        })
        if (data.ok) {
            console.log("data ok")
            const response = await data.json();
            console.log(response)
            if (response.errors.length === 0) {
                // setCurrentUserId(response.user.id)
                // loginUser()
                setTimeout(loginUser, 500)
            }else {
                setErrors(response.errors)
            }
        }
        else {
            const response = await data.json();
            const { errors } = response
            setErrors(errors)
        }
    }

    const handleLoginClick = () => {
        setShowSignUp(false)
    }


    async function loginUser() {
        const response = await fetchWithCSRF(`/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                username: userName,
                password
            })
        });

        const responseData = await response.json();
        if (!response.ok) {
            setErrors(responseData.errors);
        } else {
            setCurrentUserId(responseData.current_user_id)
        }
    }




    return (
        <div className="signup-form-page">
            <h1 className="signup-title">Signup here</h1>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="signup-username-username-container">
                        <div>
                            <label>Username:</label>
                        </div>
                        <div>
                            <input className="signup-form-input" onChange={handleUserName} value={userName} type="text" />
                        </div>
                    </div>
                    <div className="signup-username-email-container">
                        <div>
                            <label>Email:</label>
                        </div>
                        <div>
                            <input className="signup-form-input" onChange={handleEmail} value={email} type="text" />
                        </div>
                    </div>
                    <div className="signup-username-password-container">
                        <div>
                            <label>Password:</label>
                        </div>
                        <div>
                            <input className="signup-form-input" onChange={handlePassword} value={password} type="password" />
                        </div>
                    </div>
                    <div className="signup-username-confirm-container">
                        <div>
                            <label>Confirm:</label>
                        </div>
                        <div>
                            <input className="signup-form-input" onChange={handleConfirmPassword} value={confirmPassword} type="password" />
                        </div>
                    </div>
                    <div className="signup-username-submit-container">
                        <button className="signup-form-button" variant="contained" color="primary" type="submit" >Signup</button>
                    </div>
                </form>
            </div>
            <div className="signup-errors-div">
                <ul>
                    {errors && errors.length > 0 && errors.map(error => 
                        <li>{error}</li>
                    )}
                </ul>
            </div>
            <div onClick={handleLoginClick} className="have-an-account-link">
                Already have an account? <br/> sign in here...
            </div>
        </div>
    );
}

export default SignUpForm
