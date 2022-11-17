import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { notAuthRoutes } from "routes/notAuthRoutes";
import { useAuthStore } from "hooks/store/useAuthStore";
import { authRoutes } from "routes/authRoutes";

const RoutesLayout = () => {
  const { isAuth } = useAuthStore();
  if (isAuth === null) {
    return null;
  }
  const router = createBrowserRouter(!isAuth ? authRoutes : notAuthRoutes);

  return <RouterProvider router={router} />;
};

export default React.memo(RoutesLayout);
