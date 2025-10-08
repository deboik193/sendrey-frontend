import { Routes, Route } from "react-router";
import ErrandServiceApp from "./pages/home";
import WhatsAppLikeChat from "./pages/raw";
import { Home } from "./pages/newHome";
import { Auth } from "./pages/auth";
import { Welcome } from "./pages/welcome";
import UserProfile from "./components/common/UserProfile";
import { Location } from "./components/common/Location";
import { Wallet } from "./components/common/Wallet";
import { OngoingOrders } from "./components/common/OngoingOrders";

export default function ProjectedRoutes() {
  return (
    <Routes>
      <Route index element={<ErrandServiceApp />} />
      <Route path="raw" element={<WhatsAppLikeChat />} />
      <Route path="Home" element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="locations" element={<Location />} />
      <Route path="wallet" element={<Wallet />} />
      <Route path="ongoing-orders" element={<OngoingOrders />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      {/* <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}

    </Routes>
  )
}


