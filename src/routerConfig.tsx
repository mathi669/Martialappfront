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
  UserSearchResults,
  UserProfile,
} from "./pages";
import ReportManagement from "./pages/ReportManagement";
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
    path: "/gymbanner",
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
    path: "/gymprofile/:gym_id",
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
  {
    path: "/UserResults/:query",
    element: <UserSearchResults />,
  },
  {
    path: "/user/:userId", // Nueva ruta para UserProfile
    element: <UserProfile />,
  },
  {
    path: "/admin/reportes",
    element: <ReportManagement />,
  },
];
