import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="auth-page login-container">

      <div className="left-panel"></div>

      <div className="right-panel">

        <div className="logo">
          <div className="triangle"></div>
          <h1>FarmMan</h1>
        </div>

        <div className="greeting">Hello, Welcome Back</div>
        <div className="subtext">Login to manage your account.</div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6,"Password must be at least 6 characters").required("Password is required")
          })}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const res = await axios.post("http://localhost:8000/users/login", values, { withCredentials: true });
              setStatus({ success: res.data.message });
            } catch (err) {
              setStatus({ error: "Login failed" });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="login-form">
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <div className="signup">
                Don't have an account? <Link to="/register">Signup</Link>
              </div>

              {status?.success && <div className="success">{status.success}</div>}
              {status?.error && <div className="error">{status.error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;

