"use client";

import { useEffect, useRef, useState } from "react";
import { Message, StudyTools, TypingLoader } from "./specific/IBookGPT";
import toast from "react-hot-toast";
import { axios } from "@/utils";
import { FaArrowUp } from "react-icons/fa";

export default function IBookGPT({ bookId, chapterId = null, studyTools = {} }) {
  const [messages, setMessages] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [aiLoading, setAILoading] = useState(false);

  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedTool) return;

      try {
        setAILoading(true);
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }

        const newMessages = [
          ...messages,
          { type: "user", text: selectedTool.label },
        ];
        setMessages(newMessages);

        const { data } = await axios.post(chapterId ? `/api/books/${bookId}/${chapterId}` :
          `/api/books/${bookId}`, {
          tool: selectedTool.name,
        });

        setMessages([...newMessages, { type: "ai", text: data.reply, spl: selectedTool.name }]);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong...");
      } finally {
        setAILoading(false);
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    };

    fetchData();
  }, [selectedTool]);

  return (
    <div className="w-full relative flex flex-col h-full lg:h-[80vh] max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-4 backdrop-blur-md">
        <h1 className="text-xl font-bold text-gray-800">
          <span className="text-black">Neo</span>
          <span className="text-orange-500">Learn</span>
        </h1>
      </div>

      {/* Message Display Area */}
      <div
        className="flex-1 relative overflow-y-auto max-h-[550px] scrollbar-sm mb-4 space-y-4 min-h-[300px] pr-2"
        ref={containerRef}
      >
        <StudyTools setSelectedTool={setSelectedTool} studyTools={studyTools} />

        {messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <Message msg={msg} key={index} />))
        )}

        {aiLoading && <TypingLoader />}
      </div>

      <button onClick={scrollToTop} className="absolute right-6 bottom-4 h-10 w-10 rounded-full bg-gray-400 flex justify-center items-center">
        <FaArrowUp />
      </button>
    </div>
  );
}
