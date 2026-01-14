import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/auth/TwoStepLogin.module.css";


export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [globalError, setGlobalError] = useState(null);
  const navigate = useNavigate();

  const FIELD_STEP_MAP = { email: 1, password: 2 };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);

    console.log("🚀 Attempting to connect to FastAPI...");

    try {
      // Direct connection to your FastAPI port
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("📡 Response Status:", response.status);
      const data = await response.json();
      console.log("📦 Data received:", data);

      if (!response.ok) {
        // Handle login failures (Wrong password, etc.)
        const errorMessage = Array.isArray(data.detail) 
        ? "Invalid data format sent to server" 
        : data.detail || "Login failed";
        setGlobalError(errorMessage);
        setStep(1); // Reset to email step if it fails
      } else {
        setSuccessMessage(`Welcome back, ${data.username}!`);

        // THE MAGIC REDIRECT
        setTimeout(() => {
          if (data.role === 'admin') {
            console.log("👑 Admin detected. Redirecting...");
            navigate('/admin/dashboard', { replace: true });
          } else {
            console.log("👤 User detected. Redirecting...");
            navigate('/dashboard', { replace: true });
          }
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Bridge broken:", error);
      setGlobalError('Cannot connect to the server. Is FastAPI running?');
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={step === 2 ? handleSubmit : handleNext}>
        <h2 className={styles.title}>Welcome to Maitai Farm</h2>

        {(globalError || successMessage) && (
          <div className={globalError ? styles['error'] : styles['success-message']}>
            <p>{globalError || successMessage}</p>
          </div>
        )}

        {step === 1 && (
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <Mail className={styles.icon} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            {formErrors.email && <p className={styles['error-message']}>{formErrors.email}</p>}
          </div>
        )}

        {step === 2 && (
          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <Lock className={styles.icon} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            {formErrors.password && <p className={styles['error-message']}>{formErrors.password}</p>}
          </div>
        )}

        <div className={styles.buttons}>
          {step > 1 && (
            <button type="button" className={styles.backButton} onClick={handleBack}>
              Back
            </button>
          )}
          <button type="submit" className={styles.button}>
            {step === 2 ? 'Login' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}
