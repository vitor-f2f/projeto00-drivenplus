import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Subscriptions from "./pages/subscriptions";
import Login from "./pages/login";

function App() {
    return (
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
    );
}

export default App;
