import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/main.css";
import Menu from "./components/Menu";
import Authorization from "./components/pages/Authorization";
function App() {
  return (
    <div className="container text-center">
      <Menu />
      <Authorization />
    </div>
  );
}

export default App;
