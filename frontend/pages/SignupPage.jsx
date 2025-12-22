import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/SignupPage.css";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="auth-page signup-container">

      <div className="left-panel"></div>

      <div className="right-panel">

        <div className="logo">
          <div className="triangle"></div>
          <h1>FarmMan</h1>
        </div>

        <div className="greeting">Create Your Account</div>
        <div className="subtext">Join the smart farming movement.</div>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name required"),
            email: Yup.string().email("Invalid email").required("Email required"),
            password: Yup.string().min(6, "Min 6 chars").required("Password required")
          })}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              const res = await axios.post("http://localhost:8000/users/register", values);
              setStatus({ success: res.data.message });
            } catch {
              setStatus({ error: "Signup failed" });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <Form className="signup-form">
              <label>Name</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" component="div" className="error" />

              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />

              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />

              <button type="submit">
                {isSubmitting ? "Creating..." : "Signup"}
              </button>

              <div className="signup">
                Already have an account? < Link to="/login">Login</Link>
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

export default SignupPage;
