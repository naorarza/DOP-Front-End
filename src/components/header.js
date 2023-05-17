import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import {  FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

export default function Header() {
    
    const {user} = useContext(AuthContext);
    const nav = useNavigate();
    
    useEffect(() => {

    },[user])

    return (
        <header className="container-fluid shadow-sm">
            <div className="container d-flex justify-content-around">
                <div className="row align-items-center">
                    <nav className=" col-auto">
                        <ul className="d-flex">
                            <li><Link to="/">דף הבית</Link></li>
                            <li><Link to="/gallery">גלריה</Link></li>
                            <li><Link to="/products">מוצרים</Link></li>
                            <li><Link to="/events">אירועים</Link></li>
                            {user?.name ? <li><Link to="/profile">פרופיל</Link></li>
                            :<li><Link to="/login">התחברות/הרשמה</Link></li>
                            }
                            </ul>
                    </nav>
                </div>
                {user?.name ? <div onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} className="btn"><FaSignOutAlt/></div> : <></>}
                    <div className="logo col-auto"><h2>D.O.P</h2></div>
            </div>
        </header>
    )
}