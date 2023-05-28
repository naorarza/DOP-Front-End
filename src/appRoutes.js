import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/products_comps/products";
import SignUp from "./components/signup_comps/signUp";
import Footer from "./components/footer";
// import Gallery from './admin/components/gallery'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminGallery from "./admin/editGallery/adminGallery";
import UploadForm from "./admin/editGallery/uploadForm";
import Profile from "./components/profile_comps/profile";
import Navbar from "./components/navBar/navbar";
import UserList from "./admin/usersEdit/userList";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import AddProductForm from "./admin/addProducts/addProductForm";
import AdminProductList from "./admin/addProducts/adminProductList";
import ResetPassword from "./components/forgotpassword/resetPassword";
import Gallery from "./components/gallry_comps/gallery";
import Login from "./components/login_comps/login";
import Cart from "./components/shop/cart";
import Menu from "./components/menu_comps/menu";
import OrdersList from "./admin/ordersManagment/ordersList";
import AdminEvents from "./admin/events/adminEvents";
import Home from "./components/home/home";
import CategoriesList from "./admin/categories_comps/categoriesList";
import AddCategorieForm from "./admin/categories_comps/addCategorieForm";
import ProductPage from "./components/products_comps/productPage";
import Settings from "./components/navBar/settings";
import SignUpGoogle from "./components/signup_comps/signUpGoogle";
import PaymentPage from "./components/shop/paymentPage";
import Events from "./components/events/events";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);
  const [logged, setLogged] = useState(user);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    setLogged(user);
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar
        sidebar={sidebar}
        setSidebar={setSidebar}
        setLogged={setLogged}
        logged={logged}
      />
      <div
      style={sidebar ? {opacity:'0.8'} : {opacity:'1'}}
        onClick={() => {
          setSidebar(false);
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/google" element={<SignUpGoogle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile/settings" element={<Settings />} />
          {/* block reqular user from entering admin pages */}
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/gallery/uploadImage" element={<UploadForm />} />
          <Route path="/admin/users/edit" element={<UserList />} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/orders" element={<OrdersList />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/categories" element={<CategoriesList />} />
          <Route path="/admin/categories/addCategory" element={<AddCategorieForm />} />
          <Route
            path="/admin/products/upload-product"
            element={<AddProductForm />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="dark"
        pauseOnFocusLoss
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  );
}
