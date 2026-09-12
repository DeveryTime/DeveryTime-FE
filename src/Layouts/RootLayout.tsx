import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/nav-bar.tsx";

export const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
