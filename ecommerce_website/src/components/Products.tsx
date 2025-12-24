import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const products = [
    {
      id: 1,
      name: 'Minimalist Watch',
      price: '$299',
      material: 'Swiss Movement',
      craft: 'Hand-assembled',
      benefit: 'Timeless precision',
      usage: 'Everyday elegance',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      secondaryImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa'
    },
    {
      id: 2,
      name: 'Leather Bag',
      price: '$189',
      material: 'Full-grain leather',
      craft: 'Traditional tanning',
      benefit: 'Ages beautifully',
      usage: 'Professional style',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3'
    },
    {
      id: 3,
      name: 'Ceramic Vase',
      price: '$89',
      material: 'High-fired clay',
      craft: 'Wheel-thrown',
      benefit: 'Naturally elegant',
      usage: 'Modern minimalism',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
    },
  ];

  return (
    <section ref={containerRef} className="relative">
      {products.map((product, index) => {
        const start = index * 0.3;
        const end = start + 0.3;

        const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
        const opacity = useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);

        return (
          <motion.div
            key={product.id}
            className="sticky top-0 h-screen flex items-center justify-center bg-white"
            style={{ y }}
          >
            <motion.div
              className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
              style={{ opacity }}
            >
              {/* Product Image */}
              <div className="relative">
                <motion.div
                  className="aspect-square overflow-hidden bg-gray-100 rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              </div>

              {/* Product Story */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-light mb-4">{product.name}</h2>
                  <div className="space-y-6 text-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Material</h3>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Craft</h3>
                      <p className="text-gray-600">{product.craft}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Benefit</h3>
                      <p className="text-gray-600">{product.benefit}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Usage</h3>
                      <p className="text-gray-600">{product.usage}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="pt-8 border-t border-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl font-light text-gray-900 mb-8">{product.price}</p>
                  <motion.button
                    className="bg-black text-white px-8 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Collection
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default Products;