import React, { useState, useEffect } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import Button from "components/Button";
import Input from "components/Input";
import logo from "assets/logo.png";
import { toastError, toastSuccess, getLocalStorage } from "@/Utils";
import { useFetch } from "components/CustomHook";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { data, loading, error, fetchData } = useFetch();
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    const currentUser = getLocalStorage("headerData");
    e.preventDefault();
    if (!isPasswordValid(input.password)) {
      toastError("Password must be at least 6 characters long");
    } else {
      if (currentUser) {
        toastError(`${userName.toUpperCase()}, Already Login`);
        navigate("/dashboard/home");
      } else {
        const url = "http://206.189.91.54/api/v1/auth";
        const config = {
          method: "POST",
          body: {
            email: input.email,
            password: input.password,
            password_confirmation: input.password_confirmation,
          },
        };
        fetchData(url, config);
      }
    }
  };

  useEffect(() => {
    if (!loading && !error && data) {
      if (data.status === "success") {
        toastSuccess("Successful: Account Created");
        console.log("Successful: Account Created", data);
        navigate("/login");
        setInput({
          email: "",
          password: "",
          password_confirmation: "",
        });
      } else if (data.status === "error") {
        console.log("Error:", data);
        toastError(data.errors.full_messages[0]);
      }
    }
  }, [data, loading, error, navigate]);

  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <div>
          <img src={logo} alt="logo.png" className="sign-up-logo" />
        </div>
        <Form className="sign-up-form" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
            value={input.password_confirmation}
            onChange={handleChange}
            required
          />
          <Button type="submit" text="create account" />
        </Form>
        <div className="signup-suggestion">
          <h3>Already have an account?</h3>
          <Link to="/login" className="sign-in-btn">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
