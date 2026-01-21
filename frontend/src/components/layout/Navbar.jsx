import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const NavBar = () => {
  const [isHidden, setSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const showSidebar = (e) => {
    e?.preventDefault();
    setSidebar(false);
  };

  const hideSidebar = (e) => {
    e?.preventDefault();
    setSidebar(true);
  };

  
  const handleAboutClick = (e) => {
    e.preventDefault();
    setSidebar(true); 

    if (location.pathname === "/") {
      
      const element = document.getElementById("about-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      
      navigate("/#about-section");
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? styles["active-link"] : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles["logo-item"]}>
          <Link to="/">Maitai Farm</Link>
        </li>

        {/* Desktop Links */}
        <li className={styles["hide-on-mobile"]}>
          <Link
            to="/"
            className={`${styles["nav-link"]} ${isActive("/")}`}
          >
            Home
          </Link>
        </li>

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
              <li><Link to="/products/dorper" className={styles["travel-link"]}>Dorper Sheep</Link></li>
              <li><Link to="/products/hives" className={styles["travel-link"]}>Bee Hives</Link></li>
              <li><Link to="/products/honey" className={styles["travel-link"]}>Honey</Link></li>
              <li><Link to="/products/k9" className={styles["travel-link"]}>K9</Link></li>
            </ul>
          </div>
        </li>

        <li className={styles["menu-button"]}>
          <button onClick={showSidebar} className={styles.navIconButton} aria-label="Open menu">
            <Menu size={26} strokeWidth={2} />
          </button>
        </li>
      </ul>

      {/* Mobile Sidebar */}
      <ul className={isHidden ? styles["hide-sidebar"] : styles.sidebar}>
        <li className={styles["close-button"]}>
          <button onClick={hideSidebar} className={styles.navIconButton} aria-label="Close menu">
            <X size={26} strokeWidth={2} />
          </button>
        </li>

        <li><Link to="/" onClick={() => setSidebar(true)} className={styles["nav-link"]}>Home</Link></li>
        <li>
          <a href="#about-section" onClick={handleAboutClick} className={styles["nav-link"]}>
            About Us
          </a>
        </li>
        <li><Link to="/products/hives" onClick={() => setSidebar(true)} className={styles["nav-link"]}>Honey Bee Hives</Link></li>
        <li><Link to="/products/dorper" onClick={() => setSidebar(true)} className={styles["nav-link"]}>Dorper Sheep</Link></li>
        <li><Link to="/products/k9" onClick={() => setSidebar(true)} className={styles["nav-link"]}>K9</Link></li>
        <li><Link to="/products/honey" onClick={() => setSidebar(true)} className={styles["nav-link"]}>Natural Honey</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;;