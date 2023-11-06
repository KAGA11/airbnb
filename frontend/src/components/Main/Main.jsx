import React, { useState } from 'react'
import { Dropdown, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserDeleteOutlined, MenuOutlined } from '@ant-design/icons';
import './Main.css'
import ErrorPopup from '../ErrorPopup/ErrorPopup';

export default function Landing () {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false)

  const ToMainPage = () => {
    navigate('/main')
  }

  const LogOut = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5005/user/auth/logout';
        const requestStructure = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
        const response = await fetch(url, requestStructure);
        if (response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          navigate('/');
        } else {
          setError('Can not log out!');
          setShowError(true);
        }
      } catch (error) {
        console.error('Logout error:', error);
        setError('A network error occurred. Please try again later.');
        setShowError(true);
      }
    }
  }

  const showListing = ({ key }) => {
    message.info(`Click on Listing ${key}`);
  };
  const items = [
    {
      label: 'My Hosted Listings',
      key: '1',
    },
    {
      label: 'View All Listings',
      key: '2',
    },
  ];

  return (
    <div id="landing-container">
        <ErrorPopup message={error} isVisible={showError} onClose={() => setShowError(false)} />
        <Space className='header'>
        <div className='logo' onClick={ToMainPage}>
            <HomeOutlined />
            <span>airbnb</span>
        </div>
        <div className='menu'>
            <span>ALL LISTINGS</span>
        </div>
        <div className='actions'>
            <Dropdown menu={{ items, showListing }}>
                <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <MenuOutlined style={{ marginRight: '20px', color: 'white' }}/>
                </Space>
                </a>
            </Dropdown>

            <UserDeleteOutlined onClick={LogOut} />
        </div>
        </Space>
    </div>
  );
}
