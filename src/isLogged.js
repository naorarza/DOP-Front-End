import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { API_KEY } from "./constant/constants";



const useAuth = () => {
    
    const [user,setUser] = useState(null);
    
    const mutate = async () => {
        try {
            let { data } = await axios({
                method: "GET",
                url:"https://drinkorderparty.cyclic.app/users/userInfo",
                headers: {
                    "x-api-key": localStorage[API_KEY],
                },
            })
            setUser(data);
        }
        catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        mutate();
    }, []);
    
    return {user, mutate};
}

export default useAuth;