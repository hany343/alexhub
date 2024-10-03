import React, { useEffect, useState } from "react"
import logo from '../Assets/A512.png';
import axios from 'axios'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate }   from "react-router-dom";
export default function Home() {

    const [codeSentSuccessful, setCodeSuccess] = useState(false)
    const [isLoading, setIsLoading]=useState(false)
    let {setUserData}=useContext(AuthContext);
    const navigate = useNavigate();
    let formik =useFormik({
        initialValues:{
            alexemail:''
        },
        onSubmit:sendCode,
        validate: validation
    })
    
    let Codeformik =useFormik({
        initialValues:{
            confirmationCode:'',
            
        },
        onSubmit:confirmCode,
        validate: codeValidation
    })
    function validation(values){
        let errors={}
        if(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(alexapparels.com.eg|alpinecreations.com)$/g.test(values.alexemail)){
            
        }else{
            errors.alexemail='Email not valid!'
        }

        return errors;
    }
    function codeValidation(values){

        let errors={}
        if(/^[0-9]{6}$/g.test(values.confirmationCode)){
            
        }else{
            errors.confirmationCode='Invalid Code'
        }

        return errors;
    }

    async function sendCode(){
        setIsLoading(true);
        //axios.get(`https://api.lobridge.com/api/Emails/${formik.values.alexemail}`)
        axios.get(`https://localhost:7165/api/Emails/${formik.values.alexemail}`)
        .then(async(result) => {
            if(result.data==='success'){
                setCodeSuccess(true)
            }
            setIsLoading(false);
          })
        .catch(err => {
           console.log(err)
        })
        setIsLoading(false);
    }
      async function confirmCode(){
        setIsLoading(true);
        axios.post(`https://localhost:7165/api/Emails/${formik.values.alexemail},${Codeformik.values.confirmationCode}`)
        //axios.post(`https://api.lobridge.com/api/Emails/${formik.values.alexemail},${Codeformik.values.confirmationCode}`)
        .then(async(result) => {
            console.log(result.data.message)
            if(result.data.message==='Success'){
                //hany.r@alpinecreations.com
                setUserData(result.data.userData)
                //event.preventDefault()
                 console.log("navgate")
                navigate('/register')
               
            }else if(result.data.message==='Wrong'){
                console.log("Wrong")
                Codeformik.errors.confirmationCode='Wrong Code'
            }
            setIsLoading(false);
          })
        .catch(err => {
           console.log(err)
        })
        setIsLoading(false);
  
    }
    async function fetchUserData() {
        axios.post(`https://localhost:7165/api/Emails/hany.r@alpinecreations.com,222333`)
        //axios.post(`https://api.lobridge.com/api/Emails/${formik.values.alexemail},${Codeformik.values.confirmationCode}`)
        .then(async(result) => {
            console.log(result.data.message)
            if(result.data.message==='Success'){
                //hany.r@alpinecreations.com
                setUserData(result.data.userData)

                //event.preventDefault()
                 console.log(result.data.userData)
               // navigate('/register')
               
            }
            setIsLoading(false);
          })
        .catch(err => {
           console.log(err)
        })
        // let {data} = axios.get("https://api.lobridge.com/api/Users")
        // .then(async(result)=>{
        //      console.log(data);
        // setUsers( data)
        // })

       
    }

    useEffect(() => {
        // call api or anything
        //fetchUserData();
        //console.log("loaded");
    }, []);


    return (<>
    
    {
        isLoading?
        <div className="isloading z-3 top-0 end-0 start-0 bottom-0 position-absolute text-bg-dark">
             
             <img src={logo} className="App-logo" alt="logo" />
        </div>
        :
        null
    }
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                
                <div className="rounded-3 text-center text-black d-block bg-aqua p-3">
                    <h3>Welcome to Alex Support</h3>
                </div>
                <hr/>
                <p>{codeSentSuccessful}</p>
                {
                    codeSentSuccessful? 
                    <>

                    <div className="border-2 rounded-3 shadow-lg text-center p-3 bg-gradient my-3">
                     <p className=" text-success fs-5">
                        Confirmation code sent to <br></br><span className="fw-bold">{formik.values.alexemail}</span>
                    </p>

                    <input value={Codeformik.values.confirmationCode} onChange={Codeformik.handleChange} type="text" id="confirmationCode" name="confirmationCode" placeholder="Enter Confirmation Code"
                     className="form-control"/>
                    <span className="text-danger">{Codeformik.errors.confirmationCode}</span>
                    <span onClick={Codeformik.handleSubmit} className="btn-primary text-bg-primary px-3 py-1 rounded shadow m-2 border-0 fs-6" id="alex-register">Verify</span>
                    </div> 
                    </>
                    :
                    <>
                    <p>Activate Your Account</p>
                    <input value={formik.values.alexemail} onChange={formik.handleChange} type="text" id="alexemail" name="alexemail" placeholder="Enter Your Alpine E-mail" className="form-control w-25"/>
                    <span className="text-danger">{formik.errors.alexemail}</span>
                    <span onClick={formik.handleSubmit} className="btn-primary text-bg-primary px-3 rounded shadow m-2 border-0 fs-5" id="alex-register">Send Code</span>
                    </>
                   
                }
               
                   
            </div >
        </div > 
    </>

    )
}