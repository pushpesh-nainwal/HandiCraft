import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">GreenCraft</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted marketplace for handmade and eco-friendly products. 
              Making sustainable choices easy.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-green-500 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Home Decor" className="text-gray-400 hover:text-green-500 transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=Jewelry" className="text-gray-400 hover:text-green-500 transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=Clothing" className="text-gray-400 hover:text-green-500 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kitchen" className="text-gray-400 hover:text-green-500 transition-colors">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              <a href="mailto:support@greencraft.com" className="hover:text-green-500 transition-colors">
                support@greencraft.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} GreenCraft. All rights reserved.</p>
          <p className="mt-2">Made with 💚 for a sustainable future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
