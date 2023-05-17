import '../css/footer.css'
import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <div className='footerDiv position-static bg-dark text-light d-flex container-fluid justify-content-around'>
        <div className="footerNav mt-3 text-center d-flex flex-wrap col-md-4 col-sm-2 me-2">
            <p>עמוד בית</p>
            <p>גלריה</p>
            <p>מוצרים</p>
            <p>אירועים</p>
        </div>
        <div className="footerIconDad p-4 text-center d-flex justify-content-around align-items-center col-md-4 col-sm-2">
            <Link className='iconFooter fs-4 text-decoration-none text-danger' to="http://instagram.com"><FaInstagram/></Link>
            <Link className='iconFooter fs-4 text-decoration-none text-info' to="http://facebook.com"><FaFacebook/></Link>
            <Link className='iconFooter fs-4 text-decoration-none text-info-emphasis' to="http://tiktok.com"><FaTiktok/></Link>
            <Link className='iconFooter fs-4 text-decoration-none text-primary' to="http://twitter.com"><FaTwitter/></Link>
        </div>
    </div>
  )
}
