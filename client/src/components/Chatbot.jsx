import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatWindowRef = useRef(null);
  
    useEffect(() => {
      if (showChatWindow) {
        chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
      }
    }, [chatHistory, showChatWindow]);
  
    const handleInputChange = (e) => {
      setMessage(e.target.value);
    };
  
    const handleSendMessage = async () => {
      try {
        const res = await axios.post('http://localhost:3000/api/chat', { message });
        const newChatHistory = [...chatHistory, { role: 'user', message }, { role: 'assistant', message: res.data.response }];
        setChatHistory(newChatHistory);
        setMessage('');
      } catch (err) {
        console.error(err);
        const newChatHistory = [...chatHistory, { role: 'user', message }, { role: 'assistant', message: 'Oops, something went wrong!' }];
        setChatHistory(newChatHistory);
        setMessage('');
      }
    };
  
    return (
      <div>
        <AnimatePresence>
          {showChatWindow && (
            <motion.div
              className="fixed bottom-20 right-4 bg-white p-4 rounded-lg shadow w-80 h-96 overflow-y-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              ref={chatWindowRef}
            >
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Chatbot</h2>
                <div className="space-y-2">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-gray-200 self-end' : 'bg-blue-500 text-white self-start'}`}
                    >
                      <p>{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
  
        <motion.button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setShowChatWindow(!showChatWindow)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenOdd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.042l.034-.020 8.222-4.443a4.5 4.5 0 001.285-6.494l-1.97-3.393a.75.75 0 00-1.297.75l1.970 3.393a3 3 0 01-.850 4.137l-8.222 4.443a.75.75 0 01-.568.107h-.003c-.234-.044-.426-.24-.426-.476a2.25 2.25 0 012.25-2.25c1.318 0 2.4.978 2.57 2.25H21a.75.75 0 010 1.5H15.934c-.166 1.2-.954 2.25-2.178 2.25a2.25 2.25 0 01-1.904-1.048l-8.332-4.5a1.875 1.875 0 01-.534-2.591L6.484 4.869a1.875 1.875 0 012.258-.928l1.99.5a1.875 1.875 0 112.212 2.212l-.5 1.99a1.875 1.875 0 01-2.591.534l-2.99-2.99a.75.75 0 00-1.06 1.06l2.99 2.99a3.37 3.37 0 004.628-.772l.5-1.99a3.375 3.375 0 00-3.949-3.95l-1.99.5a3.375 3.375 0 00-2.591 4.55l3.413 5.905z" clipRule="evenOdd" />
          </svg>
        </motion.button>
      </div>
    );
  };

  export default Chatbot;
  