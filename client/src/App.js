import Home from "./pages/Homepage/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import axios from "axios";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register'


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} /> */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/dashboard/:id"
            element={<Dashboard />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
