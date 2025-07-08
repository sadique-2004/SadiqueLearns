import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer } from "./components/index.js";

import authService from "./appwrite/auth.js";
// import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoaing] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => { setLoaing(false) });
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-amber-600 flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet/>   ToDo */}
        </main>
        <Footer/>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-red-600 text-center text-2xl content-center">.....Loading</div>
  )
}

export default App;
