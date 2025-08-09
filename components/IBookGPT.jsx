"use client";

import { useEffect, useRef, useState } from "react";
import { Message, StudyTools, TypingLoader } from "./specific/IBookGPT";
import toast from "react-hot-toast";
import { axios } from "@/utils";

export default function IBookGPT({ bookId }) {
  const [messages, setMessages] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAILoading] = useState(false);
  const [bookData, setBookData] = useState([]);

  const containerRef = useRef(null);

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

        // let prompt = getIBookPrompt(bookData, selectedTool.name);

        const newMessages = [
          ...messages,
          { type: "user", text: selectedTool.label },
        ];
        setMessages(newMessages);

        const { data } = await axios.post(`/api/books/${bookData.id}/i-book`, {
          // prompt,
          tool: selectedTool.name,
        });

        setMessages([...newMessages, { type: "ai", text: data.reply }]);
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

  useEffect(() => {
    if (!bookId) return;

    const fetchBookData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/books/${bookId}`);

        if (response.data && response.data.data) {
          setBookData(response.data.data);
        } else {
          toast.error("No book data found.");
          setBookData(null);
        }
      } catch (error) {
        console.error("Error fetching book data:", error);
        toast.error("Failed to fetch book data.");
        setBookData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  return (
    <div className="w-full flex flex-col h-full lg:h-[80vh] max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-4 backdrop-blur-md">
        <h1 className="text-xl font-bold text-gray-800">
          <span className="text-black">iRead</span>
          <span className="text-orange-500">GPT</span>
        </h1>
      </div>

      {/* Message Display Area */}
      <div
        className="flex-1 overflow-y-auto scrollbar-sm mb-4 space-y-4 min-h-[300px] pr-2"
        ref={containerRef}
      >
        <StudyTools setSelectedTool={setSelectedTool} />

        {messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, index) => <Message msg={msg} key={index} />)
        )}

        {aiLoading && <TypingLoader />}
      </div>
    </div>
  );
}
