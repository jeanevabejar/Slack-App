import React, { useEffect, useState } from "react";
import logo from "assets/logo.png";
import { Form, Link, useNavigate } from "react-router-dom";
import Input from "Components/Input";
import Button from "Components/Button";
import { useFetch } from "Components/CustomHook";
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



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user data from local storage or navigate to login
    const user = getLocalStorage("currentUser") || [];
  

   
      if (currentUser) {
        // User is already logged in
        toastError(`${user.email.toUpperCase()}, Already Login`);
        navigate("/dashboard/home");
      } else if(!currentUser){
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
          toastError(data.errors)
          throw new Error(data.errors);
          
        }
      } catch (error) {
        // Handle any errors that occurred
        // if remove it is redirected to error page
        toastError(error.message);
      }

      // Reset input values
      setInput({
        email: "",
        password: "",
      });
    } else if(loading){
      toastInfo("Please wait...")
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
