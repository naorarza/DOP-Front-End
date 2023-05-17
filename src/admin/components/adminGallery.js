import React from 'react'
import useAuth from '../../isLogged'
import AdminPhotos from './adminPhotos'
// import ImageUploader from './imageUploader'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Link } from 'react-router-dom';

export default function AdminGallery() {
  
    const {user} = useAuth();

    return (
    <>{user?.role === "admin" ? 
        <div className="container mt-5">
          <h2 className="text-center m-3 display-3">Gallery</h2>
          {/* <ImageUploader/> */}
          <Link id='uploadImage' to="/admin/gallery/uploadImage">
          <AddPhotoAlternateIcon id="uploadImageIcon" style={{color:"blue" , fontSize:"1.5em"}}/>
          </Link>
          <hr />
          <AdminPhotos/>
        </div>
        : <h2>Page Not Found Error 404!</h2>}
        </>
    )
}
