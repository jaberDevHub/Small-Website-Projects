import { motion } from 'framer-motion';

const Hero = ({ width = 1920, height = 760 }) => {
  return (
    <section className="relative mx-auto flex items-center justify-center overflow-hidden bg-black" style={{ height: `${height}px`, maxWidth: `${width}px` }}>
      {/* Product Image as Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1523275335684-37898b6baf30')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white" style={{ maxWidth: `${width}px` }}>
        {/* Brand Logo */}
        <motion.div
          className="flex items-center justify-center space-x-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-bold">LUXE</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-6xl md:text-8xl font-thin mb-4 tracking-tight leading-none"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.2), 0 0 120px rgba(255,255,255,0.1)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
        >
          Modern living, refined.
        </motion.h1>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;