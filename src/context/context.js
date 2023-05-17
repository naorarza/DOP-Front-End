import { createContext } from "react";
import { apiGet } from "../services/apiServices";
import { MAIN_ROUTE } from "../constant/urls";


const apiGetNum = async()=>{
    let url = MAIN_ROUTE + 'users/newProduct';
    const data = apiGet(url);
    return data;
}

let newProductInCartCounter = createContext(apiGetNum());

export default newProductInCartCounter;