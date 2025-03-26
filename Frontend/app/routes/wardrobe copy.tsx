import React from 'react';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '200px', padding: '20px' }}>
                <div>
                    <h1>Dashboard Content</h1>
                    <p>Welcome to the dashboard! Here you can find various information and tools.</p>
                    {/* Add more content here */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;