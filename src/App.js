import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Archives from "./pages/Archives";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/userSlice";
import PublicItems from "./pages/PublicItems";
function App() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("in app", user);
        user.getIdTokenResult().then((token) => console.log("token is", token));
        dispatch(addUser(user));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <BrowserRouter>
        {!user.user ? (
          <>
            <Routes>
              <Route path="/user/:userId" element={<PublicItems />} />
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/user/:userId" element={<PublicItems />} />
            <Route path="/" element={<Home />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
