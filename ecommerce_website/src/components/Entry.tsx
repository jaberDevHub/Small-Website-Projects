import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const Entry = ({ onEnter }: { onEnter: () => void }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
        controls.start({
          scale: 1.1,
          opacity: 0,
          transition: { duration: 1.5, ease: "easeOut" }
        });
        setTimeout(onEnter, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, controls, onEnter]);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 cursor-pointer"
      onClick={() => {
        controls.start({
          scale: 1.1,
          opacity: 0,
          transition: { duration: 1.5, ease: "easeOut" }
        });
        setTimeout(onEnter, 1500);
      }}
      animate={controls}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="w-32 h-32 mx-auto mb-8 border-2 border-white rounded-full flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            borderWidth: [2, 3, 2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span
            className="text-white text-4xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ∞
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-white text-2xl font-light mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Enter Experience
        </motion.h1>

        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Scroll or click to begin
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Entry;