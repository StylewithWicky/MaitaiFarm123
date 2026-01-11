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
    setSuccessMessage(null);
    setGlobalError(null);

    try {
      // Get CSRF token if your backend needs it
      const csrfRes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get_csrf_token`, {
        method: 'GET',
        credentials: 'include',
      });
      const { csrf_token } = await csrfRes.json();

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...formData, csrf_token }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          let targetStep = step;
          const formattedErrors = Object.keys(data.errors).reduce((acc, key) => {
            acc[key] = data.errors[key].join(', ');
            const fieldStep = FIELD_STEP_MAP[key];
            if (fieldStep && fieldStep < targetStep) targetStep = fieldStep;
            return acc;
          }, {});
          setFormErrors(formattedErrors);
          setStep(targetStep);
          setTimeout(() => setFormErrors({}), 5000);
        } else {
          setGlobalError(data.error || 'Unexpected error occurred.');
          setTimeout(() => setGlobalError(null), 5000);
        }
      } else {
        setSuccessMessage(data.success);
        setTimeout(() => {
          setSuccessMessage(null);

          // Redirect based on role
          if (data.role === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        }, 2000);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={step === 2 ? handleSubmit : handleNext}>
        <h2 className={styles.title}>Welcome to Nethub Electronics</h2>

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
