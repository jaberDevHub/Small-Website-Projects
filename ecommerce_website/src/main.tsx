import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Lenis from "lenis";
import App from "./App";
import "./index.css";

const container = document.getElementById("app");

if (!container) throw new Error("Root container missing");

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
