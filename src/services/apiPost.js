import axios from "axios";
import { API_KEY } from "../config/config";
const apiPost = async (url, body = {}) => {
    try {
        let { data } = await axios({
            method: "POST",
            url,
            data: body,
            headers: {
                "apiKey": localStorage[API_KEY],
            }
        })
        return data;
    }
    catch (err) {
        throw err;
    }
}


export default apiPost;