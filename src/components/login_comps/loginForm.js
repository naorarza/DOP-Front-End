import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ForgotPassword from "../forgotpassword/forgotPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "./google";
import { GOOGLE_CLIENT_ID } from "../../constant/urls";
import { motion } from "framer-motion";
export default function LoginForm(props) {
  const onSubForm = props.onSubForm;
  const setLoading = props.setLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.4,
      }}
      style={{ border: "3px solid #fff", maxWidth: "400px" }}
      className="rounded-3 container"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center"
      >
        התחברות
      </motion.h2>
      <form
        className="container"
        onSubmit={handleSubmit(onSubForm)}
        id="id_form"
      >
        <motion.label
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          אימייל:
        </motion.label>
        <motion.input
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          {...register("email", {
            required: true,
            pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          })}
          className="form-control"
          type="text"
          placeholder="הכנס אימייל.."
        />
        {errors.email && <div className="text-danger">* הכנס אימייל תקין</div>}
        <motion.label
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          סיסמא:
        </motion.label>
        <motion.input
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          {...register("password", { required: true, minLength: 2 })}
          className="form-control"
          type="password"
          placeholder="הכנס סיסמא.."
        />
        {errors.password && (
          <div className="text-danger">* הכנס סיסמא תקינה</div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="d-flex justify-content-center"
        >
          <Button
            type="submit"
            variant="contained"
            color="info"
            className="mt-3 btn btn-info"
          >
            התחבר
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="d-flex m-3 justify-content-between"
        >
          <ForgotPassword />
          <Link className="text-decoration-none" to="/signup">
            אין לך משתמש?
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="d-flex mb-4 align-items-center justify-content-center"
        >
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Google />
          </GoogleOAuthProvider>
        </motion.div>
      </form>
    </motion.div>
  );
}
