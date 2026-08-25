import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./Auth";
import MovieDetail from "./MovieDetail";

const Body = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/browse", element: <Browse /> },
    { path: "/movie/:id", element: <MovieDetail /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Body;
