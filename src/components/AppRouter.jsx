import React, { useContext } from "react";
import { publicRoutes } from "../router/routes";
import { privateRoutes } from "../router/routes";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Routes>
      {privateRoutes.map((el) => (
        <Route path={el.path} element={<el.element />} key={el.path} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((el) => (
        <Route path={el.path} element={<el.element />} key={el.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
