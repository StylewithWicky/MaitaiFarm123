import React from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import "../styles/auth.css";

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="auth-viewport">
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={location.pathname}         // fade triggers on path change
          timeout={300}
          classNames="fade"
        >
          <div className="auth-page">
            {location.pathname === "/register" ? <SignupPage /> : <LoginPage />}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}



