import React, { useEffect, useState } from "react"
import logo from '../Assets/A512.png';
import axios from 'axios'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate, useNavigate }   from "react-router-dom";
export default function Login() {
  
  var loginUser={
    'Login_Name':'',
    'Password':''
  }
    const [isLoading, setIsLoading]=useState(true)
    let {UserData,setUserData,UserIsLogedIn, setUserIsLogedIn}=useContext(AuthContext);
    const navigate = useNavigate();
    let formik =useFormik({
        initialValues:{
          loginName:'',
          password:''
        },
        onSubmit:login,
        validate: validation
    }) 
   
    function validation(values){
        let errors={}
        if(formik.values.loginName.length>5){
            
        }else if(formik.values.loginName.length>0){
            errors.loginName='User Name not valid!'
        }

        return errors;
    }
   

      async function login(){
        setIsLoading(true);
        loginUser.Login_Name=formik.values.loginName;
        loginUser.Password=formik.values.password;
        axios.post(`http://localhost:5077/Users/Login`,loginUser)
        .then(async(result) => {
           console.log(result)
            if(result.status==200){
                setUserIsLogedIn(true)
                setUserData(result.data.value)
                navigate('/Dashboard')
               
            }
            setIsLoading(false);
          })
        .catch(err => {
          console.log(err.response.data)
        })
        setIsLoading(false);
  
    }
   
    useEffect(() => {
      setIsLoading(false);
     
    }, []);

      useEffect(() => {
        if(UserIsLogedIn){
          console.log('logedsuccess')
          localStorage.setItem('userkey', JSON.stringify(UserData));
        }else{
          console.log('logedfail')
        }
       
      }, [UserIsLogedIn]);



    return (
    <>
    
    {
        isLoading?
        <div className="isloading z-3 top-0 end-0 start-0 bottom-0 position-absolute text-bg-dark opacity-25">
             <img src={logo} className="App-logo" alt="logo" />
        </div>
        :
        ''
    }
{
    UserIsLogedIn?
    <Navigate to="/Dashboard"/>
    :
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo my-3" alt="logo" />
               

                <div className="rounded-3 text-center text-black d-block bg-aqua p-3">
                    <h3>Welcome to AlexApp</h3>
                </div>

                {
                    <>
                    <div className="border-2  rounded-3 shadow-lg text-center p-3 bg-gradient my-3"> 
                    
                    <input value={formik.values.loginName} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="loginName" name="loginName" placeholder="User Name" className="form-control w-100 mt-2"/>
                    {formik.errors.loginName && formik.touched.loginName? <span className="text-danger fs-6 fw-lighter">{formik.errors.loginName}</span>:null}
                    
                    <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password" name="password" placeholder="Password" className="form-control w-100 mt-2"/>
                    {formik.errors.password && formik.touched.password? <span className="text-danger">{formik.errors.password}</span>:null}
                    
                    <button type="submit" onClick={formik.handleSubmit} className="btn-primary text-bg-primary px-3 rounded shadow m-2 border-0 fs-5" 
                    style={{cursor:'pointer'}} id="login" >login</button>
                    
                    
                    </div>
                    </>
                   
                }

            </div >
        </div > 
        
        
}

    </>

    )
              }