// src/components/HeroSection.jsx
import { useState, useEffect } from "react";
import "./HeroSection.css";

const cardData = [
  {
    img: "https://plus.unsplash.com/premium_vector-1759937688187-79824b8ea26a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRyYXZlbGxpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    title: "WanderLines – Stories Beyond the Map",
    desc: "From kitchen tales to mountain trails — discover personal stories, adventures, and thoughts from creators who live and write with passion.",
  },
  {
    img: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800",
    title: "A Jarvis for everyone: AI agents as new interfaces",
    desc: "AI agents powered by MCP are redefining interfaces, shifting from clicks to intelligent, context-aware conversations.",
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1682306024245-5d6b1bd7148a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcGVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    title: "Why frontend devs should care about platform engineering",
    desc: "Learn how platform engineering helps frontend teams streamline workflows with Backstage, automating builds, documentation, and project management.",
  },
  {
    img: "https://plus.unsplash.com/premium_vector-1723281878397-4ce8a69783cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TGlmZXN0eWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    title: "Read, Reflect, and Rise",
    desc: "Join a community of curious minds sharing insights, opinions, and experiences across lifestyle, travel, sports, and creativity.",
  },
  {
    img: "https://media.istockphoto.com/id/2180709362/vector/processor-with-integration-ai-ai-letters-on-chip-cpu-connected-to-data-storage-artificial.webp?a=1&b=1&s=612x612&w=0&k=20&c=BY0ap5J6W9LLR0-bYVjhqGLRTeh1T4A2vQ2V8RPWeM0=",
    title: "Building AI agents with n8n: A complete guide",
    desc: "Step-by-step tutorial on creating powerful automation workflows using n8n and integrating with LLMs.",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    title: "From prompt to product: Shipping AI features in 48 hours",
    desc: "How small teams are using AI agents to prototype and ship production-ready features faster than ever.",
  },
  {
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    title: "The rise of agentic workflows in product teams",
    desc: "How product managers are using AI agents to automate research, feedback loops, and roadmap planning.",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    title: "AI agents in design systems: The next evolution",
    desc: "Discover how AI is generating components, maintaining design tokens, and enforcing consistency at scale.",
  },
  {
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    title: "When to use AI agents vs traditional APIs",
    desc: "A decision framework for choosing between AI-powered agents and classic REST/GraphQL APIs in your stack.",
  },
  // Add more if needed
];

export default function HeroSection() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const left = document.querySelector(".hero-left");
    const sticky = () => {
      if (window.scrollY > 120) left?.classList.add("sticky");
      else left?.classList.remove("sticky");
    };
    window.addEventListener("scroll", sticky);
    return () => window.removeEventListener("scroll", sticky);
  }, []);

  return (
    <section className="hero-section">
      {/* LEFT – WITH LEFT GAP */}
      <aside className="hero-left">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <nav className="hero-menu">
          <h3>Blog</h3>
          <ul>
            <li className="active">Dev</li>
            <li>Product Management</li>
            <li>UX Design</li>
          </ul>

          <h3>Podcast</h3>
          <ul>
            <li>Product Leadership</li>
          </ul>
        </nav>
      </aside>

      {/* RIGHT – 3×3 GRID */}
      <div className="hero-right">
        <div className="cards-grid">
          {cardData.map((c, i) => (
            <article key={i} className="card">
              <div className="card-img-wrapper">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <h2 className="card-title">{c.title}</h2>
              <p className="card-desc">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}