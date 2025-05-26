import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import Restaurant from "./Pages/Restaurant/Restaurant";
import AuthProvider from "./providers/AuthProvider/AuthProvider";
import { CartProvider } from "./providers/CartProvider/CartProvider.jsx";
import Register from "./Pages/Auth_Pages/Register/Register.jsx";
import SignIn from "./Pages/Auth_Pages/SignIn/SignIn.jsx"
import { User } from "lucide-react";
import UserProfile from "./Pages/UserPages/UserProfile/UserProfile.jsx";
import ViewAllOrders from "./Pages/UserPages/ViewAllOrders/ViewAllOrders.jsx";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes.jsx"
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/restaurant/:id",
        // path: "/restaurant",
        element: <PrivateRoutes><Restaurant/></PrivateRoutes>,
        loader: async ({ params }) => {
          return fetch(`http://localhost:5000/api/v1/restaurant/getRestaurant/${params.id}`);
        },
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/signin",
        element: <SignIn/>
      },
      {
        path: "/user",
        element: <UserProfile/>
      },
      {
        path: "/viewallorders",
        element: <ViewAllOrders/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ToastContainer/>
        <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
