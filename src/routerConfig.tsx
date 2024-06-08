import {
  Home,
  About,
  Gymbanner,
  Login,
  Register,
  ConfigAdminUser,
  CreateClass,
  UserIndex,
  EditarPerfil,
  GymProfile,
  AdminPage,
  BuscarGimnasios,
  Profiles,
} from "./pages";
import SolicitudesRegistro from "./pages/SolicitudesRegistros";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/gymbanner/:gym_id",
    element: <Gymbanner />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Register />,
  },
  {
    path: "/adminPage",
    element: <ConfigAdminUser />,
  },
  {
    path: "/createClass",
    element: <CreateClass />,
  },
  {
    path: "/userIndex",
    element: <UserIndex />,
  },
  {
    path: "/editarperfil",
    element: <EditarPerfil />,
  },
  {
    path: "/gymprofile",
    element: <GymProfile />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/buscargimnasio",
    element: <BuscarGimnasios />,
  },
  {
    path: "/profiles",
    element: <Profiles />,
  },
  {
    path: "/SolicitudesRegistro",
    element: <SolicitudesRegistro />,
  },
];
