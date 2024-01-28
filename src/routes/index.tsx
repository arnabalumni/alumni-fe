import { AlumniDetails } from "@/pages/alumniDetails";
import { Home } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoutesAuth } from "./ProtectedRoutesUnauthenticated";
import { Panel } from "@/pages/panel";
import { ProtectedRoutesNoAuth } from "./ProtectedRoutesAuthenticated";

export function Routes() {
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/alumnidetails",
      element: <AlumniDetails />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/adminpanel",
      element: <ProtectedRoutesAuth />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <Panel />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/loginpage",
      element: <ProtectedRoutesNoAuth />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
}
