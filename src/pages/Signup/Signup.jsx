import React from 'react';
import { Form, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';


const Signup = () => {
  return (
    <div className='sign-up-page' >
    <div className="sign-up-container">
      <div><img src={logo} alt="logo.png" className='sign-up-logo' /></div>
      <Form className='sign-up-form'>
        <input type="text" placeholder='FirstName' />
        <input type="text" placeholder='LastName' />
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Password' />
        <button type='submit'>create account</button>
      </Form>
      <div className="signup-suggestion">
        <h3>
          Already have an account?
        </h3>
        <Link to="/login" className='sign-in-btn'>Log In</Link>
      </div>
    </div>
  </div>
  )
}

export default Signup
