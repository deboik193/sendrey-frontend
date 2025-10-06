import { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { useNavigate, useLocation } from "react-router-dom";
import MarketSelectionScreen from "../components/screens/MarketSelectionScreen";
import ServiceSelectionScreen from "../components/screens/ServiceSelectionScreen";
import RunnerSelectionScreen from "../components/screens/RunnerSelectionScreen";
import ChatScreen from "../components/screens/ChatScreen";
import RunnerDashboardScreen from "../components/screens/RunnerDashboardScreen";

export const Welcome = () => {
    const [dark, setDark] = useDarkMode();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [selectedMarket, setSelectedMarket] = useState("");
    const [currentScreen, setCurrentScreen] = useState("service_selection");
    const location = useLocation();
    const [selectedRunner, setSelectedRunner] = useState(null);
    const [userType, setUserType] = useState(null);

    const updateUserData = (newData) => {
        setUserData({ ...userData, ...newData });
    };

    const navigateTo = (screen) => {
        setCurrentScreen(screen);
    };


    const serviceType = location.state?.serviceType || "";


    const renderScreen = () => {
        switch (currentScreen) {
            case "service_selection":
                return (
                    <ServiceSelectionScreen
                        onSelectService={(service) => {
                            updateUserData({ service });
                            navigateTo("market_selection");
                        }}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                    />
                );

            case "market_selection":
                return (
                    <MarketSelectionScreen
                        service={userData}
                        onSelectMarket={(market) => {
                            setSelectedMarket(market);
                            // navigateTo("runner_selection");
                        }}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                    />
                );

            case "runner_selection":
                return (
                    <RunnerSelectionScreen
                        selectedMarket={selectedMarket}
                        onSelectRunner={(runner) => {
                            setSelectedRunner(runner);
                            navigateTo("chat");
                        }}
                        darkMode={dark}
                    />
                );

            case "chat":
                return (
                    <ChatScreen
                        runner={selectedRunner}
                        market={selectedMarket}
                        userData={userData}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                        onBack={() => navigateTo("runner_selection")}
                    />
                );

            case "runner_dashboard":
                return (
                    <RunnerDashboardScreen
                        runner={selectedRunner}
                        market={selectedMarket}
                        userData={userData}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                        onBack={() => navigateTo("runner_selection")}
                    />
                );

            default:
                return (
                    <ServiceSelectionScreen
                        onSelectRole={setUserType}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                    />
                );
        }
    };

    return (
        <>
            <div className={`min-h-screen ${dark ? "dark" : ""}`}>
                <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
                    {renderScreen()}
                </div>
            </div>
        </>
    )
}