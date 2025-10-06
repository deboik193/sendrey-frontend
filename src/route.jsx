import { Routes, Route } from "react-router";
import ErrandServiceApp from "./pages/home";
import WhatsAppLikeChat from "./pages/raw";
import { Home } from "./pages/newHome";
import { Auth } from "./pages/auth";
import { Welcome } from "./pages/welcome";

export default function ProjectedRoutes() {
  return (
    <Routes>
      <Route index element={<ErrandServiceApp />} />
      <Route path="raw" element={<WhatsAppLikeChat />} />
      <Route path="Home" element={<Home />} />
      <Route path="auth" element={<Auth />} />
      <Route path="welcome" element={<Welcome />} />

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


