import { motion } from 'framer-motion';
import { useState } from 'react';

const Products = () => {
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const handleAddToCart = (id: number) => {
    setAddedItems(prev => new Set(prev).add(id));
  };
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
      bg: 'from-slate-900 to-slate-800'
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
      bg: 'from-amber-900 to-amber-800'
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
      bg: 'from-blue-900 to-blue-800'
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
      bg: 'from-gray-900 to-gray-800'
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
      bg: 'from-green-900 to-green-800'
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
      bg: 'from-purple-900 to-purple-800'
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
      bg: 'from-red-900 to-red-800'
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
      bg: 'from-indigo-900 to-indigo-800'
    }
  ];

  return (
    <div>
      {products.map((product, index) => (
        <section
          key={product.id}
          className={`relative h-screen flex items-center justify-center bg-gradient-to-br ${product.bg} overflow-hidden`}
        >
          {/* Product Image - Full Screen */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>

          {/* Product Name - Top */}
          <motion.h2
            className="absolute top-20 left-1/2 transform -translate-x-1/2 text-6xl md:text-8xl font-thin text-white z-10"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {product.name}
          </motion.h2>

          {/* Micro-Stories - Progressive Reveals */}
          <div className="relative z-10 text-white text-center max-w-4xl px-6">
            {/* Material */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-light mb-2">Material</div>
              <div className="text-4xl font-thin">{product.material}</div>
            </motion.div>

            {/* Craft */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-light mb-2">Craft</div>
              <div className="text-4xl font-thin">{product.craft}</div>
            </motion.div>

            {/* Benefit */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-light mb-2">Benefit</div>
              <div className="text-4xl font-thin">{product.benefit}</div>
            </motion.div>

            {/* Usage */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-light mb-2">Usage</div>
              <div className="text-4xl font-thin">{product.usage}</div>
            </motion.div>

            {/* Price - Last */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 3 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl font-light">{product.price}</div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="mb-6 text-lg opacity-80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.2 }}
              viewport={{ once: true }}
            >
              Loved by thousands
            </motion.div>

            {/* Button with Micro-copy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-white text-black px-8 py-4 text-lg font-medium rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(product.id)}
              >
                {addedItems.has(product.id) ? 'Added!' : 'Add to Collection'}
              </motion.button>
              <div className="mt-4 text-sm opacity-70">
                Free returns · 2-year warranty · Secure checkout
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Products;