import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthProvider";
import LandingLayout from "./layouts/LandingLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import UserLayout from "./layouts/UserLayout";
import Error404 from "./pages/Error404";
import Landing from "./pages/Landing";
import Chat from "./pages/psico/Chat";
import Checkout from "./pages/psico/Checkout";
import Profile from "./pages/psico/Profile";
import Reservations from "./pages/psico/DoctorReservation";
import Searcher from "./pages/psico/Searcher";
import WriteReview from "./pages/psico/WriteReview";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ScheduleAppointment from "./pages/psico/ScheduleAppointment";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LandingLayout />}>
            <Route index element={<Landing />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          <Route path="/landing" element={<LandingLayout />}>
            <Route index element={<Landing />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          <Route path="/users" element={<UserLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
            <Route path="writereview" element={<WriteReview />} /> {/* de mientras aqui*/}
          </Route>

          <Route path="/psico" element={<ProtectedLayout />}>
            <Route index element={<Searcher />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="schedule/:id" element={<ScheduleAppointment />} />
            <Route path="chat" element={<Chat />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
