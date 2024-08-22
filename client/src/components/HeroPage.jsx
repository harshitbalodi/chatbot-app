import './HeroPage.css';
import { motion } from 'framer-motion';

const HeroPage = ({ theme, setShowChatWindow }) => {
  return (
    <div className={`hero-section ${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-content"
      >
        <h1>Welcome to our Chatbot</h1>
        <p>
          Discover the power of our cutting-edge chatbot application, built with React and Express. Engage in seamless conversations, get instant responses, and experience the future of communication.
        </p>
        <button className="hero-button" onClick={() => setShowChatWindow(true)}>Try the Chatbot</button>
      </motion.div>
    </div>
  );
};

export default HeroPage;
