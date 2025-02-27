import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from './Navbar';


const API_KEY = "AIzaSyDJCD5gjFScPeqicX7zDSZeco8Mh1o7GfE"; // Replace with your actual API key

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = { user: message, bot: "Typing..." };
    setConversation([...conversation, newMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: message }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

      setConversation((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: reply } : msg
        )
      );
    } catch (error) {
      console.error("API error:", error);
      setConversation((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: "Error fetching response." } : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      {/* Navbar */}
      <Navbar/>
      
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[400px] h-[500px] bg-white shadow-xl rounded-lg flex flex-col">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 text-lg font-semibold text-center rounded-t-lg">
          🌿 AI Career Chatbot
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {conversation.map((msg, index) => (
            <div key={index} className="mb-4">
              <div className="text-right">
                <div className="inline-block bg-green-500 text-white p-3 rounded-lg shadow-md">
                  {msg.user}
                </div>
              </div>
              <div className="text-left mt-2">
                <div className="inline-block bg-gray-200 text-gray-900 p-3 rounded-lg shadow-md">
                  {msg.bot}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 text-black p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={`ml-2 px-4 py-2 rounded-lg ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white`}
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chatbot;
