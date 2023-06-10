import { createBrowserRouter } from "react-router-dom";
import LoginLayout from "../Layout/LoginLayout";
import Main from "../Layout/Main";
import RegisterLayout from "../Layout/RegisterLayout";
import About from "../pages/About/About";
import ChatBot from "../pages/ChatBot/ChatBot";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Message from "../pages/Message/Message";
import Profile from "../pages/Profile/Profile";
import Save from "../pages/Save/Save";
import SignUp from "../pages/SignUp/SignUp";
import PraivetRoute from "./PraivetRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <PraivetRoute><Home /></PraivetRoute>

            },
            {
                path: '/profile',
                element: <Profile />

            },
            {
                path: '/save',
                element: <Save />
            },
            {
                path: '/chat',
                element: <Message />
            },
            {
                path: '/bot',
                element: <ChatBot />
            },
            {
                path: '/about',
                element: <About />
            },
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