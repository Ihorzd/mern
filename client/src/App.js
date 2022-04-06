import React from "react";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import "materialize-css";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticate = !!token;
  const routes = useRoutes(isAuthenticate);
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider
          value={{
            token,
            login,
            logout,
            userId,
            isAuthenticate,
          }}
        >
          {isAuthenticate && <Navbar />}
          <div>{routes}</div>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
