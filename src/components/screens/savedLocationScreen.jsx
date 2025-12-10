import { useState, useEffect } from "react";
import { X, MapPin, Trash2, ChevronLeft } from "lucide-react";
import { Button } from "@material-tailwind/react";

// You will need to import your existing location state/data source here
// For example:
// import { useSavedLocations } from '../hooks/useLocationData';

const mockSavedLocations = [
    { address: "123 Main St, New York, NY", lat: 40.7128, lng: -74.0060 },
    { address: "456 Commerce Ave, New York, NY", lat: 40.7580, lng: -73.9855 },
];


export default function SavedLocationScreen({
    isOpen,
    onClose,
    onSelectLocation, // Callback to handle selection: (location, locationType) => void
    isSelectingDelivery,
    onDismiss,
    darkMode,
}) {
    // Assuming you manage saved locations here or fetch them
    const [savedLocations, setSavedLocations] = useState(mockSavedLocations); // Replace with real data logic

    if (!isOpen) {
        return null;
    }

    const locationType = isSelectingDelivery ? 'delivery' : 'pickup';

    const handleLocationSelect = (location) => {
        // send location to market
        onSelectLocation(location, locationType);
        onClose();
    };

    const handleCloseScreen = () => {
        onDismiss();
        onClose();
    };

    const handleDeleteLocation = (index) => {
        // delete location via api call
        console.log("Deleting location at index:", index);
        setSavedLocations(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'
                } ${darkMode ? 'dark bg-black-100' : 'bg-white'}`}
        >
            <div className="flex border-gray-100 dark:border-gray-800 border-b p-4 w-full items-center">
                <div onClick={handleCloseScreen} className="cursor-pointer text-black-200 dark:text-gray-300">
                    <ChevronLeft size={24} />
                </div>
                <h1 className="text-xl font-semibold mr-auto ml-auto text-black-200 dark:text-gray-300">
                    Saved Locations
                </h1>
                <div className="w-6" />
            </div>

            <div className="justify-center flex flex-col items-center h-full overflow-y-auto pb-20">
                <div className="space-y-4 lg:w-1/3 w-full pt-4 px-4">
                    {savedLocations.length === 0 ? (
                        <p className={`text-center py-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No saved locations found.
                        </p>
                    ) : (
                        savedLocations.map((location, index) => (
                            <div
                                key={index}
                                className={`p-4 space-y-2 rounded-lg cursor-pointer transition 
                                    ${darkMode
                                        ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`
                                }
                                onClick={() => handleLocationSelect(location)}
                            >
                                <p className="font-semibold text-lg flex items-center gap-2">
                                    <MapPin size={18} className="text-primary" />
                                    {location.name}
                                    <span
                                        className={`ml-2 text-xs font-medium px-2 py-1 rounded-full 
                                            ${isSelectingDelivery ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}
                                        `}
                                    >
                                        Select for {locationType === 'delivery' ? 'Delivery' : 'Pickup'}
                                    </span>
                                </p>
                                <div className="flex justify-between items-center text-sm">
                                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{location.address}</p>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent selection when clicking trash
                                            handleDeleteLocation(index);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}