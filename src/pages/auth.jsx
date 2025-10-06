import useDarkMode from "../hooks/useDarkMode";
import { useNavigate, useLocation  } from "react-router-dom";
import OnboardingScreen from "../components/screens/OnboardingScreen";
import { useState } from "react";



export const Auth = () => {
    const [dark, setDark] = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const userType = location.state?.userType;

    const updateUserData = (newData) => {
        setUserData({ ...userData, ...newData });
    };

    return (
        <>
            <div className={`min-h-screen ${dark ? "dark" : ""}`}>
                <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
                    <OnboardingScreen
                        userType={userType}
                        onComplete={(data) => {
                            updateUserData(data);
                            if (userType === "user") {
                                navigate("/welcome", { state: { serviceType: data.serviceType } });
                            } else {
                                navigate("/runner_dashboard"); // Runners go to dashboard
                            }
                        }}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                    />
                </div>
            </div>
        </>
    )
}