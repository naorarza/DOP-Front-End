import axios from "axios";
import { toast } from "react-toastify";
import { API_KEY } from "../constant/constants";
import { MAIN_ROUTE } from "../constant/urls";

const apiGet = async (url, body = {}) => {
  try {
    let { data } = await axios({
      method: "GET",
      url,
      headers: {
        "x-api-key": localStorage[API_KEY],
      },
      data: body,
    });
    return data;
  } catch (err) {
    throw err;
  }
}
const apiPost = async (url, body) => {
  console.log('consoleLogTest2: ' , body);

  try {
    let { data } = await axios({
      method: "POST",
      url,
      data: body,
      headers: {
        "x-api-key": localStorage[API_KEY],
      },
    });
    return data;
  } catch (err) {
    toast.error(err.response.data.msg);
    throw err;
  }
};

const apiPostGoogle = async (url, body) => {
  try {
    let { data } = await axios({
      method: "POST",
      url,
      data: body,
      headers: {
        "x-api-key": localStorage[API_KEY],
      },
    });
    return data;
  } catch (err) {
    toast.info(err.response.data.msg);
    throw err;
  }
};

const apiPut = async (url, body = {}) => {
  try {
    let { data } = await axios({
      method: "PUT",
      url,
      headers: {
        "x-api-key": localStorage[API_KEY],
      },
      data: body,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

const doApiDelete = async(_url) => {
    try{
      const resp = await axios({
        method:"DELETE",
        url:_url,
        headers:{'x-api-key':localStorage[API_KEY]},
      })
      return resp.data;
    }
    catch(err){
      throw err;
    }
  }

// const apiDelete = async (url, body) => {
//   try {
//     let { data } = await axios({
//       method: "DELETE",
//       url,
//       headers: {
//         "x-api-key": localStorage[API_KEY],
//       },
//       data: body,
//     });
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };



export { apiGet, apiPost, apiPut, doApiDelete , apiPostGoogle };
