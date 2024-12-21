import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import AboutPage from "./About.jsx";
import WhiteSpace from "../components/WhiteSpace/WhiteSpace.jsx";
import Template from "../components/Template/Template.jsx";
import Schema from "../components/tables/Schema.jsx";
import TeamAbout from "./TeamAbout.jsx";
import PrivateRoute from "../utils/PrivateRoute/PrivateRoute.jsx";
import Login from "../components/Auth/Login.jsx"
import Signup from "../components/Auth/Signup.jsx"

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/teamAbout" element={<TeamAbout />} />
        <Route
          path="/whiteSpace/path"
          element={
            <PrivateRoute>
            <WhiteSpace />
             </PrivateRoute>
          }
        />
        <Route
          path="/whiteSpace/template/path"
          element={
           <PrivateRoute>
            <Template />
           </PrivateRoute>
          }
        />
        <Route
          path="/schema/path"
          element={
           <PrivateRoute>
            <Schema />
           </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AllRoutes;
