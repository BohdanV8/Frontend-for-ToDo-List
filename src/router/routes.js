import Authorization from "../components/pages/Authorization";
import Home from "../components/pages/Home";
import Registration from "../components/pages/Registration";
import UserRoom from "../components/pages/UserRoom";
export const publicRoutes = [
  { path: "/", element: Authorization },
  { path: "/registration", element: Registration },
];
export const privateRoutes = [
  { path: "/home", element: Home },
  { path: "/userRoom", element: UserRoom },
].concat(publicRoutes);
