import React, { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";

export const TrackDeliveryScreen = ({ darkMode, trackingData, onClose }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const currentStage = trackingData?.currentStage || 0;
    const progressPercentage = trackingData?.progressPercentage || 0;

    const stages = [
        "Order Confirmed",
        "Runner Assigned",
        "Picked Up", 
    ];

    const OpenTrackRunner = () => {
        setIsFullScreen(true);
    };

    const handleBackToChatScreen = () => {
        setIsFullScreen(false);
        if (onClose) onClose();
    };

    if (!isFullScreen) {
        return (
            <div
                onClick={OpenTrackRunner}
                className={`max-w-xs p-4 rounded-lg cursor-pointer ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
            >
                <div className="px-9 py-10 bg-primary/50 rounded-t-md">

                </div>
                <div className="flex items-center justify-center gap-1 bg-primary">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="">
                        <p className="font-semibold text-lg text-white ">Track Runner</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900">
            <div className={`p-4 shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex items-center justify-between gap-3">
                    <button onClick={handleBackToChatScreen} className="p-2">
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <p className="text-lg font-semibold ml-auto mr-auto">Track Runner</p>
                </div>
            </div>

            <div className="flex-1 bg-gray-200 dark:bg-gray-800 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <p>Map tracking here</p>
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900">
                <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Delivery Progress</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }} />
                    </div>
                </div>

                <div>
                    {stages.map((stage, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-full ${currentStage >= index + 1 ? "bg-primary" : "bg-gray-300"}`} />
                                {index < stages.length - 1 && (
                                    <div className={`w-0.5 h-8 ${currentStage >= index + 1 ? "bg-primary" : "bg-gray-300"}`} />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{stage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};