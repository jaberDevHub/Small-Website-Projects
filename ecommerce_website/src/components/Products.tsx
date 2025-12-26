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
      bg: 'from-slate-900 to-slate-800',
      nameAlign: 'text-left',
      contentAlign: 'text-left',
      priceAlign: 'text-right',
      buttonAlign: 'justify-start'
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
      bg: 'from-amber-900 to-amber-800',
      nameAlign: 'text-right',
      contentAlign: 'text-right',
      priceAlign: 'text-left',
      buttonAlign: 'justify-end'
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
      bg: 'from-blue-900 to-blue-800',
      nameAlign: 'text-center',
      contentAlign: 'text-center',
      priceAlign: 'text-center',
      buttonAlign: 'justify-center'
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
      bg: 'from-gray-900 to-gray-800',
      nameAlign: 'text-left',
      contentAlign: 'text-left',
      priceAlign: 'text-right',
      buttonAlign: 'justify-start'
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
      bg: 'from-green-900 to-green-800',
      nameAlign: 'text-right',
      contentAlign: 'text-right',
      priceAlign: 'text-left',
      buttonAlign: 'justify-end'
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
      bg: 'from-purple-900 to-purple-800',
      nameAlign: 'text-center',
      contentAlign: 'text-center',
      priceAlign: 'text-center',
      buttonAlign: 'justify-center'
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
      bg: 'from-red-900 to-red-800',
      nameAlign: 'text-left',
      contentAlign: 'text-left',
      priceAlign: 'text-right',
      buttonAlign: 'justify-start'
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
      bg: 'from-indigo-900 to-indigo-800',
      nameAlign: 'text-right',
      contentAlign: 'text-right',
      priceAlign: 'text-left',
      buttonAlign: 'justify-end'
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
            <div className="absolute inset-0 bg-black/30"></div>
          </motion.div>

          {/* Product Name - Varied positioning */}
          <motion.h2
            className={`absolute top-20 left-1/2 transform -translate-x-1/2 ${product.nameAlign} text-5xl md:text-7xl font-thin tracking-widest text-white opacity-80 z-10`}
            initial={{ opacity: 0, y: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {product.name}
          </motion.h2>

          {/* Micro-Stories - Varied alignments and motions */}
          <div className={`relative z-10 text-white ${product.contentAlign} max-w-4xl px-6`}>
            {/* Material */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-lg font-light mb-4 opacity-70 tracking-wider">Material</div>
              <div className="text-5xl font-thin leading-tight">{product.material}</div>
            </motion.div>

            {/* Craft */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="text-lg font-light mb-4 opacity-70 tracking-wider">Craft</div>
              <div className="text-5xl font-thin leading-tight">{product.craft}</div>
            </motion.div>

            {/* Benefit */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <div className="text-lg font-light mb-4 opacity-70 tracking-wider">Benefit</div>
              <div className="text-5xl font-thin leading-tight">{product.benefit}</div>
            </motion.div>

            {/* Usage */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0 }}
              viewport={{ once: true }}
            >
              <div className="text-lg font-light mb-4 opacity-70 tracking-wider">Usage</div>
              <div className="text-5xl font-thin leading-tight">{product.usage}</div>
            </motion.div>

            {/* Price - Varied alignment */}
            <motion.div
              className={`mb-12 ${product.priceAlign}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 2.4 }}
              viewport={{ once: true }}
            >
              <div className="text-7xl font-thin text-white/90">{product.price}</div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className={`mb-8 ${product.contentAlign} text-lg opacity-60`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
              viewport={{ once: true }}
            >
              Loved by thousands
            </motion.div>

            {/* Button with Micro-copy - Varied alignment */}
            <motion.div
              className={`mb-8 flex ${product.buttonAlign}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg font-light rounded-full hover:bg-white/20 transition-all duration-500 shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAddToCart(product.id)}
              >
                {addedItems.has(product.id) ? 'Added' : 'Add to Collection'}
              </motion.button>
            </motion.div>
            <motion.div
              className={`${product.contentAlign} text-sm opacity-50 mt-4`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3.0 }}
              viewport={{ once: true }}
            >
              Free returns · 2-year warranty · Secure checkout
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Products;