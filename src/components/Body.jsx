import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./Auth";
import MovieDetail from "./MovieDetail";
import MyList from "./MyList";

const Body = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/browse", element: <Browse /> },
    { path: "/movie/:id", element: <MovieDetail /> },
    { path: "/my-list", element: <MyList /> },
  ]);

  return <RouterProvider router={router} />;
};

export default Body;
