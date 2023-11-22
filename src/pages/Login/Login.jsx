import React, { useEffect, useState } from "react";
import logo from "assets/logo.png";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import {useFetch} from "components/CustomHook";
import { setLocalStorage, toastSuccess, toastError } from '@/Utils';
import { getLocalStorage } from '@/Utils';



const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, loading, error, response, fetchData } = useFetch();

const currentUser = getLocalStorage("headerData");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = getLocalStorage("currentUser") || navigate("/login");
    const userName = user ? user.email.split("@")[0] : null;

     if(currentUser){
      toastError(`${userName.toUpperCase()}, Already Login`)
      navigate("/dashboard/home")
    } else{
      const url = "http://206.189.91.54/api/v1/auth/sign_in";
    const config = {
      method: "POST",
      body: {
        email: input.email,
        password: input.password,
      },
    };

    fetchData(url, config);
    }

   
  };

  useEffect(() => {
    if (!loading && !error && data) {
      console.log("Data has changed, processing...");
      console.log(data);
      console.log(response);

      const headerData = {
        uid: response.headers.get("uid"),
        "access-token": response.headers.get("access-token"),
        expiry: response.headers.get("expiry"),
        client: response.headers.get("client"),
      };

      if (response.status === 200) {
        console.log("Successful Login");
        toastSuccess("Successful Login")
        setLocalStorage("headerData", headerData)
        setLocalStorage("currentUser", data.data)
        navigate("/dashboard/home");
      } else if (response.status !== 200) {
        toastError(data.errors.full_messages[0])
        console.log(data);
        console.log(data.errors.full_messages[0]);
      }

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
          />
          <Input
            name="password"
            value={input.password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button type="submit" text="Log In" />
        </Form>
        <div className="suggestion-container">
          <h3>Don't have account?</h3>
          <Link to="/signup" className="sign-up-btn">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
