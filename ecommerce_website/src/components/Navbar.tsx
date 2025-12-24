import { motion } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              LUXE
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#home"
              className="text-gray-700 hover:text-black font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a
              href="#collection"
              className="text-gray-700 hover:text-black font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Collection
            </motion.a>
            <motion.a
              href="#about"
              className="text-gray-700 hover:text-black font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="text-gray-700 hover:text-black font-medium transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Contact
            </motion.a>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              className="relative p-2 text-gray-700 hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </motion.button>

            <motion.button
              className="p-2 text-gray-700 hover:text-black transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            <motion.button
              className="md:hidden p-2 text-gray-700 hover:text-black transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="py-4 space-y-4">
            <a href="#home" className="block text-gray-700 hover:text-black font-medium transition-colors duration-300">Home</a>
            <a href="#collection" className="block text-gray-700 hover:text-black font-medium transition-colors duration-300">Collection</a>
            <a href="#about" className="block text-gray-700 hover:text-black font-medium transition-colors duration-300">About</a>
            <a href="#contact" className="block text-gray-700 hover:text-black font-medium transition-colors duration-300">Contact</a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;