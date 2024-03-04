import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";

import Contact from "./Pages/Contact";
import Conversation from "./Pages/Conversation";



export const router = createBrowserRouter(
    [
        {
            path: '/',
            element:<App/>,
            children:[
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/conversation',
                    element: <Conversation />,
                },
                {
                    path:'/contact',
                    element: <Contact />
                }
            ]
        }
    ]
)