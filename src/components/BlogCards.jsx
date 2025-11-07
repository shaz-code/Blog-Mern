// src/components/BlogCards.jsx
import { useState, useEffect } from "react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import "./BlogCards.css";

export default function BlogCards() {
  const [blogs, setBlogs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // LOAD BLOGS SAFELY
  useEffect(() => {
    try {
      const saved = localStorage.getItem("blogXpertBlogs");
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return;

      // Ensure every blog has an ID
      const validBlogs = parsed
        .filter(blog => blog && typeof blog === "object" && blog.title)
        .map((blog, index) => ({
          ...blog,
          id: blog.id || `fallback-${index}-${Date.now()}`, // GUARANTEED ID
        }))
        .slice(0, 5);

      setBlogs(validBlogs);
      localStorage.setItem("blogXpertBlogs", JSON.stringify(validBlogs)); // Fix old data
    } catch (error) {
      console.error("Failed to load blogs:", error);
      localStorage.removeItem("blogXpertBlogs");
    }
  }, []);

  // DELETE HANDLER
  const handleDelete = (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    if (!blog) return;
    setBlogToDelete(blog);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!blogToDelete) return;

    const updated = blogs.filter(b => b.id !== blogToDelete.id);
    setBlogs(updated);
    localStorage.setItem("blogXpertBlogs", JSON.stringify(updated));
    setShowConfirm(false);
    setBlogToDelete(null);
  };

  // SAFE PREVIEW TEXT
  const safePreview = (content) => {
    if (!content || typeof content !== "string") return "No content...";
    return content
      .replace(/<[^>]*>/g, '')
      .substring(0, 150)
      .trim() + "...";
  };

  if (blogs.length === 0) {
    return (
      <section className="blog-cards-section">
        <div className="empty-state">
          <h3>No blogs yet</h3>
          <p>Create your first blog to see it here!</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blog-cards-section">
        <div className="section-header">
          <h2>Recent Blogs by You</h2>
          <span className="count">{blogs.length}/5</span>
        </div>
        <div className="blog-cards-container">
          {blogs.map((blog) => (
            <article key={blog.id} className="blog-card">
              {blog.coverImage && (
                <div className="card-image">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    onError={(e) => e.target.style.display = "none"}
                  />
                </div>
              )}
              <div className="card-content">
                <h3 className="card-title">{blog.title || "Untitled"}</h3>
                <p className="card-tags">{blog.tags || "No tags"}</p>
                <p className="card-preview-text">{safePreview(blog.content)}</p>
                <div className="card-actions">
                  <button className="read-more">Read More</button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="delete-btn"
                    aria-label="Delete blog"
                  >
                    <svg viewBox="0 0 24 24" className="trash-icon">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {showConfirm && (
        <ConfirmDeleteModal
          blog={blogToDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowConfirm(false);
            setBlogToDelete(null);
          }}
        />
      )}
    </>
  );
}