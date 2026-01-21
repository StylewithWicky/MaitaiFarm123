import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavBar from '@/components/layout/AdminNavbar';
import AdminFooter from '@/components/layout/AdminFooter';
import styles from '@/styles/AdminLayout.module.css';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className={styles.adminWrapper}>
            <AdminNavBar />

            <main className={styles.mainContent}>
                
                <div key={location.pathname} className={styles.fadeAnimation}>
                    <Outlet />
                </div>
            </main>

            
            <AdminFooter />
        </div>
    );
};

export default AdminLayout;