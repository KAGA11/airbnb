import React from 'react'
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import './Landing.css'

export default function Landing () {
  const navigate = useNavigate();

  const ToLoginPage = () => {
    navigate('/login');
  }

  return (
    <div id="landing-container">
        <Space className='header'>
        <div className='logo'>
            <HomeOutlined />
            <span>airbnb</span>
        </div>
        <div className='menu'>
            <span>ALL LISTINGS</span>
        </div>
        <div className='actions'>
            <MenuOutlined style={{ marginRight: '20px' }}/>
            <UserOutlined onClick={ToLoginPage} />
        </div>
        </Space>
        <div className="background-container">
        <Space>
          <div className="overlay-text">
            Plan your next trip with us!
          </div>
        </Space>
      </div>
    </div>
  );
}
