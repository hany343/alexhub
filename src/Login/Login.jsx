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
        axios.get(`https://localhost:7165/api/Users/Login/${formik.values.loginName},${formik.values.password}`)
        //axios.post(`https://api.lobridge.com/api/Emails/${formik.values.alexemail},${Codeformik.values.confirmationCode}`)
        .then(async(result) => {
            console.log(result.data.message)
            
            if(result.data.message==='Success'){
                
                console.log(result.data.userData)
                
                
                setUserIsLogedIn(true)
                console.log(UserIsLogedIn+' userlogiedin')
                setUserData(result.data.userData)

                this.setState({UserIsLogedIn: true});
                this.setState({UserData: result.data.userData});
                navigate('/Dashboard')
               
            }
            setIsLoading(false);
          })
        .catch(err => {
           console.log(err)
        })
        setIsLoading(false);
  
    }
   
      useEffect(() => {
        setIsLoading(false);
        console.log("effect1");
        console.log("isloged - "+UserIsLogedIn)
         console.log("userdatadata ",UserData);
       
    
      },[]);
      useEffect(() => {
         console.log("effect2");
        console.log("isloged - "+UserIsLogedIn)
         console.log("userdatadata ",UserData);
       
        localStorage.setItem('userkey', JSON.stringify(UserData));
      }, [UserIsLogedIn]);

   useEffect(() => {
     console.log("effect3");
       console.log("isloged - "+UserIsLogedIn)
         console.log("userdatadata ",UserData);
       
        localStorage.setItem('userkey', JSON.stringify(UserData));
      });


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
                    
                    <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="password" name="password" placeholder="Password" className="form-control w-100 mt-2"/>
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