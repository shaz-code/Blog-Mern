// src/components/SignInModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";
import "./SignInModal.css";

export default function SignInModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // FAKE LOGIN
    const savedUser = localStorage.getItem("blogXpertUser");
    if (!savedUser) {
      setError("No account found. Sign up first.");
      return;
    }

    const user = JSON.parse(savedUser);
    if (user.email !== email) {
      setError("Incorrect email or password");
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    alert(`Welcome back, ${user.name}!`);
    onClose();
  };

  if (showForgot) {
    return <ForgotPasswordModal onClose={() => setShowForgot(false)} />;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Sign In</h2>
        <p>Welcome back to blogXpert</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="modal-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="modal-input"
          />
          <button type="submit" className="modal-submit">
            Sign In
          </button>
        </form>

        <button
          type="button"
          className="forgot-link"
          onClick={() => setShowForgot(true)}
        >
          Forgot Password?
        </button>

        <p className="modal-footer">
          New here? <a href="#" onClick={() => { onClose(); /* open signup */ }}>Sign Up</a>
        </p>
      </div>
    </div>
  );
}