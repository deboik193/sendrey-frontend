import { Button } from "@material-tailwind/react";
import Onboarding from "../common/Onboarding";
import { useEffect, useRef, useState } from "react";
import Message from "../common/Message";

const initialMessages = [
  { id: 1, from: "them", text: "Welcome!", time: "12:24 PM", status: "read" },
  {
    id: 2,
    from: "them",
    text: "Would you like to schedule a pickup or run an errand?",
    time: "12:25 PM",
    status: "delivered",
  }
];

export default function ServiceSelectionScreen({ onSelectService, darkMode, toggleDarkMode }) {

  const [messages, setMessages] = useState(initialMessages);
  const listRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const send = (type, text) => {
    if (!text.trim()) return;

    // Clear any existing timeout to prevent memory leaks
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newMsg = {
      id: Date.now(),
      from: "me",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((p) => [...p, newMsg]);

    // Add the bot response first
    const botResponse = {
      id: Date.now() + 1,
      from: "them",
      text: "In progress...",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    };

    // Store timeout reference for cleanup
    timeoutRef.current = setTimeout(() => {
      // First update the messages to show the bot response
      setMessages((p) => [...p, botResponse]);

      // Then navigate after a short delay to ensure the message is visible
      timeoutRef.current = setTimeout(() => {
        onSelectService(type);
      }, 800); // Short delay to ensure the UI updates
    }, 1200);
  };

  return (
    <Onboarding darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div className="w-full max-w-2xl mx-auto p-4 relative">
        {messages.map((m) => (
          <Message key={m.id} m={m} />
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 absolute bottom-0 p-4 right-0 left-0">
          <Button
            onClick={() => send('Pick Up', 'Pick Up')}
            className="bg-secondary rounded-lg sm:text-sm flex items-center gap-3 justify-center"
          >
            <span>Pick Up</span>
          </Button>

          <Button
            onClick={() => send('Run Errand', 'Run Errand')}
            className="bg-primary rounded-lg sm:text-sm flex items-center gap-3 justify-center"
          >
            <span>Run Errand</span>
          </Button>
        </div>
      </div>
    </Onboarding>
  );
}