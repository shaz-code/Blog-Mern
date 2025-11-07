// src/pages/CreateBlogPage.jsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // ← ADD THIS
import "./CreateBlogPage.css";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // ← ADD THIS

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start writing your masterpiece..." }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-editor-content",
      },
    },
  });

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  // FIXED PUBLISH
  const handlePublish = () => {
    
    if (!title.trim() || !editor?.getText().trim()) {
      alert("Title and content are required!");
      return;
    }

    const content = editor.getHTML();
    // In handlePublish
const newBlog = {
  id: Date.now(), // ← THIS MUST BE HERE
  title: title.trim() || "Untitled Blog",
  tags: tags.trim(),
  coverImage,
  content: content || "<p>No content</p>",
  fullContent: content,
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
};

    // Save to persistent storage
const existing = JSON.parse(localStorage.getItem("blogXpertBlogs") || "[]");
const updated = [newBlog, ...existing].slice(0, 5);
localStorage.setItem("blogXpertBlogs", JSON.stringify(updated));
    // Success + redirect
    alert("Blog published! Taking you to your dashboard...");
    
    // Reset form
    setTitle("");
    setTags("");
    setCoverImage("");
    editor?.commands.clearContent();

    // GO HOME TO SEE THE CARD
    navigate("/");
  };

  return (
    <div className="create-blog-page">
      <div className="editor-card">
        <div className="editor-header">
          <h1>Create Your Blog</h1>
          <p>Craft your story with style and precision</p>
        </div>

        <input
          type="text"
          placeholder="Enter a captivating title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <div
          className={`cover-upload-zone ${isDragging ? "dragging" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />

          {coverImage ? (
            <img src={coverImage} alt="Cover" className="cover-preview" />
          ) : (
            <div className="upload-placeholder">
              <svg className="upload-icon" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
              <p>Drop image here or click to upload</p>
              <span>Supports JPG, PNG, WebP</span>
            </div>
          )}
        </div>

        <div className="editor-wrapper">
          <EditorContent editor={editor} />
        </div>

        <div className="meta-row">
          <input
            type="text"
            placeholder="Tags (e.g. tech, ai, design)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="tags-input"
          />
          <button onClick={handlePublish} className="publish-btn">
            <span>Publish Blog</span>
            <svg className="publish-icon" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,8L17,12L12,16L12,13H7V11H12V8Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}