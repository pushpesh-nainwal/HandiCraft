import React, { useState } from "react";

const themes = {
  sage: {
    name: "Sage Green",
    primary: "#6B8E6E",
    secondary: "#A8C3A0",
    bg: "#FCFCF8",
    card: "#fff",
    accent: "#D97757",
    text: "#2D3A2F",
  },
  terracotta: {
    name: "Terracotta",
    primary: "#C46A3D",
    secondary: "#D89B5B",
    bg: "#FFF9F5",
    card: "#fff",
    accent: "#D89B5B",
    text: "#34261D",
  },
  forest: {
    name: "Forest",
    primary: "#234E3B",
    secondary: "#3d6a55",
    bg: "#F8F7F3",
    card: "#fff",
    accent: "#C79A63",
    text: "#2D2D2D",
  },
  charcoal: {
    name: "Charcoal",
    primary: "#2C2C2C",
    secondary: "#444",
    bg: "#F7F7F7",
    card: "#fff",
    accent: "#B87333",
    text: "#222",
  },
  scandi: {
    name: "Scandinavian",
    primary: "#455A64",
    secondary: "#78909C",
    bg: "#FAFAFA",
    card: "#fff",
    accent: "#D4A373",
    text: "#1E1E1E",
  },
  indigo: {
    name: "Indigo",
    primary: "#3F5C9A",
    secondary: "#6c84b8",
    bg: "#FBFBFA",
    card: "#fff",
    accent: "#D4B483",
    text: "#222",
  },
  olive: {
    name: "Dusty Olive",
    primary: "#697A4E",
    secondary: "#9cad7b",
    bg: "#FAF8F4",
    card: "#fff",
    accent: "#C28C59",
    text: "#222",
  },
  minimal: {
    name: "Minimal",
    primary: "#000",
    secondary: "#666",
    bg: "#fff",
    card: "#fff",
    accent: "#8A5A44",
    text: "#000",
  },
};
const imgs = [
  "https://images.unsplash.com/photo-1513495972909-f0214a5d65d4?w=600",
  "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
];
const products = [
  ["Ceramic Vase", "₹1299"],
  ["Soy Candle", "₹599"],
  ["Woven Basket", "₹899"],
  ["Wooden Bowl", "₹1099"],
];
export default function ThemeDemo() {
  const [t, setT] = useState(themes.sage);
  const s = {
    fontFamily: "Arial,sans-serif",
    background: t.bg,
    color: t.text,
    minHeight: "100vh",
    transition: "0.3s",
  };
  const card = {
    background: t.card,
    border: "1px solid #e6e6e6",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,.08)",
  };
  return (
    <div style={s}>
      <div
        style={{
          background: t.primary,
          color: "#fff",
          padding: "14px 6%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
        }}
      >
        <b>🌿 Handmade Haven</b>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          {["Home", "Shop", "Categories", "About"].map((x) => (
            <span key={x}>{x}</span>
          ))}
          <select
            value={t.name}
            onChange={(e) =>
              setT(Object.values(themes).find((x) => x.name === e.target.value))
            }
            style={{ padding: 8, borderRadius: 8 }}
          >
            {Object.values(themes).map((x) => (
              <option key={x.name}>{x.name}</option>
            ))}
          </select>
        </div>
      </div>

      <section
        style={{
          padding: "60px 6%",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 30,
        }}
      >
        <div>
          <h1 style={{ fontSize: 48 }}>Beautiful Handmade Crafts</h1>
          <p>
            Discover pottery, woven baskets, candles and eco‑friendly decor made
            by talented local artisans.
          </p>
          <button
            style={{
              background: t.accent,
              color: "#fff",
              border: 0,
              padding: "12px 22px",
              borderRadius: 8,
            }}
          >
            Shop Now
          </button>
        </div>
        <img
          src={imgs[0]}
          style={{
            width: "100%",
            borderRadius: 16,
            height: 350,
            objectFit: "cover",
          }}
        />
      </section>

      <section style={{ padding: "20px 6%" }}>
        <h2>Categories</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
          }}
        >
          {["🏺 Pottery", "🕯 Candles", "🧺 Baskets", "🪵 Wooden"].map((c) => (
            <div key={c} style={{ ...card, textAlign: "center" }}>
              <h3>{c}</h3>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 6%" }}>
        <h2>Featured Products</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 18,
          }}
        >
          {products.map((p, i) => (
            <div key={i} style={card}>
              <img
                src={imgs[i % 3]}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <h3>{p[0]}</h3>
              <p>{p[1]}</p>
              <button
                style={{
                  width: "100%",
                  background: t.primary,
                  color: "#fff",
                  border: 0,
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "40px 6%", background: t.secondary + "22" }}>
        <h2>Why Choose Us?</h2>
        <div style={{ display: "flex", gap: 30 }}>
          <div>🌱 Sustainable Materials</div>
          <div>🤝 Fair Trade</div>
          <div>❤️ Handmade with Love</div>
        </div>
      </section>

      <footer
        style={{
          marginTop: 40,
          background: t.primary,
          color: "#fff",
          padding: 30,
          textAlign: "center",
        }}
      >
        Handmade Haven © 2026 • Crafted with Love
      </footer>
    </div>
  );
}
