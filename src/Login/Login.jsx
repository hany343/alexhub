import React, { useEffect, useState, useContext } from 'react';
import logo from '../Assets/result.png';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserData, UserIsLogedIn, setUserIsLogedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      loginName: '',
      password: ''
    },
    onSubmit: login,
    validate: validation
  });

  function validation(values) {
    let errors = {};
    if (formik.values.loginName.length <= 5 && formik.values.loginName.length > 0) {
      errors.loginName = 'User Name not valid!';
    }
    return errors;
  }

  async function login() {
    setIsLoading(true);

    const loginUser = {
      Login_Name: formik.values.loginName,
      Password: formik.values.password
    };
var locs={
  'date':'',
  'usr':Object
}
    try {
      const result = await axios.post('http://localhost:5077/Users/Login', loginUser);
      if (result.status === 200) {
        setUserIsLogedIn(true);
        setUserData(result.data);
        
        locs.date= new Date().getTime();
        locs.usr=result.data;
        localStorage.setItem('user', JSON.stringify(locs)); // Store user data in localStorage, including user ID
        navigate('/Dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (UserIsLogedIn) {
      console.log('Logged in successfully');
    }

    else {
      console.log('Login failed');
    
    }
  }, [UserIsLogedIn]);

  return (
    <>
      {isLoading &&
        <div className="isloading z-3 top-0 end-0 start-0 bottom-0 position-absolute text-bg-dark opacity-25 d-flex justify-content-center align-items-center">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading...</p>
          </div>
        </div>
      }
      {UserIsLogedIn ? (
        <Navigate to="/Dashboard" />
      ) : (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo my-3" alt="logo" />
            <div className="rounded-3 text-center text-black d-block p-3">
              <h3 className="Text3D">Welcome to Alex Support Application</h3>
            </div>
            <div className="border-2 rounded-3 shadow-lg text-center p-3 bg-gradient my-3 w-25">
              <input
                value={formik.values.loginName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                id="loginName"
                name="loginName"
                placeholder="User Name"
                className="form-control w-100 mt-2"
                style={{ height: "50px", fontSize: '20px' }}
              />
              {formik.errors.loginName && formik.touched.loginName && (
                <span className="text-danger fs-6 fw-lighter">{formik.errors.loginName}</span>
              )}
              <input
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control w-100 mt-2"
                style={{ height: "50px", fontSize: '20px' }}
              />
              {formik.errors.password && formik.touched.password && (
                <span className="text-danger">{formik.errors.password}</span>
              )}
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="btn btn-primary rounded shadow border-0 w-100 mt-2 fw-bold"
                style={{ cursor: 'pointer', height: '50px', fontSize: '26px' }}
                id="login"
              >
                Login <i className="bi bi-key-fill"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
