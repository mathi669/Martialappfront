import { Home, About, Gymbanner, Login, Register, ConfigAdminUser, CreateClass, UserIndex, EditarPerfil, GymProfile, AdminPage, BuscarGimnasios, Profiles } from "./pages";

export const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/gymbanner',
        element: <Gymbanner />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Register />
    },
    {
        path: '/adminPage',
        element: <ConfigAdminUser />
    },
    {
        path: '/createClass',
        element: <CreateClass />
    },
    {
        path: '/userIndex',
        element: <UserIndex />
    },
    {
        path: '/editarperfil',
        element: <EditarPerfil />
    },
    {
        path: '/gymprofile',
        element: <GymProfile />
    },
    {
        path: '/admin',
        element: <AdminPage />
    },
    {
        path: '/buscargimnasio',
        element: <BuscarGimnasios />
    },
    {
        path: '/profiles',
        element: <Profiles />
    }
];
