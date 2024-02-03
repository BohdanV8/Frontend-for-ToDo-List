import Authorization from "../components/pages/Authorization";
import Home from "../components/pages/Home";
import Registration from "../components/pages/Registration";
import Room from "../components/pages/Room";
export const publicRoutes = [
  { path: "/", element: Authorization },
  { path: "/registration", element: Registration },
];
export const privateRoutes = [
  { path: "/home", element: Home },
  { path: "/room", element: Room },
].concat(publicRoutes);
