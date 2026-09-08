import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { useEffect } from "react";

export default function useAuthorization() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("2. Auth state changed:", user);
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        dispatch(addUser({ id: uid, email, displayName, photoURL }));
        console.log("3. User exists, navigating");
        navigate("/browse");
      } else {
        console.log("3. No user");
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
}
