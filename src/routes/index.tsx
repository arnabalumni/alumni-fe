import { AlumniDetails } from "@/pages/alumniDetails";
import { Home } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoutesAuth } from "./ProtectedRoutesUnauthenticated";
import { Panel } from "@/pages/panel";
import { ProtectedRoutesNoAuth } from "./ProtectedRoutesAuthenticated";
import GenerateCredentials from "@/pages/generateCredentials";
import { ViewCredentials } from "@/pages/viewCredentials";
import { AddAlumni } from "@/pages/addAlumni";
import { UpdateAlumni } from "@/pages/updateAlumni";

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
        {
          path: "generatecredentials",
          element: <GenerateCredentials />,
        },
        {
          path: "viewcredentials",
          element: <ViewCredentials />,
        },
        {
          path: "addalumni",
          element: <AddAlumni />,
        },
        {
          path: "updatealumni",
          element: <UpdateAlumni />,
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
