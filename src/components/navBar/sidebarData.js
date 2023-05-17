
import { MenuOpenOutlined } from '@mui/icons-material'
import React from 'react'
import { AiFillHome, AiFillShopping } from 'react-icons/ai'
import { BiParty } from 'react-icons/bi'
import { FaImages } from 'react-icons/fa'

export const SidebarData =  [
    {
        title: "דף הבית",
        path: "/",
        icons: <AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "גלריה",
        path: "/gallery",
        icons: <FaImages />,
        cName: "nav-text",
    },
    {
        title: "תפריט",
        path: "/menu",
        icons: <MenuOpenOutlined />,
        cName: "nav-text",
    },
    {
        title: "מוצרים",
        path: "/products",
        icons: <AiFillShopping />,
        cName: "nav-text",
    },
    {
        title: "אירועים",
        path: "/events",
        icons: <BiParty />,
        cName: "nav-text",
    },
]
