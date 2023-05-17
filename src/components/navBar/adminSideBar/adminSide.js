
import { AddPhotoAlternate, CategoryOutlined, Event, ListAltRounded } from '@mui/icons-material'
import React from 'react'
import { BsFillBagPlusFill } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'

export const AdminSide = [
    // {
    //     title: "עריכת גלריה",
    //     path: "/admin/gallery",
    //     icons: <AddPhotoAlternate />,
    //     cName: "nav-text",
    // },
    {
        title: "עריכת מוצרים",
        path: "/admin/products",
        icons: <BsFillBagPlusFill />,
        cName: "nav-text",
    },
    {
        title: "עריכת קטגוריות",
        path: "/admin/categories",
        icons: <CategoryOutlined />,
        cName: "nav-text",
    },
    {
        title: "ניהול הזמנות",
        path: "/admin/orders",
        icons: <ListAltRounded />,
        cName: "nav-text",
    },
    {
        title: "פאנל אירועים",
        path: "/admin/events",
        icons: <Event />,
        cName: "nav-text",
    },
    {
        title: "רשימת משתמשים",
        path: "/admin/users/edit",
        icons: <FaUsers />,
        cName: "nav-text",
    },
]
