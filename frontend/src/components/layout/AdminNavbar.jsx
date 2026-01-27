import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, ChevronDown, LogOut, ExternalLink } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const AdminNavBar = () => {
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

  // UPDATED: Logic to redirect to Home Page on logout
  const handleLogout = () => {
    localStorage.clear(); // Clears token, role, and username
    window.location.href = "/"; // Takes you to the public Home Page
  };

  const scrollToSection = (id) => {
    setSidebar(true);
    if (location.pathname === "/admin/dashboard") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/admin/dashboard#${id}`);
    }
  };

  const handleProductLink = (category) => {
    setSidebar(true);
    setIsDropdownOpen(false);
    navigate(`/admin/products/${category}`);
  };

  const isActive = (path) => (location.pathname === path ? styles["active-link"] : "");

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <ul className={styles.navList}>
        <li className={styles["logo-item"]}>
          <Link to="/admin/dashboard" className={styles.logoLink}>
            <Leaf size={24} color={isScrolled ? "#14532d" : "#ffffff"} />
            <span style={{ color: isScrolled ? "#14532d" : "#ffffff" }}>MAITAI ADMIN</span>
          </Link>
        </li>

        <div className={styles["hide-on-mobile"]}>
          <li>
            <Link to="/admin/dashboard" className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}>
              Home
            </Link>
          </li>

          <li 
            className={styles["travel-dropdown"]}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className={`${styles["nav-link"]} ${location.pathname.includes('products') ? styles["active-link"] : ""}`}>
              Inventory <ChevronDown size={14} className={isDropdownOpen ? styles.rotate : ""} />
            </button>
            <ul className={`${styles["dropdown-menu"]} ${isDropdownOpen ? styles.showDropdown : ""}`}>
              <li><button onClick={() => handleProductLink("Dorper")} className={styles["travel-link"]}>Dorper Sheep</button></li>
              <li><button onClick={() => handleProductLink("Hives")} className={styles["travel-link"]}>Bee Hives</button></li>
              <li><button onClick={() => handleProductLink("Honey")} className={styles["travel-link"]}>Natural Honey</button></li>
              <li><button onClick={() => handleProductLink("K9")} className={styles["travel-link"]}>K9 Security</button></li>
              <li className={styles.dropdownDivider}></li>
              <li><button onClick={() => navigate("/admin/upload")} className={styles["travel-link"]}>+ Post New Product</button></li>
            </ul>
          </li>

          <li><button onClick={() => scrollToSection('about-section')} className={styles["nav-link"]}>About Edit</button></li>
          <li><Link to="/admin/upload" className={`${styles["nav-link"]} ${isActive("/admin/upload")}`}>Upload</Link></li>
          
          <li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={16} /> Logout
            </button>
          </li>
        </div>

        <li className={styles["menu-button"]}>
          <button onClick={() => setSidebar(false)} className={styles.navIconButton}>
            <Menu size={28} color={isScrolled ? "#14532d" : "#ffffff"} />
          </button>
        </li>
      </ul>

      {/* Admin Sidebar */}
      <ul className={`${styles.sidebar} ${isHidden ? styles["hide-sidebar"] : ""}`}>
        <li className={styles["close-button"]}>
          <button onClick={() => setSidebar(true)} className={styles.navIconButton}><X size={28} /></button>
        </li>
        <li><Link to="/admin/dashboard" onClick={() => setSidebar(true)}>Admin Home</Link></li>
        
        <li className={styles.sidebarLabel}>Management</li>
        <li><button onClick={() => handleProductLink("Dorper")}>Sheep Inventory</button></li>
        <li><button onClick={() => handleProductLink("Honey")}>Honey Inventory</button></li>
        <li><Link to="/admin/upload" onClick={() => setSidebar(true)}>Add New Listing</Link></li>
        
        <li className={styles.sidebarLabel}>Settings</li>
        <li><button onClick={() => scrollToSection('about-section')}>Edit About Us</button></li>
        <li>
          <button onClick={handleLogout} className={styles.sidebarLogout}>
            Logout Admin
          </button>
        </li>
        
        <li className={styles.secretLink}>
          <Link to="/" onClick={() => setSidebar(true)}>
            <ExternalLink size={14} style={{ marginRight: '8px' }} />
            View Public Site
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;