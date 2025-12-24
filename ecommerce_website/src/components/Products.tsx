import { motion } from 'framer-motion';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Minimalist Watch',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      secondaryImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa'
    },
    {
      id: 2,
      name: 'Leather Bag',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      secondaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3'
    },
    {
      id: 3,
      name: 'Ceramic Vase',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      secondaryImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-light text-center mb-20 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Featured Collection
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {products.map(product => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <div className="aspect-square overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.img
                    src={product.secondaryImage}
                    alt={`${product.name} alternate`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                  <p className="text-2xl font-light text-gray-900">{product.price}</p>

                  <motion.button
                    className="mt-6 w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Products;