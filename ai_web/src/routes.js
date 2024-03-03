import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home";

import Contact from "./Pages/Contact";



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
                    path:'/contact',
                    element: <Contact />
                }
            ]
        }
    ]
)