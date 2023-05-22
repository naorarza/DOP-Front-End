import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import React from 'react'
import { useContext } from 'react';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { MAIN_ROUTE } from '../../constant/urls';
import { apiPut } from '../../services/apiServices';

export default function ConnectGoogle() {

    const { user } = useContext(AuthContext);

    const decodeToken = async(data) => {
        const token = data;
        const decodedToken = jwtDecode(token);
        if(user.email !== decodedToken.email){
            return toast.error('האימייל של משתמש הגוגל איננו זהה למשתמש זה')
        }
        else{
            let url = MAIN_ROUTE + 'users/google';
            let sub = decodedToken.sub;
            let data = await apiPut(url, {sub:`${sub}` , picture:`${decodedToken.picture}`});
            console.log(data);
        }
      };
    return (
        <GoogleLogin
          onSuccess={(data) => {
            decodeToken(data.credential);
          }}
          theme="filled_blue"
          text="signin_with"
          shape="pill"
          width="300px"
          type="icon"
          onError={() => {
            toast.warning("החיבור נכשל");
          }}
        />
      );
}
