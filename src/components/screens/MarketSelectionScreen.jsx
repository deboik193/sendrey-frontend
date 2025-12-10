import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { Search, MapPin, X } from "lucide-react";

import Message from "../common/Message";
import Onboarding from "../common/Onboarding";
import CustomInput from "../common/CustomInput";
import Map from "../common/Map";

const markets = [];

export default function MarketSelectionScreen({
  service,
  onSelectMarket,
  darkMode,
  toggleDarkMode,
  messages,
  setMessages,
  pickupLocation,
  setPickupLocation,
  deliveryLocation,
  setDeliveryLocation,
  onOpenSavedLocations,
  onSelectService,
  onChooseDeliveryClick,
}) {
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
      text:
        service?.service?.toLowerCase() === "run-errand"
          ? "Which market would you like us to go to?"
          : "Which location do you want to pickup?",
      time: "12:25 PM",
      status: "delivered",
    },
  ];

  useEffect(() => {
    if (messages && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [messages, setMessages, initialMessages]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showLocationButtons, setShowLocationButtons] = useState(true);

  const listRef = useRef(null);
  const timeoutRef = useRef(null);
  const [showCustomInput, setShowCustomInput] = useState(true);
  const [pendingDeliverySelection, setPendingDeliverySelection] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMapSelect = (place) => {
    setSelectedPlace(place);
  };

  const handleMapSelection = () => {
    if (!selectedPlace) return;

    const locationText = selectedPlace.name || selectedPlace.address;
    const source = pendingDeliverySelection ? "delivery" : "pickup";

    if (pendingDeliverySelection) {
      setDeliveryLocation(locationText);
    } else {
      setPickupLocation(locationText);
    }

    send("map", locationText, source);

    setShowMap(false);
    setSelectedPlace(null);
    setPendingDeliverySelection(false);
  };

  const handleLocationSelectedFromSaved = (location, type) => {
    const locationText = location.address || location.name;

    if (type === 'delivery') {
      setDeliveryLocation(locationText);
    } else {
      setPickupLocation(locationText);
    }

    // Send the message to chat
    send("saved_location", locationText, type);
  };

  const send = (type, text, source) => {
    if (!text || typeof text !== "string") return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const msgText = text.trim();

    setShowLocationButtons(false);

    // Store pickup location
    if (!pickupLocation && !pendingDeliverySelection && source !== "delivery") {
      setPickupLocation(msgText);
    }

    // Store delivery location
    if (source === "delivery") {
      setDeliveryLocation(msgText);
    }

    const newMsg = {
      id: Date.now(),
      from: "me",
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setMessages((prev) => {
      const updated = [...prev, newMsg];

      const lastBot = prev[prev.length - 1];
      const alreadyHasFive = prev.some((m) => m.id === 5);

      // Show "Choose Delivery Location" message after pickup is set
      if (lastBot?.id === 4 && !alreadyHasFive && source === "pickup") {
        setTimeout(() => {
          setMessages((p) => {
            if (p.some((m) => m.id === 5)) return p;

            return [
              ...p,
              {
                id: 5,
                from: "them",
                text: "Set your delivery location. Choose Delivery Location",
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                status: "delivered",
                hasChooseDeliveryButton: true,
              },
            ];
          });
        }, 2100);
      }

      return updated;
    });

    setShowCustomInput(false);

    // Show location buttons after pickup selection
    if (source === "pickup" && !pendingDeliverySelection) {
      setTimeout(() => setShowLocationButtons(true), 2500);
    }

    // Fake bot "processing"
    const botResponse = {
      id: Date.now() + 1,
      from: "them",
      text: "In progress...",
      status: "delivered",
    };

    timeoutRef.current = setTimeout(() => {
      setMessages((p) => [...p, botResponse]);

      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.text !== "In progress..."));

        // Navigate after delivery is selected
        if (source === "delivery") {
          onSelectMarket({
            pickup: pickupLocation,
            delivery: text,
          });
        }
      }, 900);
    }, 1200);
  };

  const handleChooseDeliveryClick = () => {
    setPendingDeliverySelection(true);
    setShowMap(true);
    setShowLocationButtons(true); // Show only "View saved locations" button
  };

  const filteredMarkets = markets.filter((market) =>
    market.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if we're in delivery selection mode
  const isDeliveryMode = messages.some(m => m.hasChooseDeliveryButton) && !deliveryLocation;
  const isProcessing = messages.some(m => m.text === "In progress...");

  if (showMap) {
    return (
      <Onboarding darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <div className="w-full h-screen flex flex-col">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b">
            <Button
              variant="text"
              onClick={() => {
                setShowMap(false);
                setShowLocationButtons(true);
                setSelectedPlace(null);
              }}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button
              onClick={handleMapSelection}
              disabled={!selectedPlace}
              className={`${!selectedPlace ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Select Location
            </Button>
          </div>

          <Map onLocationSelect={handleMapSelect} />

          {selectedPlace && (
            <div className="p-4 bg-white dark:bg-gray-800 border-t">
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Selected Location:</p>
                <p className="text-blue-600 dark:text-blue-300">
                  {selectedPlace.name || selectedPlace.address}
                </p>
                <p className="text-sm text-blue-500 dark:text-blue-400 mt-1">
                  Coordinates: {selectedPlace.lat.toFixed(6)}, {selectedPlace.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}
        </div>
      </Onboarding>
    );
  }

  return (
    <Onboarding darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <div
        ref={listRef}
        className="w-full max-w-2xl mx-auto p-3 relative overflow-y-scroll marketSelection"
      >
        <div>
          {messages.map((m) => (
            <p className="mx-auto" key={m.id}>
              <Message
                m={m}
                showCursor={false}
                onChooseDeliveryClick={m.hasChooseDeliveryButton ? handleChooseDeliveryClick : undefined}
              />
            </p>
          ))}
        </div>

        <div className="mb-4 mt-2">
          {showCustomInput && (
            <CustomInput
              countryRestriction="us"
              stateRestriction="ny"
              setMessages={setMessages}
              showIcons={false}
              showMic={false}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search for a ${service?.service?.toLowerCase() === "run-errand"
                ? "location"
                : "market"
                }...`}
              searchIcon={<Search className="h-4 w-4" />}
              send={(type, text) => send(type, text, "pickup")}
            />
          )}
        </div>

        <div className={`space-y-1 -mt-3 max-h-96 overflow-y-auto ${isDeliveryMode ? '-mt-6 pb-5' : ''}`}>
          {searchTerm &&
            filteredMarkets.map((market) => (
              <Button
                key={market}
                variant="outlined"
                className="w-full justify-start py-3"
                onClick={() => send("text", market, "pickup")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {market}
              </Button>
            ))}

          {/* Only show "Find on map" for PICKUP selection */}
          {showLocationButtons && !isDeliveryMode && !isProcessing && (
            <Button
              variant="text"
              className="w-full flex items-center py-2"
              onClick={() => {
                setPendingDeliverySelection(false);
                setShowMap(true);
                setShowLocationButtons(false);
              }}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Find on map
            </Button>
          )}

          {/* Always show "View saved locations" when location buttons are visible */}
          {showLocationButtons && !isProcessing && (
            <Button
              variant="text"
              className="w-full text-primary flex items-center py-2"
              onClick={() => {
                onOpenSavedLocations(
                  true,
                  handleLocationSelectedFromSaved, // Callback on selection
                  () => setShowLocationButtons(true) // onDismiss callback
                );
              }}
            >
              View saved locations
            </Button>
          )}
        </div>
      </div>
    </Onboarding>
  );
}