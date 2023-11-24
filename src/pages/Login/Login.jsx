import React, { useEffect, useState } from "react";
import logo from "assets/logo.png";
import { Form, Link, useNavigate } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import { useFetch } from "components/CustomHook";
import {
  getLocalStorage,
  setLocalStorage,
  toastSuccess,
  toastError,
  extractUsername,
  toastInfo,
} from "@/Utils";

const Login = () => {
  const navigate = useNavigate();

  // Destructure the custom hook response
  const { data, loading, error, response, fetchData } = useFetch();

  // Retrieve the current user from local storage
  const currentUser = getLocalStorage("headerData");

  // State to manage input values
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Password validation
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user data from local storage or navigate to login
    const user = getLocalStorage("currentUser") || navigate("/login");
    const userName = user ? extractUsername(user.email) : null;

    if (!isPasswordValid(input.password)) {
      // Password validation failed
      toastError("Password must be at least 6 characters long");
    } else {
      if (currentUser) {
        // User is already logged in
        toastError(`${userName.toUpperCase()}, Already Login`);
        navigate("/dashboard/home");
      } else {
        // Perform login
        const url = "http://206.189.91.54/api/v1/auth/sign_in";
        const config = {
          method: "POST",
          body: {
            email: input.email.toLowerCase(),
            password: input.password,
          },
        };
        fetchData(url, config);
      }
    }
  };

  // Handle the response after data fetching
  useEffect(() => {
    if (!loading && !error && data) {
      const headerData = {
        uid: response.headers.get("uid"),
        "access-token": response.headers.get("access-token"),
        expiry: response.headers.get("expiry"),
        client: response.headers.get("client"),
      };

      try {
        if (response.status === 200) {
          // Successful login
          toastSuccess("Successful Login");
          setLocalStorage("headerData", headerData);
          setLocalStorage("currentUser", data.data);
          navigate("/dashboard/home");
        } else {
          // Login error
          throw new Error(data.errors.full_messages[0]);
        }
      } catch (error) {
        // Handle any errors that occurred
        toastError(error.message);
      }

      // Reset input values
      setInput({
        email: "",
        password: "",
      });
    }
  }, [data, loading, error, response, navigate]);

  return (
    <div className="sign-in-page">
      <div className="login-container">
        <img src={logo} alt="FroggyLogo" className="login-logo" />
        <Form className="login-form" onSubmit={handleSubmit}>
          <Input
            name="email"
            value={input.email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            value={input.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <Button type="submit" text="Log In" />
        </Form>
        <div className="suggestion-container">
          <h3>Don't have an account?</h3>
          <Link to="/signup" className="sign-up-btn">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
