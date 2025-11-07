// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import "./Navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate();

  // ────── THEME TOGGLE ──────
  useEffect(() => {
    const saved = localStorage.getItem("blogXpertTheme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved === "dark" || (!saved && prefersDark);
    setIsDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("blogXpertTheme", newTheme ? "dark" : "light");
  };

  // ────── SCROLL EFFECT ──────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ────── CREATE CLICK → SIGN UP IF NOT LOGGED IN ──────
  const handleCreateClick = (e) => {
    e.preventDefault();
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth) {
      navigate("/create");
    } else {
      setShowSignup(true);
    }
  };

  // ────── SIGN IN CLICK → OPEN MODAL ──────
  const handleSignInClick = (e) => {
    e.preventDefault();
    setShowSignIn(true);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <Link to="/" className="navbar-logo">
          blogXpert
        </Link>

        <ul className="navbar-links">
          {/* HOME */}
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* DARK MODE TOGGLE */}
          <li>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              <svg className="icon sun" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42" />
              </svg>
              <svg className="icon moon" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </li>

          {/* CREATE → SIGN UP MODAL */}
          <li>
            <a href="#" onClick={handleCreateClick}>
              Get Started
            </a>
          </li>

          {/* SIGN IN → SIGN IN MODAL */}
          <li>
            <a href="#" onClick={handleSignInClick}>
              Sign-In
            </a>
          </li>
        </ul>
      </nav>

      {/* MODALS */}
      {showSignup && <SignUpModal onClose={() => setShowSignup(false)} />}
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  );
}