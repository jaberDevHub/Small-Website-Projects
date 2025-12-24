import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-gray-300 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gray-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-gray-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 bg-black text-white text-sm font-medium rounded-full mb-6">
              Our Philosophy
            </span>
            <h2 className="text-5xl md:text-7xl font-thin mb-8 tracking-tight leading-tight">
              Beyond
              <br />
              <span className="font-semibold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're not just selling items—we're curating experiences that enrich your life,
              one thoughtfully designed piece at a time.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-black mb-2">15+</div>
              <div className="text-sm text-gray-600 font-medium">Years of Craftsmanship</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-black mb-2">50K+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-sm text-gray-600 font-medium">Sustainable Materials</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Customer Support</div>
            </div>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-12 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Purpose-Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Every design decision serves a purpose. From material selection to ergonomic considerations,
                we ensure each piece enhances your daily life in meaningful ways.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Planet Conscious</h3>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to sustainability goes beyond materials. We partner with ethical suppliers,
                minimize waste, and ensure our production processes respect our planet.
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">💎</span>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Timeless Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                We create pieces that become heirlooms. Built to last generations,
                our products maintain their beauty and functionality through years of use.
              </p>
            </motion.div>
          </motion.div>

          {/* Quote Section */}
          <motion.div
            className="text-center bg-gradient-to-r from-black to-gray-900 rounded-3xl p-12 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-8">
              "Design is not just what it looks like and feels like.
              <br />
              Design is how it works."
            </blockquote>
            <cite className="text-lg opacity-80">— Steve Jobs</cite>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-semibold mb-6">Ready to Experience LUXE?</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of customers who have discovered the difference that thoughtful design makes.
            </p>
            <motion.button
              className="bg-black text-white px-10 py-4 text-lg font-medium rounded-full hover:bg-gray-800 transition-colors duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;