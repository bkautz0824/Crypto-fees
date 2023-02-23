import { useRoutes } from "react-router-dom";
import * as React from 'react';
import App from "../App";
import PortTracker from "../components/PortBuilder/PortTracker";

const MainRoutes = () => {
    // Check if user is currently logged in, if not redirect to login page
    return useRoutes([
       
        {
            path: '/',
            // Important: If user is not logged in, redirect to Login page
            element: <App/>
        },
        {
            path: '/portfolio',
            element: <PortTracker/> 
        }
    ])
}
 
export default MainRoutes;