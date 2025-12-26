import { motion } from 'framer-motion';

const BrandStory = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-white rounded-full"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl px-6">
        {/* Huge Quote */}
        <motion.blockquote
          className="text-6xl md:text-9xl font-thin leading-tight mb-12"
          style={{
            textShadow: '0 0 40px rgba(255,255,255,0.1)'
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Design is not just
          <br />
          what it looks like
          <br />
          and feels like.
          <br />
          <span className="font-light">Design is how it works.</span>
        </motion.blockquote>

        {/* Cite */}
        <motion.cite
          className="text-2xl md:text-3xl opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          viewport={{ once: true }}
        >
          — Steve Jobs
        </motion.cite>
      </div>
    </section>
  );
};

export default BrandStory;