import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavBar from '@/components/layout/AdminNavbar';
import AdminFooter from '@/components/layout/AdminFooter';
import styles from '@/styles/AdminLayout.module.css';

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className={styles.adminWrapper}>
            {/* STICKY NAVBAR: Always stays at the top */}
            <AdminNavBar />

            <main className={styles.mainContent}>
                {/* The <Outlet /> is the "Magic Window". 
                  If you are at /admin/dashboard, it shows your Hero/Slider.
                  If you are at /admin/products/Honey, it shows your Honey Grid.
                */}
                <div key={location.pathname} className={styles.fadeAnimation}>
                    <Outlet />
                </div>
            </main>

            {/* GLOBAL FOOTER: Always stays at the bottom */}
            <AdminFooter />
        </div>
    );
};

export default AdminLayout;