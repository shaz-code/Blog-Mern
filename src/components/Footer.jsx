// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>blogXpert</h3>
          <p>
            Your platform for authentic storytelling. From personal reflections to professional insights, we make blogging effortless and impactful.
          </p>
          <div className="mission">
            <h4>Our Mission</h4>
            <p>
              Empowering every voice to write, connect, and inspire through seamless blogging tools and a global community. We believe in the power of words to foster growth, spark conversations, and drive change.
            </p>
          </div>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="https://x.com/blogxpert" aria-label="X (Twitter)" className="icon">
              <span className="icon-x">X</span>
            </a>
            <a href="https://linkedin.com/company/blogxpert" aria-label="LinkedIn" className="icon">
              <span className="icon-linkedin">LI</span>
            </a>
            <a href="https://instagram.com/blogxpert" aria-label="Instagram" className="icon">
              <span className="icon-instagram">IG</span>
            </a>
          </div>
          <p className="newsletter">
            Subscribe for blogging tips & updates.
          </p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} blogXpert. All rights reserved.</p>
      </div>
    </footer>
  );
}