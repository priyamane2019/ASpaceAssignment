import React from 'react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
//import { Navigate } from 'react-router-dom';
const About = () => {
  const navigate = useNavigate();
  const callAboutPage = async () =>{
  try{
      const res = await fetch('/about',{
        method:"GET",
        headers:{

          Accept:"apllication/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
 const data = await res.json();
 console.log(data);
 if(!res.status === 200)
 {
   const error = new Error(res.error);
   throw error;
 }
 
  }catch(err)
  {
    console.log(err);
    navigate("/login");
  }
  }
  useEffect(()=>{
      callAboutPage();
  }, []);
  
  return(
  <>
  <section>
  <form method="GET">
    <h1>First Login</h1>
            </form>
      
     
    

  </section>

  </>
  )
}

export default About