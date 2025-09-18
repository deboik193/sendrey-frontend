import React from "react";
import { Button } from "@material-tailwind/react";
import { Footprints, Bike, Navigation, Car, Truck } from "lucide-react";
import Header from "../common/Header";

const vehicleTypes = [
  { type: "pedestrian", icon: Footprints, label: "Walking" },
  { type: "cycling", icon: Bike, label: "Bicycle" },
  { type: "motorcycle", icon: Navigation, label: "Motorcycle" },
  { type: "car", icon: Car, label: "Car" },
  { type: "van", icon: Truck, label: "Van" },
];

export default function VehicleSelectionScreen({ onSelectVehicle, darkMode }) {
  return (
    <div className="h-full flex flex-col">
      <Header title="Delivery Method" showBack={true} darkMode={darkMode} />

      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">How would you like your delivery?</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {vehicleTypes.map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant="outlined"
                className="flex flex-col h-20 p-2"
                onClick={() => onSelectVehicle(type)}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
