import { Route, Routes } from "react-router-dom";
import { routes } from "./routerConfig";
import Home from "./pages/Home";
import SolicitudesRegistro from "./pages/SolicitudesRegistros";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route: any, index: number) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      <Route path="/home" element={<Home />} />
      <Route path="/SolicitudesRegistro" element={<SolicitudesRegistro />} />
    </Routes>
  );
};
