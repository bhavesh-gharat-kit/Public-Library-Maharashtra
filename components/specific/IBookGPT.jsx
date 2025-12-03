import { handleCopy } from "@/lib/helperFunctions";
import {
  FaCircle,
  FaPrint,
  FaRobot,
  FaThumbsDown,
  FaThumbsUp,
  FaUser,
  FaLightbulb,
  FaBook,
  FaStickyNote,
  FaExclamationCircle,
  FaMagic,
  FaPenNib,
  FaVideo,
  FaPaperPlane,
  FaApper,
  FaQuestion,
  FaPage4,
  FaHandPaper,
  FaFileAudio,
} from "react-icons/fa";
import { MDComponent } from "..";

export function FeedbackButtons({ handleCopy }) {
  return (
    <div className="flex gap-2 mt-2 text-gray-500">
      <FaThumbsUp
        title="Like"
        className="cursor-pointer hover:text-green-500"
      />
      <FaThumbsDown
        title="Dislike"
        className="cursor-pointer hover:text-red-500"
      />
      <FaPrint
        title="Copy"
        onClick={handleCopy}
        className="cursor-pointer ml-auto hover:text-indigo-600"
      />
    </div>
  );
}

export function EmptyChatMessage() {
  return (
    <div className="text-center text-gray-400 italic py-6">
      Start by asking a question above to get helpful answers.
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-full w-full text-indigo-600 animate-pulse">
      <div className="text-lg font-semibold">Loading...</div>
    </div>
  );
}

export function TypingLoader() {
  return (
    <div className="flex items-center gap-3 mt-3 text-sm text-gray-600 dark:text-gray-300">
      {/* AI Avatar */}
      <div className="bg-purple-600 text-white p-2 rounded-full">
        <FaRobot className="text-xs" />
      </div>

      {/* Typing Dots */}
      {/* <div className="flex items-center gap-1">
        <FaCircle className="animate-bounce text-xs text-purple-400" />
        <FaCircle className="animate-bounce text-xs text-purple-400 delay-500" />
        <FaCircle className="animate-bounce text-xs text-purple-400 delay-1000" />
      </div> */}

      {/* Label */}
      <span className="ml-2 italic text-gray-500 dark:text-gray-400">
        Thinking...
      </span>
    </div>
  );
}

export function Message({ msg }) {
  return (
    <div
      className={`flex items-start gap-2 break-words hyphens-auto ${msg.type === "user" ? "justify-end" : ""
        }`}
    >
      {/* Avatar */}
      {msg.type === "ai" && (
        <div className="bg-purple-600 text-white p-2 rounded-full">
          <FaRobot />
        </div>
      )}
      {msg.type === "user" && (
        <div className="bg-gray-300 text-white p-2 rounded-full">
          <FaUser />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.type === "ai"
          ? "bg-purple-100 text-gray-800"
          : "bg-gray-100 text-gray-800"
          }`}
      >
        <MDComponent markdownText={msg.text} />
        {/* {msg.text} */}
        {msg.type === "ai" && (
          <FeedbackButtons handleCopy={() => handleCopy(msg.text)} />
        )}
      </div>
    </div>
  );
}

function UserInput({ input, setInput }) {
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
  );
}

export function StudyTools({ setSelectedTool, studyTools }) {

  const tools = [
    { icon: <FaBook />, label: "Chapter Overview", name: "chapterOverview" },

    { icon: <FaStickyNote />, label: "Key Concepts", name: "keyConcepts" },
    { icon: <FaStickyNote />, label: "Detailed Notes", name: "detailedNotes" },
    {
      icon: <FaQuestion />,
      label: "MCQ Practice Bank",
      name: "mcq",
    },
    {
      icon: <FaExclamationCircle />,
      label: "Common Mistakes",
      name: "commonMistakes",
    },
    { icon: <FaHandPaper />, label: "Practice Questions", name: "practiceQuestions" },
    { icon: <FaMagic />, label: "Study Tips", name: "studyTips" },
    { icon: <FaPage4 />, label: "Sample Question Paper", name: "sampleQuestionPaper" },
    { icon: <FaFileAudio />, label: "Listen & Learn", name: "audioLink" },
    { icon: <FaFileAudio />, label: "Visual Concept", name: "videoLink" },
  ];
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
        <FaLightbulb className="text-yellow-500 text-xl" />
        Study Tools
      </h2>

      <div className="flex flex-wrap gap-3">
        {tools.map((item, index) => (
          ((studyTools[item.name]) &&
            <button key={index}
              onClick={() => setSelectedTool(item)}
              className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm border border-gray-200 
                       bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 
                       transition duration-300 ease-in-out text-sm font-medium text-gray-800
                       hover:shadow-lg hover:scale-[1.01]"
            >
              <span className="">{item.icon}</span>
              {item.label}
            </button>)
        ))}
      </div>
    </div>
  );
}
