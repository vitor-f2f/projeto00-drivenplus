import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignUp from "./components/signup";
import Subscriptions from "./components/subscriptions";
import Login from "./components/login";
import UserContext from "./components/usercontext";

function App() {
    const [userData, setUserData] = useState(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/sign-up" element={<SignUp />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route
                        path="/subscriptions"
                        element={<Subscriptions />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
