import React, { useState, useRef, useEffect } from "react";
import {
  IconButton,
  Button,
  Input,
  Tooltip,
  Avatar
} from "@material-tailwind/react";
import {
  Phone,
  Video,
  Paperclip,
  Smile,
  Mic,
  Send,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "../common/Header";
import Message from "../common/Message";
import StatusQuickReplies from "../common/StatusQuickReplies";

const initialMessages = [
  { id: 1, from: "them", text: "Hi there, How are you?", time: "12:24 PM", status: "read" },
  {
    id: 2,
    from: "them",
    text: "Waiting for your reply. As I have to go back soon. I have to travel long distance.",
    time: "12:25 PM",
    status: "delivered",
  },
  {
    id: 3,
    from: "me",
    text: "Hi, I am coming there in few minutes. Please wait!! I am in taxi right now.",
    time: "12:28 PM",
    status: "read",
  },
  {
    id: 4,
    from: "them",
    text: "Thank you very much, I am waiting here at StarBuck cafe.",
    time: "12:35 PM",
    status: "sent",
  },
];

const HeaderIcon = ({ children, tooltip }) => (
  <Tooltip content={tooltip} placement="bottom" className="text-xs">
    <IconButton variant="text" size="sm" className="rounded-full">
      {children}
    </IconButton>
  </Tooltip>
);

export default function ChatScreen({ runner, market, userData, darkMode, toggleDarkMode, onBack }) {
  const [messages, setMessages] = useState(initialMessages);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    if (!text.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setMessages((p) => [...p, newMsg]);
    setText("");

    // Simulate reply for demo purposes
    setTimeout(() => {
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          from: "them",
          text: "Got it! I'll keep you updated on my progress.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "delivered",
        },
      ]);
    }, 1200);
  };

  const handleStatusSelect = (status) => {
    setText(status);
    send();
  };

  return (
    <div className="h-full flex flex-col">
      <Header
        title={runner.name}
        showBack={true}
        onBack={onBack}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        rightActions={
          <div className="items-center gap-3 hidden sm:flex">
            <HeaderIcon tooltip="Video call"><Video className="h-5 w-5" /></HeaderIcon>
            <HeaderIcon tooltip="Voice call"><Phone className="h-5 w-5" /></HeaderIcon>
          </div>
        }
      />

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 bg-chat-pattern bg-gray-100 dark:bg-black-200">
        <div className="mx-auto max-w-3xl">
          {messages.map((m) => (
            <Message key={m.id} m={m} />
          ))}
        </div>
      </div>

      {/* Status Quick Replies for Runners */}
      <StatusQuickReplies onSelect={handleStatusSelect} />

      {/* Message Input */}
      <div className="mx-auto max-w-3xl items-center gap-3 px-4 py-3 bg-gray-100 dark:bg-black-200">
        <div className="flex items-center px-3 bg-white dark:bg-black-100 rounded-full h-14 shadow-lg backdrop-blur-lg">
          <HeaderIcon tooltip="Emoji"><Smile className="h-5 w-5" /></HeaderIcon>
          <input
            placeholder="Type a message"
            className="w-full bg-transparent outline-0 font-normal text-sm text-black-100 dark:text-gray-100 px-3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <HeaderIcon tooltip="Attach"><Paperclip className="h-5 w-5" /></HeaderIcon>
          <HeaderIcon tooltip="Voice note"><Mic className="h-5 w-5" /></HeaderIcon>
        </div>
      </div>
    </div>
  );
}
