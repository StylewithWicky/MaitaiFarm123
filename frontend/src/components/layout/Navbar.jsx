import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, ChevronDown } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setSidebar] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setSidebar(true);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleProductLink = (category) => {
    setSidebar(true);
    setIsDropdownOpen(false);
    navigate(`/products/${category}`);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <ul className={styles.navList}>
        <li className={styles["logo-item"]}>
          <Link to="/" className={styles.logoLink}>
            <Leaf size={24} color={isScrolled ? "#14532d" : "#22c55e"} />
            <span style={{ color: isScrolled ? "#14532d" : "#22c55e", fontWeight: "bold" }}>
              MAITAI FARM
            </span>
          </Link>
        </li>

        <div className={styles["hide-on-mobile"]}>
          <li><Link to="/" className={styles["nav-link"]}>Home</Link></li>

          <li 
            className={styles["travel-dropdown"]}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={styles["nav-link"]}>
              Products <ChevronDown size={14} className={isDropdownOpen ? styles.rotate : ""} />
            </button>
            <ul className={`${styles["dropdown-menu"]} ${isDropdownOpen ? styles.showDropdown : ""}`}>
              <li><button onClick={() => handleProductLink("Dorper")} className={styles["travel-link"]}>Dorper Sheep</button></li>
              <li><button onClick={() => handleProductLink("Hives")} className={styles["travel-link"]}>Bee Hives</button></li>
              <li><button onClick={() => handleProductLink("Honey")} className={styles["travel-link"]}>Natural Honey</button></li>
              <li><button onClick={() => handleProductLink("K9")} className={styles["travel-link"]}>K9 Security</button></li>
            </ul>
          </li>

          <li><button onClick={() => scrollToSection('about-section')} className={styles["nav-link"]}>About Us</button></li>
          <li><button onClick={() => scrollToSection('location-section')} className={styles["nav-link"]}>Location</button></li>
        </div>

        <li className={styles["menu-button"]}>
          <button onClick={() => setSidebar(false)} className={styles.navIconButton}>
            <Menu size={28} color={isScrolled ? "#14532d" : "#ffffff"} />
          </button>
        </li>
      </ul>

      {/* Mobile Sidebar - Now purely customer facing */}
      <ul className={`${styles.sidebar} ${isHidden ? styles["hide-sidebar"] : ""}`}>
        <li className={styles["close-button"]}>
          <button onClick={() => setSidebar(true)} className={styles.navIconButton}><X size={28} /></button>
        </li>
        <li><Link to="/" onClick={() => setSidebar(true)}>Home</Link></li>
        
        <li className={styles.sidebarLabel}>Produce</li>
        <li><button onClick={() => handleProductLink("Dorper")}>Dorper Sheep</button></li>
        <li><button onClick={() => handleProductLink("Honey")}>Natural Honey</button></li>
        <li><button onClick={() => handleProductLink("K9")}>K9 Security</button></li>
        
        <li className={styles.sidebarLabel}>Company</li>
        <li><button onClick={() => scrollToSection('about-section')}>About Us</button></li>
        <li><button onClick={() => scrollToSection('location-section')}>Location</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;