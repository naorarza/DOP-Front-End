import { API_KEY } from "./constants"

// for netlify
// const MAIN_ROUTE = "https://drinkorderparty.cyclic.app/"
// const GOOGLE_CLIENT_ID = '955397316061-b8dsfg2guvtfvnncavjnan8ul6cef8hc.apps.googleusercontent.com';
// for localHost
const MAIN_ROUTE = "http://localhost:3002/"
const GOOGLE_CLIENT_ID = '955397316061-cejpavq840b53chrqd0bs6libhck6nq5.apps.googleusercontent.com';

const LOGIN_ROUTE = MAIN_ROUTE + "users/login"
const SIGNUP_ROUTE = MAIN_ROUTE + "users/signup"
const GET_INFO = MAIN_ROUTE + "users/info"
const TOKEN_HEADER = {'x-api-key':localStorage[API_KEY]}
export { MAIN_ROUTE, GOOGLE_CLIENT_ID , SIGNUP_ROUTE, LOGIN_ROUTE, GET_INFO , TOKEN_HEADER }