import React from "react";
import { Route, Routes } from "react-router";
import { AuthProvider } from "../auth/context/AuthContext";
import Login from "../auth/login/login";
import AuthFeature from "../authFeature";
import Feature from "../feature";
import { authRoutes, publicRoutes } from "./router.link";

const ALLRoutes: React.FC = () => {
  return (
    <>
     <AuthProvider>
      <Routes>
        <Route path="/"  element={<Login/>} />
        <Route element={<Feature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
      </AuthProvider>
    </>
  );
};

export default ALLRoutes;
