import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

export default function Login () {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const SignUp = async () => {
    if (!name || !email || !password || !confirm) {
      setError('Please complete all fields');
      setShowError(true);
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      setShowError(true);
      return;
    }

    try {
      const url = 'http://localhost:5005/user/auth/register';
      const requestStructure = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      };
      const response = await fetch(url, requestStructure);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem('email', email);
        localStorage.setItem('token', data.token);
        navigate('/login');
      } else {
        setError('An error occurred while trying to register');
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError('A network error occurred. Please try again later.');
      setShowError(true);
    }
  };

  const ToLoginPage = () => {
    navigate('/login');
  }
  return (
    <div className='login'>
    <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
      <div className='register-modal'>
        <h2>Register</h2>
        <input type='text' className='form-input' placeholder='User name' value={name} onChange={e => setName(e.target.value)}/>
        <input type='email' className='form-input' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type='password' className='form-input' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        <input type='password' className='form-input' placeholder='Confirm Password' value={confirm} onChange={e => setConfirm(e.target.value)} />
        <button className='submit-button' onClick={SignUp}>SUBMIT</button>
        <button className='back-button' onClick={ToLoginPage}>BACK TO LOGIN</button>
      </div>
    </div>
  )
}
