import useDarkMode from "../hooks/useDarkMode";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingScreen from "../components/screens/OnboardingScreen";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../Redux/authSlice";



export const Auth = () => {
    const [dark, setDark] = useDarkMode();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const userType = location.state?.userType;
    const dispatch = useDispatch();

    const updateUserData = (newData) => {
        setUserData({ ...userData, ...newData });
    };

    const handleOnboardingComplete = async (data) => {
        const { name, phone } = data;
        const payload = {
            role: userType,     // 'user' or 'runner'
            fullName: name,
            phone,
            // send these if value are provided
            ...(data.password && { password: data.password }),
            ...(data.email && { email: data.email }),
        };

        try {
            const result = await dispatch(register(payload)).unwrap();
            console.log("Registration successful:", result);
            // maybe navigate to dashboard or verification screen
            if (userType === "user") {
                navigate("/welcome", { state: { serviceType: data.serviceType } });
            } else {
                navigate("/runner_dashboard");
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <>
            <div className={`min-h-screen ${dark ? "dark" : ""}`}>
                <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white">
                    <OnboardingScreen
                        userType={userType}
                        onComplete={handleOnboardingComplete}
                        darkMode={dark}
                        toggleDarkMode={() => setDark(!dark)}
                    />
                </div>
            </div>
        </>
    )
}