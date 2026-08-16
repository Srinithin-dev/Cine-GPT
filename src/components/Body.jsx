import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./Auth";

const Body = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/browse", element: <Browse /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Body;
