import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";

const qc = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ListPage /> },
      { path: "superheroes/:id", element: <DetailPage /> },
      { path: "superheroes/:id/edit", element: <EditPage /> },
      { path: "create", element: <CreatePage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
