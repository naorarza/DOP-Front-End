import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import SearchProduct from "../../admin/addProducts/searchProduct";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import "./products.css";
import ProductView from "./productView";
import SortByOptionUsers from "./sortByOptionUsers";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../loading/loading";
import { motion } from "framer-motion";

export default function Products() {
  const [ar, setAr] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { theme, text } = useContext(AuthContext);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = MAIN_ROUTE + "products/products";
    try {
      const data = await apiGet(url);
      setAr(data);
      setFilteredProducts(data);
    } catch (err) {
      toast.warn(err.response.data.msg);
    }
  };

  const handleSearch = (searchWord) => {
    const filtered = ar.filter(
      (product) =>
        product?.info.toLowerCase().includes(searchWord.toLowerCase()) ||
        product?.product_name.toLowerCase().includes(searchWord.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <>
      {ar?.length > 0 ? (
        <div
          style={{ minHeight: "95vh", background: theme, color: text }}
          className="check container-fluid"
        >
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center display-3"
          >
            מוצרים
          </motion.h2>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="d-flex flex-wrap gap-2 justify-content-around"
          >
            <SearchProduct onSearch={handleSearch} />
            <SortByOptionUsers
              setFilteredProducts={setFilteredProducts}
              ar={ar}
            />
          </motion.div>
          <motion.hr
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ color: text }}
          />
          <div className="d-flex flex-wrap justify-content-center pb-4">
            {filteredProducts.map((item, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    border: `3px solid grey`,
                    background: theme,
                    color: text,
                  }}
                  className="parent"
                >
                  <ProductView key={i} item={item} />
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
