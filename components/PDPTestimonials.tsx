"use client";
import { motion } from "framer-motion";

const Testimonials = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-2 md:gap-8">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="bg-secondary p-6 rounded-lg"
          >
            <p className="text-primary/80 mb-4">
              The Cosmic Watch X1 has revolutionized my interstellar travel. I
              never miss a meeting, even across different time zones and
              dimensions!
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full mr-4" />
              <div>
                <div className="font-semibold">Zorp Bleep Bloop</div>
                <div className="text-sm text-gray-400">Andromeda Galaxy</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
