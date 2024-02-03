import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/main.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import AppRouter from "./components/AppRouter";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isAuth")) {
      setIsAuth(true);
    }
  }, []);
  return (
    <div className="container text-center">
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          <Menu />
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
