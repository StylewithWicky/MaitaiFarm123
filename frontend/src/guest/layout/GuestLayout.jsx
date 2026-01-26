import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; 
import styles from "@/styles/GuestLayout.module.css";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const GuestLayout = () => {
  return (
    <div className={styles.layoutWrapper}>
      
      <NavBar />

      
      <main className={styles.mainContent}>
        {/* The Outlet is where Home, ProductGrid, or ProductDetails render */}
        <Outlet />
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default GuestLayout;