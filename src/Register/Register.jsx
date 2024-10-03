import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useFormik } from 'formik';

export default function Register() {
  let { UserData } = useContext(AuthContext);
  let usr={
    uid: 0,
    eid: 0,
    login_Name: "string",
    email: "string",
    fname: "string",
    lname: "string",
    password: "string",
    job_Title: "string",
    department: "string",
    mobilePhone: "string",
    phone: "string",
    email_Verified: "string",
    create_Date: "2023-10-05T15:46:30.508Z",
    status: "string",
    did: 0,
  }
  let Codeformik =useFormik({
    initialValues:{
      uid: UserData.uid,
      eid: 0,
      login_Name: "string",
      email: "string",
      fname: "string",
      lname: "string",
      password: "string",
      job_Title: "string",
      department: "string",
      mobilePhone: "string",
      phone: "string",
      email_Verified: "string",
      create_Date: "2023-10-05T15:46:30.508Z",
      status: "string",
      did: 0,
        
    },
    //onSubmit:confirmCode,
    //validate: codeValidation
})
  return (
    <>
      {console.log(UserData)}
      <form action="" className=''>

        <div className="w-75 m-auto my-5 pb-5 shadow">

          <div className='w-100 text-center text-bg-dark py-3 fw-bolder fs-4'>Complete Your Profile</div>


          <div className='row d-flex flex-wrap justify-content-between w-100'>

            <div className='col-md-8 rounded-2'>
              <label htmlFor='email' className='my-1 fw-bold'>E-mail:</label>
              <input type='text' className='form-control' id='email' name='email' value={UserData.email} disabled={true}></input>
            </div>

            <div className='col-md-3 py-2 rounded-2'>
              <label htmlFor='eid' className='my-1 fw-bold'>EMP ID:</label>
              <input type='text' className='form-control' id='eid' name='eid' value={UserData.eid}></input>
            </div>


            <div className='col-md-6 py-2 rounded-2'>
              <label htmlFor='fname' className='my-1 fw-bold'>First Name:</label>
              <input type='text' className='form-control' id='fname' name='fname' value={UserData.fname}></input>
            </div>

            <div className='col-md-6 py-2 rounded-2'>
              <label htmlFor='lname' className='my-1 fw-bold'>Last Name:</label>
              <input type='text' className='form-control' id='lname' name='lname' value={UserData.lname}></input>
            </div>

            <h5 className='text-bg-dark w-100 text-start p-2 m-2 fs-6'>Login Info</h5>

            <div className='col-md-3 py-2 rounded-2'>
              <label htmlFor='login' className='my-1 fw-bold'>Login:</label>
              <input type='text' className='form-control' id='login' name='login' value={UserData.login_Name}></input>
            </div>

            <div className='col-md-3 py-2 rounded-2'>
              <label htmlFor='pass' className='my-1 fw-bold'>Password:</label>
              <input type='password' className='form-control' id='pass' name='pass' value={UserData.password}></input>
            </div>
            <div className='col-md-3 py-2 rounded-2'>
              <label htmlFor='repass' className='my-1 fw-bold'>Confirm Password:</label>
              <input type='password' className='form-control' id='repass' name='repass' ></input>
            </div>


            <h5 className='text-bg-dark w-100 text-start p-2 m-2 fs-6'>Job Info</h5>

            <div className='col-md-6 py-2 rounded-2'>
              <label htmlFor='job' className='my-1 fw-bold'>Job Title:</label>
              <input type='text' className='form-control' id='job' name='job' value={UserData.job_Title}></input>
            </div>
            <div className='col-md-6 py-2 rounded-2'>
              <label htmlFor='dept' className='my-1 fw-bold'>Department:</label>
              <input type='text' className='form-control' id='dept' name='dept' value={UserData.department}></input>
            </div>

          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </>

  )
}
