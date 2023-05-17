import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MAIN_ROUTE } from '../../constant/urls';

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading,setLoading] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    try {
      
      const response = await fetch(MAIN_ROUTE + 'resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        toast.success("אימייל לאיפוס סיסמא נשלח אליך!");
        handleClose();
        setLoading(false);
      } else {
        toast.info('האימייל לא נמצא במערכת!');
        toast.warn(response);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Link className='text-decoration-none' to={"/login"} onClick={handleClickOpen}>
        שכחת סיסמא?
      </Link>
      <Dialog open={open} onClose={handleClose}>
      {!loading ? 
       <><DialogTitle>איפוס סיסמא</DialogTitle>
        <DialogContent>
          <DialogContentText>
            על מנת לשנות סיסמא אתה מתבקש למלא את האימייל שלך
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="אימייל"
            type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions className='d-flex justify-content-around'>
          <Button color='error' variant='outlined' onClick={handleClose}>ביטול</Button>
          <Button color='success' variant='contained' onClick={handleSubmit}>אישור</Button>
        </DialogActions></>
      : <h2 className='text-center p-5'>Loading...</h2>}
      </Dialog>
    </div>
  );
}