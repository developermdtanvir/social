import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "../Layout/LoginLayout";
import Main from "../Layout/Main";
import RegisterLayout from "../Layout/RegisterLayout";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />

            }
        ]
    },
    {
        path: '/login',
        element: <LoginLayout />,
        children: [
            {
                path: '/login',
                element: <Login />

            }
        ]
    },
    {
        path: '/signup',
        element: <RegisterLayout />,
        children: [
            {
                path: '/signup',
                element: <SignUp />

            }
        ]
    },

])


export default router;