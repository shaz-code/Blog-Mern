// src/components/SignUpModal.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpModal.css";

export default function SignUpModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    // FAKE SIGNUP
    const user = { name, email };
    localStorage.setItem("blogXpertUser", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");

    alert(`Welcome, ${name}!`);
    onClose();
    navigate("/create");
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Sign Up to Create</h2>
        <p>Join blogXpert and start writing!</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="modal-input"
          />
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
            Sign Up
          </button>
        </form>

        <p className="modal-footer">
          Already have an account? <a href="#">Log in</a>
        </p>
      </div>
    </div>
  );
}