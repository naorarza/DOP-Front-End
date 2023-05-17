import { Button } from '@mui/material';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ForgotPassword from '../forgotpassword/forgotPassword';

export default function LoginForm(props) {
    
    // const handleClickOpen = props.handleClickOpen;
    // const handleClose = props.handleClose;
    const onSubForm = props.onSubForm;

    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  return (
    <div
        style={{ border: "3px solid #fff", maxWidth: "400px" }}
        className="rounded-3 container"
      >
        <h2 className="text-center">התחברות</h2>
        <form
          className="container"
          onSubmit={handleSubmit(onSubForm)}
          id="id_form"
        >
          <label>אימייל:</label>
          <input
            {...register("email", {
              required: true,
              pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            })}
            className="form-control"
            type="text"
            placeholder="הכנס אימייל.."
          />
          {errors.email && (
            <div className="text-danger">* הכנס אימייל תקין</div>
          )}
          <label>סיסמא:</label>
          <input
            {...register("password", { required: true, minLength: 2 })}
            className="form-control"
            type="password"
            placeholder="הכנס סיסמא.."
          />
          {errors.password && (
            <div className="text-danger">* הכנס סיסמא תקינה</div>
          )}
          <div className="d-flex justify-content-center">
            <Button type='submit' variant='contained' color='info' className="mt-3 btn btn-info">התחבר</Button>
          </div>
          <div className="d-flex m-3 justify-content-between">
            <ForgotPassword />
            <Link className="text-decoration-none" to="/signup">
              אין לך משתמש?
            </Link>
          </div>
        </form>
      </div>
  )
}
