import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';

export default function NewTicket() {
  let { UserData,UserIsLogedIn } = useContext(AuthContext);
  
  let ticket={
    tid: 0,
    subject: "",
    department: "IT Department",
    issue: "",
    status: "",
    open_Date: "",
    close_Date: "",
    solution: "",
    uid: 0,
  }

  let Codeformik =useFormik({
    initialValues:{
      tid: 0,
      subject: "",
      department: "IT Department",
      issue: "",
      status: "",
      open_Date: "",
      close_Date: "",
      solution: "",
      uid: 0,
        
    },
    onSubmit:createTicket,
    validate: validateTicket
})

async function createTicket(){

}
async function validateTicket(){

}
useEffect(() => {
  console.log("newt ");
  if (UserIsLogedIn) {
      console.log("newt",UserData);
     
  }

}, []);

  return (
    <>
    <div className=' '>
      
      <form action="" className=''>

        <div className="m-auto my-5 pt-3">

          <div className='mx-auto my-3 text-center  py-1 fw-bolder fs-4 bg-aqua rounded-3 text-dark '>Open New Ticket</div>

          <div className='row d-flex flex-wrap justify-content-between w-100'>

          <div className='col-md-8 py-2 rounded-2'>
              <label htmlFor='subject' className='my-1 fw-bold'>Subject</label>
              <input type='text' className='form-control text-dark ' id='subject' name='subject' ></input>
            </div>
            
            <div className='col-md-3 py-2 rounded-2'>
              <label htmlFor='eid' className='my-1 fw-bold'>Target Department:</label>
              <input type='text' className='form-control' id='eid' name='eid' value={'IT Department'} disabled={true}></input>
            </div>

            <div className='col-md-8 rounded-2'>
              <label htmlFor='email' className='my-1 fw-bold'>Discribe your issue:</label>
              <textarea type='text' rows="4" cols="50" className='form-control' id='email' name='email' ></textarea>
            </div>
            
          <div className='col-md-8 rounded-2'>
          <button type="submit" className="btn btn-primary my-5 float-end">Submit</button>
          </div>
          </div>
        </div>
        
      </form>
      </div>
    </>

  )
}
