// src/components/RotatingTagline.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RotatingTagline.css";

const taglines = [
  "Write. Inspire. Grow.",
  "Your story starts here.",
  "Blogging made powerful.",
  "Share your voice today.",
];

export default function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="tagline-section">
      <div className="tagline-wrapper">
        {/* LEFT: Rotating Text */}
        <div className="tagline-text">
          <h1 className="tagline">
            {taglines.map((t, i) => (
              <span
                key={i}
                className={`tagline-item ${i === index ? "active" : ""}`}
              >
                {t}
              </span>
            ))}
          </h1>
        </div>

        {/* RIGHT: Create Button */}
        <button
          onClick={() => navigate("/create")}
          className="create-blog-btn"
        >
          Create a Blog
          <svg className="arrow" viewBox="0 0 24 24">
            <path d="M5 13h11.86l-3.63 4.36a1 1 0 001.54 1.28l5-6a1.19 1.19 0 000-1.28l-5-6a1 1 0 00-1.54 1.28L17.86 11H5a1 1 0 000 2z" />
          </svg>
        </button>
      </div>
    </section>
  );
}