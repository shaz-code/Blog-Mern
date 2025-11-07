// src/components/ForgotPasswordModal.jsx
import { useState } from "react";
import "./ForgotPasswordModal.css";
import "./SignInModal.css"

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // FAKE EMAIL SEND
    setTimeout(() => {
      setSent(true);
      setError("");
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Reset Password</h2>

        {sent ? (
          <>
            <p className="success">
              Check your email for a password reset link.
            </p>
            <button onClick={onClose} className="modal-submit">
              Done
            </button>
          </>
        ) : (
          <>
            <p>Enter your email to reset password</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal-input"
              />
              <button type="submit" className="modal-submit">
                Send Reset Link
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}