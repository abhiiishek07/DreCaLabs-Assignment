import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Archives from "./pages/Archives";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
function App() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        {user.length === 0 ? (
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
