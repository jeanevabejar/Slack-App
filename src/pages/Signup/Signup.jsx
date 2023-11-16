import React from 'react';
import { Form, Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import logo from 'assets/logo.png';


const Signup = () => {
  return (
    <div className='sign-up-page' >
    <div className="sign-up-container">
      <div><img src={logo} alt="logo.png" className='sign-up-logo' /></div>
      <Form className='sign-up-form' >
        <Input type="text" placeholder='FullName' />
        <Input type="email" placeholder='Email' />
        <Input type="text" placeholder='UserName' />
        <Input type="password" placeholder='Password' />
        <Input type="password" placeholder='Confirm Password' />
        <Button type='submit' text="create account"/>
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
