import { useEffect } from "react";
import {
  HeartHandshake,
  Gift,
  Heart,
  SmilePlus,
  Sparkles,
  Leaf,
  Star,
} from "lucide-react";

/**
 * Recreates the text styling from the "Handmade JEWELRY" slide:
 * - Script accent word ("Handmade") in sage green
 * - Large serif heading ("JEWELRY") in deep brown, wide letter-spacing
 * - Small letter-spaced subtitle in muted olive
 * - Divider line with a center diamond
 * - Three-icon feature row with vertical dividers
 * - Dark green rectangular CTA button
 *
 * Usage:
 * <HeroTextBlock
 *   script="Handmade"
 *   heading="JEWELRY"
 *   subtitle="Crafted by hands, inspired by tradition"
 *   features={[
 *     { icon: HandHeart, label: 'Handmade\nwith love' },
 *     { icon: Leaf, label: 'Natural\nmaterials' },
 *     { icon: Star, label: 'Unique\ndesigns' },
 *   ]}
 *   buttonText="Shop the collection"
 *   buttonLink="/products"
 * />
 */
const HeroTextBlock = ({
  script = "Handmade",
  heading = "JEWELRY",
  subtitle = "Crafted by hands, inspired by tradition",
  features = [
    { icon: HeartHandshake, label: "Handmade\nwith love" },
    { icon: Leaf, label: "Natural\nmaterials" },
    { icon: Star, label: "Unique\ndesigns" },
  ],
  buttonText = "Shop the collection",
  buttonLink = "/products",
}) => {
  // Loads the two fonts used on the original slide image
  useEffect(() => {
    const id = "hero-text-block-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:wght@600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="text-center px-6 max-w-2xl mx-auto">
      {/* Script accent word */}
      <p
        className="text-4xl md:text-5xl mb-1 text-[#5B7553]"
        style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
      >
        {script}
      </p>

      {/* Big serif heading */}
      <h1
        className="text-5xl md:text-6xl font-bold text-[#5B3A29] tracking-[0.12em] mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {heading}
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-[#6B6350] tracking-wide mb-4">
        {subtitle}
      </p>

      {/* Divider with center diamond */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="h-px w-16 bg-[#B8AD93]" />
        <span className="h-2 w-2 rotate-45 bg-[#8A9A6E]" />
        <span className="h-px w-16 bg-[#B8AD93]" />
      </div>

      {/* Feature row */}
      <div className="flex items-start justify-center gap-6 md:gap-10 mb-10">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="flex items-center gap-6 md:gap-10">
              {i > 0 && (
                <span className="h-10 w-px bg-[#C9BFA5] hidden sm:block" />
              )}
              <div className="flex flex-col items-center gap-2 w-24">
                <Icon className="h-6 w-6 text-[#5B3A29]" strokeWidth={1.5} />
                <p className="text-xs font-semibold tracking-wide text-[#5B3A29] uppercase leading-snug whitespace-pre-line">
                  {feature.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA button */}
      <a
        href={buttonLink}
        className="inline-block bg-[#3F5233] hover:bg-[#334228] text-white text-sm font-semibold tracking-[0.15em] uppercase px-10 py-4 transition-colors"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default HeroTextBlock;
