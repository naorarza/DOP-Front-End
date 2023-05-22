import { API_KEY } from "./constants"

// const MAIN_ROUTE = "http://localhost:3002/"
const MAIN_ROUTE = "https://drinkorderparty.cyclic.app/"

const LOGIN_ROUTE = MAIN_ROUTE + "users/login"
const SIGNUP_ROUTE = MAIN_ROUTE + "users/signup"
const GET_INFO = MAIN_ROUTE + "users/info"
const TOKEN_HEADER = {'x-api-key':localStorage[API_KEY]}
export { MAIN_ROUTE, SIGNUP_ROUTE, LOGIN_ROUTE, GET_INFO , TOKEN_HEADER }