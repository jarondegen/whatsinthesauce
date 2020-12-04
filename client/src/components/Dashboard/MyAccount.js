import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth';
import PhotoUpload from '../PhotoUpload/PhotoUpload';

const MyAccount = ({getProfilePic}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getAccountInfo = async () => {
        const data = await fetch(`/api/users/get/${currentUserId}`);
        if (data.ok) {
            const { info } = await data.json()
            setUserInfo(info)
        }
    }

    const handleAccountChange = async (e) => {
        if (validateInputs()){
            const change = e.target.id === 'changeEmail' ? 'email' : 'password';
            if (change === 'password' & password.length === 0) {
                setErrors(['password must be 6 or more characters'])
                return
            }
            if (change === 'email' & email.length === 0) {
                setErrors(['email must be 6 or more characters'])
                return
            }
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
    };

    const validateInputs = () => {
        setErrors([])
        const errs = []
        if (password !== confirmPassword) {
            errs.push("passwords must match");
        }
        if (email !== confirmEmail) {
            errs.push("emails must match");
        }
        if (password.length < 6 && password.length !== 0) {
            errs.push("password must be 6 or more characters");
        }
        if (email.length < 6 && email.length !== 0) {
            errs.push("please enter a valid email");
        }
        setErrors(errs)
        if (errs.length > 0) {
            return false
        }else return true
    }

    const handleUploadClick = () => {
        const uploadModal = document.getElementById('profile-modal-container');
        uploadModal.classList.toggle('hide')
    }

    return (
        <div className="my-account-pref-container">
            <div id="profile-modal-container" className="hide">
                <div className="porfile-modal">
                    <PhotoUpload getProfilePic={getProfilePic} handleUploadClick={handleUploadClick} type={"profile"}/>
                </div>
            </div>
            <div className="my-account-details-div">
                <span>{`user name: ${userInfo.username}`}</span>
                <span>{`email: ${userInfo.email}`}</span>
            </div>
            <div className="account-upload-button-container">
                <button onClick={handleUploadClick} className="account-upload-button">Change Profile Picture</button>
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