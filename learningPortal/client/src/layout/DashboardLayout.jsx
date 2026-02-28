import React from 'react';
import '../styles/DashboardAdvanced.css';

export default function DashboardLayout({ children }) {
    return (
        <div className="dashboard-layout-wrapper">
            {children}
        </div>
    );
}
