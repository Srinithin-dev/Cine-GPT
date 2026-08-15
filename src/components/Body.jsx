import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router";
import Auth from "./Auth";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/browse", element: <Browse /> },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ id: uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  return <RouterProvider router={router} />;
};

export default Body;
