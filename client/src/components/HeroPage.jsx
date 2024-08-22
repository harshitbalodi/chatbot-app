import './HeroPage.css';
import { motion } from 'framer-motion';
import botIcon from '../assets/bot.png';

const HeroPage = ({ theme, setShowChatWindow }) => {
  return (
    <div className={`hero-section ${theme}`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hero-content"
      >
        <div className="hero-icon-container">
          <img src={botIcon} alt="ChatBud" className="hero-icon" />
        </div>
        <h1>Meet ChatBud: Your AI Buddy</h1>
        <p>
          ChatBud is your AI companion, always here to listen and chat about anything on your mind. Whether you want to vent, share your thoughts, or just have a casual conversation, ChatBud is ready to talk with you, offering a unique and comforting experience.
        </p>
        <button className="hero-button" onClick={() => setShowChatWindow(true)}>Talk to ChatBud</button>
      </motion.div>
    </div>
  );
};

export default HeroPage;
