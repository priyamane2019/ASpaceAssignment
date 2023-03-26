import React, { useState } from 'react';
import signup from "../images/sign-up-img.png";
import './Form1.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cpassword: ""
  });
  let name, value;

  const handleInputes = (e) => {

    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });

  }

  const SubmitForm = async (e)=>
  {


  e.preventDefault();
  const { name, email, phone, address, password, cpassword } = user;


  // here cors error due to complete path ex http://localhost 000...
  const res = await fetch("/register", {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      //name:name, email:email.... not need bcoz key value are same
      name, email, phone, address, password, cpassword
    })
   })
   console.log("man", name);

   const data = await res.json();

   if(res.status === 422 || !data)
   {
     window.alert("Invalid Registration");
     console.log("Invalid Registration");
   }
   else{
    window.alert("successfull Registration");
    console.log("successfull  Registration");
   navigate("/login");//mongodb methode
   }
  }
  return (
    <>
      <section className="signup">
        <div className="container">
          <div className="signup-container">
            <div className="signup-form">
              <h2 className="form-title">Signup</h2>
              <form className='register-form' id="register-form" method="POST">

                <div className="form-group">
                  <label htmlFor="Name"><i className="zmdi zmdi-account"></i></label>
                  <input type="text" name="name" id="name" placeholder='Enter Your Name' autoComplete='off'
                    value={user.name}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <label htmlFor="Email"><i className="zmdi zmdi-email"></i></label>
                  <input type="email" name="email" id="email" placeholder='Enter Your Email' autoComplete='off'
                    value={user.email}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <label htmlFor="PhoneNo"><i className="zmdi zmdi-phone"></i></label>
                  <input type="number" name="phone" id="phoneNo" placeholder='Enter Your PhoneNo' autoComplete='off'
                    value={user.phone}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <label htmlFor="Address"><i className="zmdi zmdi-home"></i></label>
                  <input type="text" name="address" id="address" placeholder='Enter Your Address' autoComplete='off'
                    value={user.address}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <label htmlFor="Password"><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" name="password" id="password" placeholder='Enter Your Password' autoComplete='off'
                    value={user.password}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <label htmlFor="CPassword"><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" name="cpassword" id="cpassword" placeholder=' Confirm Password' autoComplete='off'
                    value={user.cpassword}
                    onChange={handleInputes} />
                </div><br />

                <div className="form-group">
                  <input type="submit" onClick={SubmitForm} name="signup" id="signup" className='form-submit' value="Register" />
                </div><br /><br />
              </form>
            </div>
            <div className="signup-img1">
              <figure>
                <img src={signup} alt="signup-img" />
              </figure>
              <NavLink style = {{textDecoration: 'none'}}  to="/Login" className="signup-imgnv"><span className='sp'>Altready Register</span></NavLink>

            </div>

          </div>
        </div>


      </section>



    </>
  )
}

export default Register