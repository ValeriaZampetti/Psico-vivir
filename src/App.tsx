import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import LandingLayout from "./layouts/LandingLayout";
import Error404 from "./pages/Error404";
import Landing from "./pages/Landing";
import Chat from "./pages/psico/Chat";
import Profile from "./pages/psico/Profile";
import Schedule from "./pages/psico/Schedule";
import Searcher from "./pages/psico/Searcher";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LandingLayout />}>
          <Route index element={<Landing />} />
        </Route>

        <Route path="/landing" element={<LandingLayout />}>
          <Route index element={<Landing />} />
        </Route>

        <Route path="/users" element={<LandingLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/psico" element={<LandingLayout />}>
          <Route index element={<Searcher />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="*" element={<LandingLayout />}>
          <Route index element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
