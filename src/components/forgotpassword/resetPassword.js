import React, { useState } from 'react';
import axios from 'axios';
import { MAIN_ROUTE } from '../../constant/urls';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import { LockResetOutlined } from '@mui/icons-material';

const ResetPassword = (props) => {
  // Initialize state variables to hold the user's new password and confirmation password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const nav = useNavigate();
    const token = useParams();
    

  // Handle form submission
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if(password !== confirmPassword){
        return toast.warn('הסיסמאות חייבות להיות זהות')
    }
    // Make a POST request to the server to reset the user's password
    try {
        
        await axios.post(MAIN_ROUTE + 'resetPassword/resetpsw/' , {
            password,
            confirmPassword,
            token
        });
        
        // Redirect the user to the login page upon successful password reset
        nav('/login');
        toast.success('הסיסמא שונתה בהצלחה!')
    } catch (error) {
      // Handle any errors that occur during the password reset process
      toast.error("הקישור שומש כבר בעבר!");
    }
  };


  
  // Render the password reset form
  return (
   <div className="d-flex align-items-center"
      style={{ background: "#313131", color: "white", minHeight: "95vh" }}>
      <div
        style={{ border: "3px solid #fff", maxWidth: "400px" }}
        className="rounded-3 container"
      >
      <div className='d-flex justify-content-around align-items-center'>
      <LockResetOutlined/>
      <h2 className='text-center p-2'>איפוס סיסמא</h2>
      <LockResetOutlined/>
      </div>
      <hr />
      <form className="container d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
        <div className='d-flex justify-content-center'>
          <TextField
            id="demo-helper-text-misaligned"
            label="סיסמא חדשה"
            helperText="הכנס סיסמא חדשה"
          className='m-2'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='d-flex justify-content-center'>
          <TextField
          className='m-2'
          id="demo-helper-text-misaligned"
            label="אימות סיסמא"
            helperText="הכנס שוב את הסיסמא החדשה"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="d-flex justify-content-center m-3">
        <Button color='success' variant='contained' type="submit">אישור</Button>
      </div>
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;