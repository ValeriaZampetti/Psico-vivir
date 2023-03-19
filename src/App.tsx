import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import LandingLayout from "./layouts/LandingLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import UserLayout from "./layouts/UserLayout";
import Error404 from "./pages/Error404";
import Landing from "./pages/Landing";
import Chat from "./pages/psico/Chat";
import Profile from "./pages/psico/Profile";
import Schedule from "./pages/psico/Schedule";
import Searcher from "./pages/psico/Searcher";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<LandingLayout />}>
                        <Route index element={<Landing />} />
                    </Route>

                    <Route path="/landing" element={<LandingLayout />}>
                        <Route index element={<Landing />} />
                    </Route>

                    <Route path="/users" element={<UserLayout />}>
                        <Route index element={<Navigate to="login" />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    <Route path="/psico" element={<ProtectedLayout />}>
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
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
