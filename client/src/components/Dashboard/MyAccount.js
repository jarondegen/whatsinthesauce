import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth';

const MyAccount = () => {
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({})
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmEmail, setConfirmEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleConfirmEmail = (e) => {
        setConfirmEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    useEffect(() => {
        getAccountInfo()
    }, []);

    const getAccountInfo = async () => {
        const data = await fetch(`/api/users/get/${currentUserId}`);
        if (data.ok) {
            const { info } = await data.json()
            console.log(info)
            setUserInfo(info)
        }
    }

    const handleAccountChange = async (e) => {
        if (password != confirmPassword) {
            setErrors([...errors, "passwords must match"]);
            return;
        }
        else if (email != confirmEmail) {
            setErrors([...errors, "emails must match"]);
            return;
        }
        else if (password.length < 6) {
            setErrors([...errors, "password must be 6 or more characters"]);
        }
        const change = e.target.id === 'changeEmail' ? 'email' : 'password';
        const data = await fetchWithCSRF('/api/users/edit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ new_password: password, new_email: email, user_id: currentUserId, change: change }),
        })
        if (data.ok) {
            const res = await data.json();
            if (res === 'success'){
                setPassword('');
                setConfirmPassword('');
                setEmail('');
                setConfirmEmail('');
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 4000);
            } else {
                setErrors([...errors, res])
            }
        };
    };

    return (
        <div className="my-account-pref-container">
            <div className="my-account-details-div">
                <span>{`user name: ${userInfo.username}`}</span>
                <span>{`email: ${userInfo.email}`}</span>
            </div>
            <div className="account-change-success-div">
                {success && <span>Change Successful!</span>}
            </div>
            <div className="change-email-div">
                <label>change email</label>
                <input type="email" value={email} onChange={handleEmail} placeholder="new email"></input>
                <input type="email" value={confirmEmail} onChange={handleConfirmEmail} placeholder="confirm new email"></input>
                <button onClick={handleAccountChange} id="changeEmail" >Submit</button>
            </div>
            <div className="change-password-div">
                <label>change password</label>
                <input value={password} onChange={handlePassword} type="password" placeholder="new passowrd"></input>
                <input value={confirmPassword} onChange={handleConfirmPassword} type="password" placeholder="confirm new password"></input>
                <button onClick={handleAccountChange} id="changePassword">Submit</button>
            </div>
            <div className="account-change-errors-div" > 
                {errors.map(error => 
                    <li key={error}>{error}</li>    
                )}
            </div>
        </div> 
    );
};

export default MyAccount;