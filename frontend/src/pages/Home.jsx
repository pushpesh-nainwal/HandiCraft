import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.png";
import HeroTextBlock from "../components/HeroTextblock";
import {
  Leaf,
  ArrowRight,
  Shield,
  Star,
  Gift,
  SmilePlus,
  Sparkles,
  Heart,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Smile,
} from "lucide-react";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getImageUrl = (image) => {
    if (typeof image === 'string') return image;
    if (image?.url) return image.url;
    // Handle malformed object with numeric keys
    if (typeof image === 'object' && image !== null) {
      const values = Object.values(image).filter(v => typeof v === 'string' && v.length === 1);
      if (values.length > 0) return values.join('');
    }
    return null;
  };

  const slides = [
    {
      image: slider1,

      script: "Handmade",

      heading: "JEWELRY",

      subtitle: "Crafted by hands, inspired by tradition.",

      features: [
        {
          icon: HeartHandshake,
          label: "Handmade\nwith love",
        },
        {
          icon: Leaf,
          label: "Natural\nmaterials",
        },
        {
          icon: Star,
          label: "Unique\ndesigns",
        },
      ],

      buttonText: "Shop Collection",

      buttonLink: "/products",
    },

    {
      image: slider2,

      script: "Thoughtful",

      heading: "GIFTS",

      subtitle: "Meaningful handcrafted gifts for every celebration.",

      features: [
        {
          icon: Gift,
          label: "Perfect\nfor everyone",
        },
        {
          icon: Heart,
          label: "Made\nwith care",
        },
        {
          icon: Star,
          label: "One of\na kind",
        },
      ],

      buttonText: "Explore Gifts",

      buttonLink: "/products",
    },

    {
      image: slider3,

      script: "Natural",

      heading: "HOME",

      subtitle: "Decor your home with handmade elegance.",

      features: [
        {
          icon: Leaf,
          label: "Eco\nfriendly",
        },
        {
          icon: SmilePlus,
          label: "Home\nDecor",
        },
        {
          icon: Sparkles,
          label: "Premium\nQuality",
        },
      ],

      buttonText: "Shop Decor",

      buttonLink: "/products",
    },
  ];

  // Load the display + body typefaces once, on mount
  useEffect(() => {
    const id = "artisan-theme-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get("/products?limit=6");
      setFeaturedProducts(response.data.products.slice(0, 6));
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#FAF3E8]"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      {/* Hero Slider */}
      <section className="relative h-[70vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1F17]/85 via-[#2A1F17]/35 to-[#2A1F17]/10"></div>

            <div className="relative z-20 h-full flex items-center">
              <div className="max-w-7xl mx-auto w-full px-6 lg:px-10">
                <HeroTextBlock
                  script={slide.script}
                  heading={slide.heading}
                  subtitle={slide.subtitle}
                  features={slide.features}
                  buttonText={slide.buttonText}
                  buttonLink={slide.buttonLink}
                />
              </div>
            </div>
          </div>
        ))}

        {/* Left Button */}
        <button
          onClick={() =>
            setCurrentSlide((prev) =>
              prev === 0 ? slides.length - 1 : prev - 1,
            )
          }
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-[#FAF3E8]/20 hover:bg-[#FAF3E8]/40 backdrop-blur p-3 rounded-full transition"
        >
          <ChevronLeft className="text-[#FAF3E8] h-8 w-8" />
        </button>

        {/* Right Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-[#FAF3E8]/20 hover:bg-[#FAF3E8]/40 backdrop-blur p-3 rounded-full transition"
        >
          <ChevronRight className="text-[#FAF3E8] h-8 w-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all ${
                currentSlide === index
                  ? "bg-[#B5622C] w-8 h-3"
                  : "bg-[#FAF3E8]/60 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stitch divider — a small nod to handmade textile work */}
      <div className="relative h-6 bg-[#FAF3E8] overflow-hidden">
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-11/12 max-w-6xl"
          height="2"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="1"
            x2="100"
            y2="1"
            stroke="#D8C5A8"
            strokeWidth="1"
            strokeDasharray="3,3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-[#FAF3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-[#7C8B65]/15 p-4 rounded-full">
                  <Leaf className="h-8 w-8 text-[#7C8B65]" />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-[#3C2E22]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                100% Eco-Friendly
              </h3>
              <p className="text-[#7A6A58]">
                All products are made from sustainable materials and processes
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-[#B5622C]/12 p-4 rounded-full">
                  <Heart className="h-8 w-8 text-[#B5622C]" />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-[#3C2E22]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Handmade with Love
              </h3>
              <p className="text-[#7A6A58]">
                Each product is carefully crafted by skilled artisans
              </p>
            </div>
            <div className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-[#7C8B65]/15 p-4 rounded-full">
                  <Shield className="h-8 w-8 text-[#7C8B65]" />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-2 text-[#3C2E22]"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Quality Assured
              </h3>
              <p className="text-[#7A6A58]">
                We verify every seller to ensure the highest quality standards
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-[#F3E9DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#3C2E22] mb-4"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Featured Products
            </h2>
            <p className="text-[#7A6A58] text-lg">
              Discover our most popular eco-friendly items
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#B5622C] border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="bg-[#FFFDF9] rounded-xl border border-[#E4D6C1] overflow-hidden hover:shadow-xl hover:shadow-[#3C2E22]/10 transition-shadow group"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(product.images[0]) || "https://via.placeholder.com/400x300?text=No+Image"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hang-tag style badge */}
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#7C8B65] text-[#FAF3E8] pl-3 pr-2 py-1 rounded-r-md rounded-l-sm text-xs font-medium shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FAF3E8]/80"></span>
                      {product.ecoBadge}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-lg font-semibold text-[#3C2E22] mb-2 line-clamp-1"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-[#7A6A58] text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-semibold text-[#B5622C]"
                        style={{ fontFamily: "'Fraunces', serif" }}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-[#7A6A58]">
                        by {product.sellerName}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-[#B5622C] text-[#FAF3E8] px-8 py-3 rounded-full font-medium hover:bg-[#9A4E1F] transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3C2E22] text-[#FAF3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-semibold mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Join Our Sustainable Community
          </h2>
          <p className="text-xl mb-8 text-[#D8C5A8]">
            Start shopping eco-friendly products today and make a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-[#FAF3E8] text-[#3C2E22] px-8 py-4 rounded-full font-medium hover:bg-[#F3E9DA] transition-colors text-lg"
            >
              Browse Products
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center bg-transparent text-[#FAF3E8] px-8 py-4 rounded-full font-medium hover:bg-[#FAF3E8]/10 transition-colors text-lg border-2 border-[#FAF3E8]/60"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
