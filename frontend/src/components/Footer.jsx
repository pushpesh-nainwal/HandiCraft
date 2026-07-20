import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="bg-[#F7F8F3] border-t border-[#E4E9E2]"
      style={{ fontFamily: "'Work Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="inline-flex bg-white rounded-2xl p-3 shadow-md border border-[#E4E9E2] mb-5">
              <img
                src={logo}
                alt="HandiCraft Logo"
                className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <p className="text-[#5C6F5D] leading-7 text-[15px]">
              Discover authentic handmade treasures crafted by talented
              artisans. Every purchase celebrates creativity, tradition, and
              sustainable craftsmanship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xl text-[#2D3A2F] mb-5"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/products"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="text-xl text-[#2D3A2F] mb-5"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Categories
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?category=Home Decor"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Home Decor
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Jewelry"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Jewelry
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Clothing"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Clothing
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Kitchen"
                  className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
                >
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3
              className="text-xl text-[#2D3A2F] mb-5"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Connect With Us
            </h3>

            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-[#E4E9E2] flex items-center justify-center text-[#6B8E6E] hover:bg-[#6B8E6E] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-[#E4E9E2] flex items-center justify-center text-[#6B8E6E] hover:bg-[#6B8E6E] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-[#E4E9E2] flex items-center justify-center text-[#6B8E6E] hover:bg-[#6B8E6E] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-[#E4E9E2] flex items-center justify-center text-[#6B8E6E] hover:bg-[#6B8E6E] hover:text-white transition-all duration-300 shadow-sm"
              >
                <Mail size={18} />
              </a>
            </div>

            <a
              href="mailto:support@handicraft.com"
              className="text-[#5C6F5D] hover:text-[#D97757] transition-colors"
            >
              support@handicraft.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#E4E9E2] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#5C6F5D] text-sm">
            © {new Date().getFullYear()} HandiCraft. All rights reserved.
          </p>

          <p className="text-[#6B8E6E] text-sm">
            Crafted with ❤️ for artisans around the world.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
