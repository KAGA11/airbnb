import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ErrorPopup/ErrorPopup.jsx'
import './Login.css'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

export default function Login () {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const Login = async () => {
    if (email && password) {
      try {
        const url = 'http://localhost:5005/user/auth/login';
        const requestStructure = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        };
        const response = await fetch(url, requestStructure);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('email', email);
          localStorage.setItem('token', data.token);
          navigate('/main');
        } else {
          setError('Password or email is incorrect');
          setShowError(true);
        }
      } catch (error) {
        setError('An error occurred while trying to log in');
        setShowError(true);
      }
    } else {
      setError('Please enter both email and password');
      setShowError(true);
    }
  };

  const ToSignupPage = () => {
    navigate('/signup');
  }
  return (
    <div className='login'>
      <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      <div className='register-modal'>
        <h2>Register</h2>
        <input type='email' className='form-input' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type='password' className='form-input' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='submit-button' onClick={Login}>Log in</button>
        <button className='back-button' onClick={ToSignupPage}>Sign Up</button>
      </div>
    </div>
  )
}
