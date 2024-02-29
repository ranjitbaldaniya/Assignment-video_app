// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/navbar/AppNavbar";
import PrivateRoute from "./utils/PrivateRoute";
import VideoAppLayout from "./components/videoApp/VideoAppLayout";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/videos"
              element={
                <PrivateRoute>
                  <VideoAppLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
