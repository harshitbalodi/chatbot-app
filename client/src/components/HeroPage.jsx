import { motion } from 'framer-motion';
import './HeroPage.css';

const HeroPage = () => {
  return (
    <div className="hero">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to  Chatbot</h1>
        <p>
          Discover the power of our cutting-edge chatbot application, built with React and Express. Engage in seamless conversations, get instant responses, and experience the future of communication.
        </p>
        <button>Try the Chatbot</button>
      </motion.div>
    </div>
  );
};

export default HeroPage;
