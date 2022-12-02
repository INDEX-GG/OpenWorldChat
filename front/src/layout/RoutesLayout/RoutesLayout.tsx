import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { notAuthRoutes } from "routes/notAuthRoutes";
import { useAuthStore } from "hooks/store/useAuthStore";
import { authRoutes } from "routes/authRoutes";
import { PATH_URL_FRONTEND } from "lib/constants/constants";

const RoutesLayout = () => {
  const { isAuth } = useAuthStore();
  if (isAuth === null) {
    return null;
  }
  const router = createBrowserRouter(isAuth ? authRoutes : notAuthRoutes, {
    basename: PATH_URL_FRONTEND as string,
  });

  return <RouterProvider router={router} />;
};

export default React.memo(RoutesLayout);
