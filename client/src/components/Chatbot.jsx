import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';
import notificationSound from '../assets/notification-sound.mp3';
import botIcon from '../assets/bot.png';
import manIcon from '../assets/man.png';
import womanIcon from '../assets/woman.png';

const Chatbot = ({ theme, showChatWindow, setShowChatWindow }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userGender, setUserGender] = useState(null);
  const chatWindowRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const gender = localStorage.getItem('userGender');
    if (gender) {
      setUserGender(gender);
    }
  }, []);

  useEffect(() => {
    const messagetext = userGender ? 'Hello! How can I assist you today?' : 'Hello! Before we start, please select your gender:';
    if (showChatWindow && chatHistory.length === 0) {
      setChatHistory([{ role: 'assistant', message: messagetext }]);
    }
  }, [showChatWindow]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newUserMessage = { role: 'user', message };
      setChatHistory((prev) => [...prev, newUserMessage]);

      try {
        const res = await axios.post('http://localhost:3000/api/chat', { message });
        const newBotMessage = { role: 'assistant', message: res.data.response };
        setChatHistory((prev) => [...prev, newBotMessage]);
        playNotificationSound();
      } catch (err) {
        console.error(err);
        const errorBotMessage = { role: 'assistant', message: 'Oops, something went wrong!' };
        setChatHistory((prev) => [...prev, errorBotMessage]);
      }

      setMessage('');
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  const handleGenderSelection = (gender) => {
    setUserGender(gender);
    localStorage.setItem('userGender', gender);
    setChatHistory((prev) => [
      ...prev,
      { role: 'user', message: `I am a ${gender}.` },
      { role: 'assistant', message: `Great! How can I assist you today?` }
    ]);
  };

  return (
    <div>
      <AnimatePresence>
        {showChatWindow && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            ref={chatWindowRef}
          >
            <div className="chat-messages">
              {chatHistory.map((message, index) => (
                <motion.div
                  key={index}
                  className={`chat-bubble ${message.role}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  ref={index === chatHistory.length - 1 ? lastMessageRef : null}
                >
                  <div className="chat-bubble-content">
                    {message.role === 'assistant' && <img src={botIcon} alt="bot" className="chat-avatar" />}
                    <p>{message.message}</p>
                    {message.role === 'user' && <img src={userGender === 'man' ? manIcon : womanIcon} alt="user" className="chat-avatar" />}
                  </div>
                </motion.div>
              ))}
              {chatHistory.length === 1 && !userGender && (
                <div className="gender-selection">
                  <div className="gender-option" onClick={() => handleGenderSelection('man')}>
                    <img src={manIcon} alt="man" className="gender-icon" />
                    <p>Man</p>
                  </div>
                  <div className="gender-option" onClick={() => handleGenderSelection('woman')}>
                    <img src={womanIcon} alt="woman" className="gender-icon" />
                    <p>Woman</p>
                  </div>
                </div>
              )}
            </div>

            {userGender && (
              <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-button"
        onClick={() => setShowChatWindow(!showChatWindow)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <img src={botIcon} alt="chatbot" />
      </motion.button>
    </div>
  );
};

export default Chatbot;
