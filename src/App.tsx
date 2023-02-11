import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import AuthLayout from "./layouts/AuthLayout";
import Error404 from "./pages/Error404";
import Landing from "./pages/Landing";
import Chat from "./pages/psico/Chat";
import Profile from "./pages/psico/profile";
import Schedule from "./pages/psico/Schedule";
import Searcher from "./pages/psico/Searcher";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

function App() {
    const [count, setCount] = useState(0);

    // return (
    //   <div className="App">
    //     <div>
    //       <a href="https://vitejs.dev" target="_blank">
    //         <img src="/vite.svg" className="logo" alt="Vite logo" />
    //       </a>
    //       <a href="https://reactjs.org" target="_blank">
    //         <img src={reactLogo} className="logo react" alt="React logo" />
    //       </a>
    //     </div>
    //     <h1 className='text-3xl text-red-400'>Vite + React</h1>
    //     <div className="card">
    //       <button onClick={() => setCount((count) => count + 1)}>
    //         count is {count}
    //       </button>
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to test HMR
    //       </p>
    //     </div>
    //     <p className="read-the-docs">
    //       Click on the Vite and React logos to learn more
    //     </p>
    //   </div>
    // )

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/landing" element={<AuthLayout />}>
                    <Route index element={<Landing />} />
                </Route>

                <Route path="/users" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path="/psico" element={<AuthLayout />}>
                    <Route index element={<Searcher />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="chat" element={<Chat />} />
                </Route>
                <Route path="*" element={<Error404 />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
