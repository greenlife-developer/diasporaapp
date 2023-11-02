import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService";
import { SET_LOGIN, SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import "./login.css"

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    try {
      const data = await loginUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.businessName));
      await dispatch(SET_USER(data))
      navigate("/dashboard");
    } catch (error) {
    //   setIsLoading(false);
    console.log(error);
    }
  };

  return (
    <div className="auth">
        <div className="form">
          <div className="--flex-center"> 
            {/* <BiLogIn size={35} color="#999" /> */}
          </div>
          <h2>Welcome, Please Login</h2>

          <form onSubmit={login}>
            <div className="form-field">
              <div>
                <label></label>
                <input
                  type="email"
                  placeholder="User Email"
                  required
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-field">
              <div>
                <label></label>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </div> 
            </div>

            <button type="submit" className="submit">
              Login
            </button>
          </form>
          
          <span className="register">
            <Link to="/">Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
    </div>
  );
};

export default Login;
