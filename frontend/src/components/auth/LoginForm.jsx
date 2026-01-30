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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.email) {
      setFormErrors({ email: "Email is required" });
      return;
    }
    setFormErrors({});
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGlobalError(null);

    // PRODUCTION FIX: Use environment variable with your Render URL as fallback
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://maitaifarm123.onrender.com";
    
    console.log(`🚀 Connecting to: ${backendUrl}`);

    try {
      // Note: If you get a 404, try changing "/users/login" to "/login"
      const response = await fetch(`${backendUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("📡 Response Status:", response.status);
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.detail || "Login failed. Check your credentials.";
        setGlobalError(errorMessage);
        setStep(1); 
      } else {
        setSuccessMessage(`Welcome back, ${data.username || 'Admin'}!`);
        
        // Store session data
        localStorage.setItem("adminToken", "true"); 
        localStorage.setItem("userRole", data.role || 'user');
        
        setTimeout(() => {
          if (data.role === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Connection Error:", error);
      setGlobalError('Maitai Farm server is currently unreachable. Please try again later.');
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
                required
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
                required
              />
            </div>
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