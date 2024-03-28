import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Routes/Root";
import ChooseLocation from "./Routes/ChooseLocation";
import TargetLocation from "./Routes/TargetLocation";
import ResidentCardPage from "./Routes/ResidentCardPage";

const router = createBrowserRouter([
  {
    path: "/Rick-and-Morty-App/",
    element: <Root />,
    children: [
      {
        path: "/Rick-and-Morty-App/",
        element: <ChooseLocation />,
      },
      {
        path: "/Rick-and-Morty-App/:locationId",
        element: <TargetLocation />,
        children: [
          {
            path: "/Rick-and-Morty-App/:locationId/:pageNum",
            element: <ResidentCardPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
