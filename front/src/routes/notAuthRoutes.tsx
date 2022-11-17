import { RouteObject } from "react-router-dom";
import SignInPage from "routes/SignInPage/SignInPage";
import ErrorPage from "routes/ErrorPage/ErrorPage";
import React from "react";

export const notAuthRoutes: RouteObject[] = [
  {
    path: "/",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
];
