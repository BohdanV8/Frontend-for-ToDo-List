import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/main.css";
import Menu from "./components/Menu";
import MyInput from "./components/UI/MyInput/MyInput";
import MyButton from "./components/UI/MyButton/MyButton";
function App() {
  return (
    <div className="container text-center">
      <Menu />
      <div className="container row mt-5">
        <div className="col-md-9 mt-5">
          <MyInput />
        </div>
        <div className="col-md-3">
          <MyButton />
        </div>
      </div>
    </div>
  );
}

export default App;
