// src/Routerconfig.tsx
import { Home, About, Gymbanner, Login, Register, ConfigAdminUser, CreateClass, UserIndex, Profile, GymProfile, BuscarGimnasios } from "./pages";

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
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/gymprofile',
        element: <GymProfile />
    },
    {
        path: '/buscargimnasio',
        element: <BuscarGimnasios />
    }
];
