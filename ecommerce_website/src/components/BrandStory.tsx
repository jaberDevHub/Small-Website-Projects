import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-light mb-16 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Crafted with
            <br />
            <span className="font-semibold">Intention</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-12 mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is meticulously crafted using premium materials and traditional techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Sustainable</h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to ethical sourcing and environmentally conscious production methods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Timeless Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Designs that transcend trends, becoming cherished pieces in your daily life.
              </p>
            </div>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            "We believe in creating objects that tell stories,
            <br />
            objects that become part of your narrative."
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;