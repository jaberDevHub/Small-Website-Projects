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
      secondaryImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa',
      layout: 'left' as const
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
      secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
      layout: 'right' as const
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
      secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      layout: 'center' as const
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      price: '$249',
      material: 'Premium aluminum',
      craft: 'Precision engineering',
      benefit: 'Immersive sound',
      usage: 'Music & calls',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      secondaryImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944',
      layout: 'left' as const
    },
    {
      id: 5,
      name: 'Designer Sunglasses',
      price: '$159',
      material: 'Italian acetate',
      craft: 'Hand-polished lenses',
      benefit: 'UV protection',
      usage: 'Style & function',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f',
      secondaryImage: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
      layout: 'right' as const
    },
    {
      id: 6,
      name: 'Smart Home Hub',
      price: '$199',
      material: 'Matte aluminum',
      craft: 'IoT integration',
      benefit: 'Voice control',
      usage: 'Home automation',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      secondaryImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13',
      layout: 'center' as const
    },
    {
      id: 7,
      name: 'Portable Coffee Maker',
      price: '$129',
      material: 'Borosilicate glass',
      craft: 'Thermal engineering',
      benefit: 'Perfect brew',
      usage: 'On-the-go',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      secondaryImage: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff',
      layout: 'left' as const
    },
    {
      id: 8,
      name: 'Wireless Charger',
      price: '$79',
      material: 'Soft silicone',
      craft: 'Fast charging tech',
      benefit: '15W power delivery',
      usage: 'Cable-free charging',
      image: 'https://images.unsplash.com/photo-1609592806500-3e27a7b0b5a3',
      secondaryImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07',
      layout: 'right' as const
    }
  ];

  return (
    <section ref={containerRef} className="relative">
      {products.map((product, index) => {
        const start = index * 0.25;
        const end = start + 0.25;

        const y = useTransform(scrollYProgress, [start, end], ['100vh', '0vh']);
        const opacity = useTransform(scrollYProgress, [start, start + 0.1], [0, 1]);
        const rotate = useTransform(scrollYProgress, [start, end], [5, 0]);

        // Alternate background colors for variety
        const bgColors = ['bg-white', 'bg-gray-50', 'bg-gradient-to-br from-blue-50 to-indigo-100', 'bg-gradient-to-br from-purple-50 to-pink-100'];
        const bgColor = bgColors[index % bgColors.length];

        if (product.layout === 'center') {
          return (
            <motion.div
              key={product.id}
              className={`sticky top-0 min-h-screen flex items-center justify-center ${bgColor} py-20`}
              style={{ y }}
            >
              <motion.div
                className="container mx-auto px-6 max-w-4xl text-center"
                style={{ opacity, rotate }}
              >
                {/* Centered Layout */}
                <motion.div
                  className="mb-12"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-80 h-80 mx-auto object-cover rounded-2xl shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl font-light mb-6">{product.name}</h2>
                  <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">Material</h3>
                      <p className="text-gray-600">{product.material}</p>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">Craft</h3>
                      <p className="text-gray-600">{product.craft}</p>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">Benefit</h3>
                      <p className="text-gray-600">{product.benefit}</p>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-2">Usage</h3>
                      <p className="text-gray-600">{product.usage}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <p className="text-4xl font-light text-gray-900 mb-8">{product.price}</p>
                  <motion.button
                    className="bg-black text-white px-10 py-4 text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Collection
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        }

        // Left or Right layout
        const isLeft = product.layout === 'left';
        return (
          <motion.div
            key={product.id}
            className={`sticky top-0 min-h-screen flex items-center ${bgColor} py-20`}
            style={{ y }}
          >
            <motion.div
              className={`container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center ${isLeft ? '' : 'lg:grid-flow-col-dense'}`}
              style={{ opacity }}
            >
              {/* Product Image */}
              <motion.div
                className={`relative ${isLeft ? 'order-1' : 'order-2'}`}
                initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <motion.div
                    className="aspect-square overflow-hidden bg-gray-100 rounded-2xl shadow-2xl"
                    whileHover={{ rotate: isLeft ? -5 : 5 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.img
                      src={product.secondaryImage}
                      alt={`${product.name} alternate`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>

                  {/* Floating elements for variety */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </div>
              </motion.div>

              {/* Product Story */}
              <motion.div
                className={`space-y-8 ${isLeft ? 'order-2' : 'order-1'}`}
                initial={{ x: isLeft ? 100 : -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div>
                  <motion.h2
                    className="text-5xl font-light mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {product.name}
                  </motion.h2>

                  <motion.div
                    className="space-y-6 text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900">Material</h3>
                      <p className="text-gray-600">{product.material}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900">Craft</h3>
                      <p className="text-gray-600">{product.craft}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900">Benefit</h3>
                      <p className="text-gray-600">{product.benefit}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900">Usage</h3>
                      <p className="text-gray-600">{product.usage}</p>
                    </motion.div>
                  </motion.div>
                </div>

                <motion.div
                  className="pt-8 border-t border-gray-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-4xl font-light text-gray-900 mb-8"
                    animate={{
                      color: ['#000', '#666', '#000']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {product.price}
                  </motion.p>
                  <motion.button
                    className="bg-black text-white px-8 py-4 text-lg font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      backgroundColor: "#333"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Collection
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default Products;