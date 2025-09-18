import React from "react";
import { Card, CardBody, Chip, Rating } from "@material-tailwind/react";
import { Star } from "lucide-react";
import Header from "../common/Header";

const contacts = [
  {
    id: 1,
    name: "Zilan",
    lastMessage: "Thank you very much, I am wai…",
    time: "12:35 PM",
    online: true,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    about: "Hello My name is Zilan …",
    media: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=300&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    ],
    vehicle: "motorcycle",
    rating: 4.8,
    totalRuns: 24,
  },
  {
    id: 2,
    name: "Shehnaz",
    lastMessage: "Call ended",
    time: "12:35 PM",
    online: true,
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=200&auto=format&fit=crop",
    vehicle: "car",
    rating: 4.5,
    totalRuns: 32,
  },
];

export default function RunnerSelectionScreen({ selectedVehicle, onSelectRunner, darkMode }) {
  const availableRunners = contacts.filter(r => r.vehicle === selectedVehicle && r.online);

  return (
    <div className="h-full flex flex-col">
      <Header title="Select Runner" showBack={true} darkMode={darkMode} />

      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              Found {availableRunners.length} available runners. Who would you like?
            </p>
          </div>

          <div className="space-y-3">
            {availableRunners.map(runner => (
              <Card
                key={runner.id}
                className="cursor-pointer"
                onClick={() => onSelectRunner(runner)}
              >
                <CardBody className="flex flex-row items-center p-3">
                  <img
                    src={runner.avatar}
                    alt={runner.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-black dark:text-white">{runner.name}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1 text-black dark:text-white">{runner.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>{runner.totalRuns} deliveries</span>
                      <Chip
                        value={runner.vehicle}
                        size="sm"
                        className="capitalize"
                        color={runner.online ? "green" : "gray"}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
