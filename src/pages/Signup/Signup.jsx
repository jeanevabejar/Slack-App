import React, { useState, useEffect } from 'react';
import { Form, Link, useNavigate } from 'react-router-dom';
import Button from 'Components/Button';
import Input from 'Components/Input';
import logo from 'assets/logo.png';
import { toastError, toastSuccess, getLocalStorage } from '@/Utils';
import { useFetch } from 'Components/CustomHook';

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Custom hook for fetching data
  const { data, loading, error, fetchData } = useFetch();

  const isPasswordValid = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current user data from local storage
    const currentUser = getLocalStorage('headerData');

    if (!isPasswordValid(input.password)) {
      toastError('Password must be at least 6 characters long');
    } else {
      if (currentUser) {
        // Display error if a user is already logged in
        toastError('Already logged in');
        navigate('/dashboard/home');
      } else {
        // Submit signup request if no user is logged in
        const url = 'http://206.189.91.54/api/v1/auth';
        const config = {
          method: 'POST',
          body: {
            email: input.email.toLowerCase(),
            password: input.password,
            password_confirmation: input.password_confirmation,
          },
        };
        fetchData(url, config);
      }
    }
  };

  useEffect(() => {
    // Handle response data after signup request
    if (!loading && !error && data) {
      if (data.status === 'success') {
        // Display success message and navigate to login page
        toastSuccess('Account Created Successfully');
        console.log('Successful: Account Created', data);
        navigate('/login');
        // Reset input fields
        setInput({
          email: '',
          password: '',
          password_confirmation: '',
        });
      } else if (data.status === 'error') {
        // Display error message if signup fails
        console.log('Error:', data);
        toastError(data.errors.full_messages[0]);
      }
    }
  }, [data, loading, error, navigate]);

  // JSX structure for the signup page
  return (
    <div className="sign-up-page">
      <div className="sign-up-container">
        <div>
          <img src={logo} alt="logo.png" className="sign-up-logo" />
        </div>
        <Form className="sign-up-form" onSubmit={handleSubmit}>
          {/* Input fields for email, password, and password confirmation */}
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
          {/* Button to submit the signup form */}
          <Button type="submit" text="Create Account" />
        </Form>
        <div className="signup-suggestion">
          <h3>Already have an account?</h3>
          {/* Link to navigate to the login page */}
          <Link to="/login" className="sign-in-btn">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
