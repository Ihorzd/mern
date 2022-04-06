import {
  Router,
  Route,
  Navigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React from "react";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import App from "./App";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (

        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/links" element={<LinksPage />} />

          <Route path="/derail/:id" element={<DetailPage />} />
        </Routes>

    );
  }
  return (
    
      <Routes>
        <Route path={"/"} element={<AuthPage />} />
      </Routes>
  
  );
};
