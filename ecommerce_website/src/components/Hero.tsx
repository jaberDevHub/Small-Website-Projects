import { motion } from 'framer-motion';

const Hero = ({ width = 1920, height = 1200 }) => {
  return (
    <section className="relative mx-auto flex items-center justify-center overflow-hidden bg-black pt-20" style={{ height: `${height}px`, maxWidth: `${width}px` }}>
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')] bg-cover bg-center opacity-20"></div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white" style={{ maxWidth: `${width}px` }}>
        {/* Semi-transparent background for better text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-3xl -mx-6"></div>
        <div className="relative z-10 p-8 md:p-12">
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
          className="text-7xl md:text-9xl font-thin mb-8 tracking-tight leading-none drop-shadow-2xl"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.2), 0 0 120px rgba(255,255,255,0.1)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        >
          LUXE
          <br />
          <span className="font-semibold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl"
                style={{
                  textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3), 0 0 120px rgba(255,255,255,0.2)'
                }}>
            MODERN
          </span>
          <br />
          LIVING
        </motion.h1>

        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-light"
          style={{
            textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        >
          <span className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Handcrafted Quality
          </span>
          <span className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Sustainable Materials
          </span>
          <span className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Timeless Design
          </span>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          Discover our curated collection of premium essentials designed for the discerning modern individual.
          Each piece tells a story of craftsmanship, innovation, and enduring elegance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
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
          className="mt-8 mb-16 grid grid-cols-3 gap-4 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
        >
          <motion.div
            className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[140px] flex flex-col justify-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl font-bold mb-3 drop-shadow-lg"
                 style={{
                   textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)'
                 }}>500+</div>
            <div className="text-sm font-medium opacity-95 drop-shadow-md leading-tight"
                 style={{
                   textShadow: '0 0 10px rgba(255,255,255,0.7)'
                 }}>Happy Customers</div>
          </motion.div>

          <motion.div
            className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[140px] flex flex-col justify-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl font-bold mb-3 drop-shadow-lg"
                 style={{
                   textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)'
                 }}>50+</div>
            <div className="text-sm font-medium opacity-95 drop-shadow-md leading-tight"
                 style={{
                   textShadow: '0 0 10px rgba(255,255,255,0.7)'
                 }}>Premium Products</div>
          </motion.div>

          <motion.div
            className="text-center bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl min-h-[140px] flex flex-col justify-center"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-4xl font-bold mb-3 drop-shadow-lg"
                 style={{
                   textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.5)'
                 }}>5★</div>
            <div className="text-sm font-medium opacity-95 drop-shadow-md leading-tight"
                 style={{
                   textShadow: '0 0 10px rgba(255,255,255,0.7)'
                 }}>Average Rating</div>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 bottom-11 left-1/2 transform -translate-x-1/2"
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