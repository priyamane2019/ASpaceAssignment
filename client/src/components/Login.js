import React from 'react';
import signin from "../images/signin.jpg";
import './Form1.css';
import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useState} from "react";


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  loginUser = async (e)=>
  {
  e.preventDefault();

  // here cors error due to complete path ex http://localhost 000...
  const res = await fetch("/login", {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      //name:name, email:email.... not need bcoz key value are same
      email, password
    })
   })
   

   const data = await res.json();

   if(res.status === 400 || !data)
   {
     window.alert("Invalid Login");
     
   }
   else{
    window.alert("successfull Login");
   navigate("/");//mongodb methode
   }
  }
  
  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signin-container">
          <div className="signin-img1">
  <figure>
    <img src={signin} alt="signin-img"  />
  </figure>
 <NavLink style = {{textDecoration: 'none'}}  to="/Register" className="signup-imgnv"><span className='sp'> Create an Account</span></NavLink>

       </div>
            <div className="signin-form">
       <h2 className="form-title">Login</h2>
       <form  method="POST" className='register-form' id="register-form">

  <div className="form-group">
    <label htmlFor="Email"><i className="zmdi zmdi-email"></i></label>
    <input type="email" name="email" id="email" placeholder='Enter Your Email'  autoComplete='off' 
    value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div><br/><br/>

  <div className="form-group">
    <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
    <input type="password" name="password" id="password" placeholder='Enter Your Password' autoComplete='off' 
    value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div><br/>


  <div className="form-group">
    <input type="submit" name="signup" id="signup" className='form-submit'  onClick={loginUser} value="Login" />
  </div><br/><br/>
       </form>
       </div>
       
            
          </div>
        </div>
      </section>



    </>
  )
}

export default Login