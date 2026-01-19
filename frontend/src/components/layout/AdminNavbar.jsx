import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import { Menu, X } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const AdminNavBar = () => {
  const [isHidden, setSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const showSidebar = (e) => {
    e?.preventDefault();
    setSidebar(false);
  };

  const hideSidebar = (e) => {
    e?.preventDefault();
    setSidebar(true);
  };

  // Helper function for Smooth Scroll
  const handleAboutClick = (e) => {
    e.preventDefault();
    
    // Close sidebar first if on mobile
    setSidebar(true);

    if (location.pathname === "/admin/dashboard") {
      // If we are already on the dashboard, just scroll
      const element = document.getElementById("about-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we are on a different page (like /admin/products/K9), 
      // go back to dashboard with a hash
      navigate("/admin/dashboard#about-section");
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? styles["active-link"] : "";
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    window.location.href = "/admin/login";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles["logo-item"]}>
          <Link to="/">Maitai Farm</Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link
            to="/admin/dashboard"
            className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}
          >
            Home
          </Link>
        </li>

        {/* UPDATED ABOUT US LINK (Desktop) */}
        <li className={styles["hide-on-mobile"]}>
          <a
            href="#about-section"
            onClick={handleAboutClick}
            className={styles["nav-link"]}
          >
            About Us
          </a>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <div className={styles["travel-dropdown"]}>
            <span className={styles["travel-link"]}>Products</span>
            <ul className={styles["dropdown-menu"]}>
              <li><Link to="/admin/products/Dorper" className={styles["travel-link"]}>Dorper Sheep</Link></li>
              <li><Link to="/admin/products/Hives" className={styles["travel-link"]}>Bee Hives</Link></li>
              <li><Link to="/admin/products/Honey" className={styles["travel-link"]}>Honey</Link></li>
              <li><Link to="/admin/products/K9" className={styles["travel-link"]}>K9</Link></li>
            </ul>
          </div>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link to="/admin/upload" className={`${styles["nav-link"]} ${isActive("/admin/upload")}`}>
            Post
          </Link>
        </li>
        
        <li className={styles["hide-on-mobile"]}>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </li>

        <li className={styles["menu-button"]}>
          <button onClick={showSidebar} className={styles.navIconButton} aria-label="Open menu">
            <Menu size={26} strokeWidth={2} />
          </button>
        </li>
      </ul>

      {/* Sidebar */}
      <ul className={isHidden ? styles["hide-sidebar"] : styles.sidebar}>
        <li className={styles["close-button"]}>
          <button onClick={hideSidebar} className={styles.navIconButton} aria-label="Close menu">
            <X size={26} strokeWidth={2} />
          </button>
        </li>

        <li><Link to="/admin/dashboard" className={styles["nav-link"]}>Home</Link></li>

        {/* UPDATED ABOUT US LINK (Sidebar) */}
        <li>
          <a href="#about-section" onClick={handleAboutClick} className={styles["nav-link"]}>
            About Us
          </a>
        </li>

        <li><Link to="/admin/products/Hives" className={styles["nav-link"]}>Honey Bee Hives</Link></li>
        <li><Link to="/admin/products/Dorper" className={styles["nav-link"]}>Dorper Sheep</Link></li>
        <li><Link to="/admin/products/K9" className={styles["nav-link"]}>K9</Link></li>
        <li><Link to="/admin/products/Honey" className={styles["nav-link"]}>Natural Honey</Link></li>
        <li><Link to="/admin/upload" className={styles["nav-link"]}>Post</Link></li>
        <li>
          <button onClick={handleLogout} className={styles.sidebarLogout}>
            Logout ({localStorage.getItem("username")})
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;