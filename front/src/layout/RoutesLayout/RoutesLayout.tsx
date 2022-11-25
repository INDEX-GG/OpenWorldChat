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
  const basename = document.querySelector("base")?.getAttribute("href") ?? "/";
  const router = createBrowserRouter(isAuth ? authRoutes : notAuthRoutes, {
    basename: basename || "/",
  });

  return <RouterProvider router={router} />;
};

export default React.memo(RoutesLayout);
