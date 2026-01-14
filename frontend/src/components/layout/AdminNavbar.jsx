import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "@/styles/Navbar.module.css";

const AdminNavBar = () => {
  const [isHidden, setSidebar] = useState(true);
  const location = useLocation();

  const showSidebar = (e) => {
    e?.preventDefault();
    setSidebar(false);
  };

  const hideSidebar = (e) => {
    e?.preventDefault();
    setSidebar(true);
  };

  const isActive = (path) => {
    return location.pathname === path ? styles["active-link"] : "";
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles["logo-item"]}>
          <Link to="/">
            Maitai Farm
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link
            to="/admin/dashboard"
            className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}
          >
            Home
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link
            to="/admin/about"
            className={`${styles["nav-link"]} ${isActive("/admin/about")}`}
          >
            About Us
          </Link>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <div className={styles["travel-dropdown"]}>
            <span className={styles["travel-link"]}>Products</span>
            <ul className={styles["dropdown-menu"]}>
              <li>
                <Link
                  to="/admin/products/Dorper"
                  className={styles["travel-link"]}
                >
                  Dorper Sheep
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products/Hives"
                  className={styles["travel-link"]}
                >
                  Bee Hives
                </Link>
              </li>
                <li>
                <Link
                  to="/admin/products/Honey"
                  className={styles["travel-link"]}
                >
                  Honey
                </Link>
              </li>
                <li>
                <Link
                  to="/admin/products/K9"
                  className={styles["travel-link"]}
                >
                  K9
                </Link>
              </li>

            </ul>
          </div>
        </li>

        <li className={styles["hide-on-mobile"]}>
          <Link
            to="/admin/upload"
            className={`${styles["nav-link"]} ${isActive("/admin/upload")}`}
          >
            Post
          </Link>
        </li>

        <li className={styles["menu-button"]}>
          <button
            onClick={showSidebar}
            className={styles.navIconButton}
            aria-label="Open menu"
          >
            <Menu size={26} strokeWidth={2} />
          </button>
        </li>
      </ul>

      {/* Sidebar */}
      <ul className={isHidden ? styles["hide-sidebar"] : styles.sidebar}>
        <li className={styles["close-button"]}>
          <button
            onClick={hideSidebar}
            className={styles.navIconButton}
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={2} />
          </button>
        </li>

        <li>
          <Link
            to="/admin/dashboard"
            className={`${styles["nav-link"]} ${isActive("/admin/dashboard")}`}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/admin/about"
            className={`${styles["nav-link"]} ${isActive("/admin/about")}`}
          >
            About Us
          </Link>
        </li>

        <li>
          <Link to="/admin/products/Hives" className={styles["nav-link"]}>
            Honey Bee Hives
          </Link>
        </li>

        <li>
          <Link to="/admin/products/Dorper" className={styles["nav-link"]}>
            Dorper Sheep
          </Link>
        </li>
        <li>
          <Link to="/admin/products/K9" className={styles["nav-link"]}>
            K9
          </Link>
        </li>

        <li>
          <Link to="/admin/products/Honey" className={styles["nav-link"]}>
            Natural Honey
          </Link>
        </li>

        <li>
          <Link
            to="/admin/upload"
            className={`${styles["nav-link"]} ${isActive("/admin/upload")}`}
          >
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
