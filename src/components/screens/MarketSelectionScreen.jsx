import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Search, MapPin } from "lucide-react";
import Message from "../common/Message";
import Onboarding from "../common/Onboarding";
import CustomInput from "../common/CustomInput";

const markets = [
  "Ikeja Computer Village",
  "Balogun Market",
  "Mile 12 Market",
  "Yaba Market",
  "Lekki Market",
  "Surulere Market",
];

export default function MarketSelectionScreen({service, onSelectMarket, darkMode, toggleDarkMode }) {
  const initialMessages = [
    { id: 1, from: "them", text: "Welcome!", time: "12:24 PM", status: "read" },
    {
      id: 2,
      from: "them",
      text: "Would you like to schedule a pickup or run an errand?",
      time: "12:25 PM",
      status: "delivered",
    },
    {
      id: 3,
      from: "me",
      text: service.service,
      time: "12:25 PM",
      status: "send",
    },
    {
      id: 4,
      from: "them",
      text: service?.service?.toLowerCase() === 'run errand' ? 'Which market would you like us to go to?' : 'Which location do you want to pickup?',
      time: "12:25 PM",
      status: "delivered",
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
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
        onSelectMarket(type);
      }, 800); // Short delay to ensure the UI updates
    }, 1200);
  };

  const filteredMarkets = markets.filter(market =>
    market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Onboarding darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div className="w-full max-w-2xl mx-auto p-4 relative overflow-hidden">
        {messages.map((m) => (
          <Message key={m.id} m={m} />
        ))}

        <div className="mb-4">
          <CustomInput countryRestriction="us"
            stateRestriction="ny"
            setMessages={setMessages}
 value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`Search for a ${service?.service?.toLowerCase() === 'run errend' ? 'location' : 'market'}...`} searchIcon={<Search className="h-4 w-4" />} />
        </div>

        {/* <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredMarkets.map(market => (
            <Button
              key={market}
              variant="outlined"
              className="w-full justify-start py-3"
              onClick={() => onSelectMarket(market)}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {market}
            </Button>
          ))}

          <Button variant="text" className="w-full flex items-center py-3">
            <MapPin className="h-4 w-4 mr-2" />
            Find on map
          </Button>
        </div> */}
      </div>
    </Onboarding>
  );
}
