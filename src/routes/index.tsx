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
import { UpdateAlumniView } from "@/pages/updateAlumniView";
import { AddAlumniBulk } from "@/pages/addAlumniBulk";
import { About } from "@/pages/about";
import { Contact } from "@/pages/contact";

export function Routes() {
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/contact",
      element: <Contact />,
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
          path: "addalumnibulk",
          element: <AddAlumniBulk />,
        },
        {
          path: "updatealumni",
          element: <UpdateAlumni />,
        },
        {
          path: "updatealumniview",
          element: <UpdateAlumniView />,
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
