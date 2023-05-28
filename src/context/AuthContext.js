import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { API_KEY } from "../constant/constants";
import { apiGet } from "../services/apiServices";
import { MAIN_ROUTE } from "../constant/urls";

const AuthContext = createContext({
  user: null,
  mutate: () => {},
  handleLogout: () => {},
  isAdmin: false,
  isOwner: false,
  productsInCart: null,
  darkMode: null,
  theme: null,
  text: null,
  refreshCart: async () => {},
  googleName: null,
  googleEmail: null,
  googleProfileImg: null,
  googleSub: null,
  cartPrice: 0,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(null);
  const [productsInCart, setProductsInCart] = useState(null);
  const [googleName, setGoogleName] = useState(null);
  const [googleEmail, setGoogleEmail] = useState(null);
  const [googleProfileImg, setGoogleProfileImg] = useState(null);
  const [googleSub, setGoogleSub] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);

  const doApiProductsCount = async () => {
    let url = MAIN_ROUTE + "users/newProduct";
    try {
      const data = await apiGet(url);
      setProductsInCart(data);
    } catch (error) {
        console.log(error);
    }
};
const doApiGetValue = async () => {
  let url = MAIN_ROUTE + "users/products";
  try {
    const data = await apiGet(url);
    const totalPrice = data.reduce((counter, product) => {
      return counter + product.product_price;
    }, 0);
    console.log(totalPrice);
    setCartPrice(`${totalPrice * 0.27402}`.slice(0, 4));
  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = async () => {
    localStorage.removeItem(API_KEY);
    mutate();
    setUser(null);
    return toast.success("התנתקת בהצלחה!");
  };

  const mutate = async () => {
    if (!localStorage[API_KEY]) return setUser(null);

    const url = MAIN_ROUTE + "users/userInfo";
    try {
      let { data } = await axios({
        method: "GET",
        url,
        headers: {
          "x-api-key": localStorage[API_KEY],
        },
      });
      setUser(data);
      setDarkMode(data.darkMode);
    } catch (err) {
      setUser(null);
      setDarkMode(null);
      mutate();
      localStorage.removeItem(API_KEY);
    }
  };

  useEffect(() => {
    doApiProductsCount();
    mutate();
    doApiGetValue();
  }, []);

  const [theme, setTheme] = useState("#262b2f");
  const [text, setText] = useState("#fff");

  const changeThemeColor = () => {
    if (darkMode != null && darkMode === true) {
      setTheme("#262b2f");
      setText("#fff");
    }
    if (darkMode != null && darkMode === false) {
      setTheme("#fff");
      setText("black");
    }
  };

  useEffect(() => {
    changeThemeColor();
  }, [darkMode]);

  return (
    <AuthContext.Provider
      value={{
        user,
        mutate,
        isAdmin: !!(user && (user.role === "admin" || user.role === "owner")),
        isOwner: user && user.role === "owner",
        handleLogout,
        productsInCart,
        darkMode,
        theme,
        text,
        refreshCart: doApiProductsCount,
        googleName,
        googleEmail,
        googleProfileImg,
        googleSub,
        setGoogleName,
        setGoogleEmail,
        setGoogleProfileImg,
        setGoogleSub,
        cartPrice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
