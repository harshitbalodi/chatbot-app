

const HeroPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to Vite + React Chatbot</h1>
        <p className="text-lg mb-8">
          Discover the power of our cutting-edge chatbot application, built with Vite and React. Engage in seamless conversations, get instant responses, and experience the future of communication.
        </p>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
          Try the Chatbot
        </button>
      </div>
    </div>
  );
};



export default HeroPage;