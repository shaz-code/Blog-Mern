// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RotatingTagline from "./components/RotatingTagline";
import HeroSection from "./components/HeroSection";
import CreateBlogCTA from "./components/CreateBlogCTA";
import BlogCards from "./components/BlogCards"; // ← NOW SAFE
import CreateBlogPage from "./pages/CreateBlogPage";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <main style={{ paddingTop: "90px", flex: 1 }}>
          <RotatingTagline />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <CreateBlogCTA />
                  <BlogCards /> {/* ← SAFE NOW */}
                </>
              }
            />
            <Route path="/create" element={<CreateBlogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}