import React from "react";
import { RouteObject } from "react-router-dom";
import RoomsPage from "routes/RoomsPage/RoomsPage";
import ErrorPage from "routes/ErrorPage/ErrorPage";
import RoomIdPage from "routes/RoomIdPage/RoomIdPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RoomsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:roomId",
    element: <RoomIdPage />,
    errorElement: <ErrorPage />,
  },
];
