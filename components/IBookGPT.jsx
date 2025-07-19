"use client";

import { useEffect, useState } from "react";
import {
  FaLightbulb,
  FaBook,
  FaStickyNote,
  FaExclamationCircle,
  FaMagic,
  FaPenNib,
  FaVideo,
  FaPaperPlane,
} from "react-icons/fa";
import { Message, TypingLoader } from "./specific/IBookGPT";

export default function IBookGPT() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const bookId = "biology-ch-1"; // Can be dynamic later

  // 🧠 Dummy message array for both user and AI
  useEffect(() => {
    setMessages([
      { type: "user", text: "What is photosynthesis?" },
      {
        type: "ai",
        text: "Photosynthesis is the process by which green plants convert light energy into chemical energy in the form of glucose using carbon dioxide and water.",
      },
      { type: "user", text: "Where does photosynthesis occur in plants?" },
      {
        type: "ai",
        text: "Photosynthesis mainly occurs in the chloroplasts of plant cells, which contain the green pigment chlorophyll.",
      },
      { type: "user", text: "What are the two stages of photosynthesis?" },
      {
        type: "ai",
        text: "The two main stages are the light-dependent reactions and the Calvin cycle (light-independent reactions).",
      },
      { type: "user", text: "What is the role of sunlight in photosynthesis?" },
      {
        type: "ai",
        text: "Sunlight provides the energy needed to split water molecules and generate ATP and NADPH during the light-dependent reactions.",
      },
      {
        type: "user",
        text: "What is the chemical equation of photosynthesis?",
      },
      {
        type: "ai",
        text: "The general equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.",
      },
      {
        type: "user",
        text: "Why is photosynthesis important for life on Earth?",
      },
      {
        type: "ai",
        text: "Photosynthesis produces oxygen and forms the base of the food chain by creating energy-rich organic compounds.",
      },
      { type: "user", text: "Can photosynthesis happen at night?" },
      {
        type: "ai",
        text: "Photosynthesis cannot occur at night since it requires light energy. However, the Calvin cycle can continue temporarily using stored energy.",
      },
    ]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setAILoading(true);

    const res = await fetch("/api/ibookgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: input,
        tool: selectedTool,
        bookId,
      }),
    });

    const data = await res.json();
    setMessages([...newMessages, { type: "ai", text: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col h-full max-h-[100vh] max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          <span className="text-black">iBook</span>
          <span className="text-orange-500">GPT</span>
        </h1>
      </div>

      {/* Message Display Area */}
      <div className="flex-1 overflow-y-auto scrollbar-sm mb-4 space-y-4 min-h-[300px] pr-2">
        {/* Study Tools Dropdown */}
        <div className="mb-6">
          <details className="border rounded overflow-hidden">
            <summary className="bg-gray-100 px-4 py-3 cursor-pointer font-semibold flex items-center gap-2">
              <FaLightbulb className="text-yellow-500" /> Study tools
            </summary>
            <ul className="bg-white divide-y">
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaBook /> Chapter Summary
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaStickyNote /> Important Notes for Exams
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaStickyNote /> Revision Notes
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaExclamationCircle /> Common Mistakes
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaMagic /> Study Tricks
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaPenNib /> Create Definitions / Concepts
              </li>
              <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <FaVideo /> Suggested Videos
              </li>
            </ul>
          </details>
        </div>

        {messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, index) => <Message msg={msg} key={index} />)
        )}

        <TypingLoader />
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 border rounded px-3 py-2 bg-gray-50">
        <input
          type="text"
          className="flex-1 outline-none bg-transparent"
          placeholder="Ask any question about the chapter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="text-purple-600 hover:text-purple-800">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
