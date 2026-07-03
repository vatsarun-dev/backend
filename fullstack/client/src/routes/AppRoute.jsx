import React from "react";
import AuthLayout from "../Layout/AuthLayout";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import Login from "../components/Login";
import Register from "../components/Register";
import Protected from "../Layout/Protected";
import Public from "../Layout/Public";
import axiosInstance from "../config/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";
const AppRoute = () => {
  const dispatch = useDispatch();

  const getMeRefresh = async () => {
    try {
      const res = await axiosInstance.get("/user/me");
      dispatch(addUser(res.data.user));
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getMeRefresh();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Public />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
