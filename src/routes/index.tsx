import { AlumniDetails } from "@/pages/alumniDetails";
import { Home } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
      element: <>hello</>, // Wrap the component in ProtectedRoute
      //   children: [
      //   {
      //     path: "",
      //     element: <div>User Home Page</div>,
      //   },
      //   {
      //     path: "/profile",
      //     element: <div>User Profile</div>,
      //   },
      //   {
      //     path: "/logout",
      //     element: <Logout />,
      //   },
      //   ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/loginpage",
      element: <LoginPage />,
    },
  ];
}
