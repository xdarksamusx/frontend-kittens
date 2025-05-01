import React from "react";

import { Routes, Route } from "react-router-dom";
import Testing from "./pages/Testing";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import Home from "./pages/Home";
import Kitten from "./pages/Kitten";
import Edit from "./pages/Edit";
import CreateKitten from "./pages/CreateKitten";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/kitten/:id" element={<Kitten />} />

      <Route path="/test" element={<Testing />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/kitten/:id/edit" element={<Edit />} />
      <Route path="/kitten/create" element={<CreateKitten />} />
    </Routes>
  );
}

export default App;
