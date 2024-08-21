import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';
import notificationSound from '../assets/notification-sound.mp3';
import botIcon from '../assets/bot.png';
import manIcon from '../assets/man.png';

const Chatbot = () => {
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (showChatWindow) {
      setChatHistory([{ role: 'assistant', message: 'Hello! How can I assist you today?' }]);
    }
  }, [showChatWindow]);

  useEffect(() => {
    if (showChatWindow && chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory, showChatWindow]);

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
                >
                  <div className="chat-bubble-content">
                    <img
                      src={message.role === 'user' ? manIcon : botIcon}
                      alt={`${message.role} avatar`}
                      className="chat-avatar"
                    />
                    <p>{message.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
       <img className="chat-avatar" src={botIcon} alt="" />
      </motion.button>
    </div>
  );
};

export default Chatbot;


