// src/components/CreateBlogCTA.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlogCTA.css";

const quotes = [
  "Blogging is the new canvas for ideas.",
  "Every post is a seed of innovation.",
  "Write today. Inspire tomorrow.",
  "Your voice deserves a platform.",
  "Creativity starts with a blank page.",
];

export default function CreateBlogCTA() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="create-cta-section">
      <div className="create-cta-content">
        <div className="quote-wrapper">
          {quotes.map((quote, index) => (
            <p
              key={index}
              className={`quote ${index === quoteIndex ? "active" : ""}`}
            >
              “{quote}”
            </p>
          ))}
        </div>

        <h2>Ready to Share Your Story?</h2>
        <p className="subtitle">
          Start writing with blogXpert — powerful, simple, and free.
        </p>

        {/* BUTTON WITH HIGHER Z-INDEX & VISIBILITY */}
        <button
          onClick={() => navigate("/create")}
          className="create-blog-btn"
          style={{ position: "relative", zIndex: 10 }}
        >
          <span>Create Your Blog</span>
          <svg className="arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 13h11.86l-3.63 4.36a1 1 0 001.54 1.28l5-6a1.19 1.19 0 000-1.28l-5-6a1 1 0 00-1.54 1.28L17.86 11H5a1 1 0 000 2z" />
          </svg>
        </button>
      </div>
    </section>
  );
}