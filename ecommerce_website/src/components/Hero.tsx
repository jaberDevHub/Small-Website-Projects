import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')] bg-cover bg-center"></div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            ✨ New Collection Available
          </span>
        </motion.div>

        <motion.h1
          className="text-7xl md:text-9xl font-thin mb-8 tracking-tight leading-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        >
          LUXE
          <br />
          <span className="font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            MODERN
          </span>
          <br />
          LIVING
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Handcrafted Quality
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Sustainable Materials
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Timeless Design
          </span>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl font-light mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          Discover our curated collection of premium essentials designed for the discerning modern individual.
          Each piece tells a story of craftsmanship, innovation, and enduring elegance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
        >
          <motion.button
            className="group bg-white text-black px-10 py-5 text-lg font-semibold hover:bg-gray-50 transition-all duration-300 rounded-full shadow-2xl hover:shadow-white/25"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              Explore Collection
              <motion.span
                className="text-xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            className="border-2 border-white/30 text-white px-10 py-5 text-lg font-medium hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Story
          </motion.button>
        </motion.div>

        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-sm font-light opacity-80">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-sm font-light opacity-80">Premium Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">5★</div>
            <div className="text-sm font-light opacity-80">Average Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;