/* eslint-disable import/no-extraneous-dependencies */
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import RegistrationPage from "./pages/RegistrationPage";

import "./App.css";
import UserProvider from "./contexts/UserContext";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/blogs" element={<BlogPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
