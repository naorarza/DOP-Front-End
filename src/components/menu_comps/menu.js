import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import SearchProduct from "../../admin/addProducts/searchProduct";
import SortByOptionMenu from "./sortByOptionMenu";
import ProductViewMenu from "./productViewMenu";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../loading/loading";

export default function Menu() {
  const [ar, setAr] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { theme, text } = useContext(AuthContext);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = MAIN_ROUTE + "products/menu";
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
          className="container-fluid"
        >
          <motion.h2
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center display-3"
          >
            תפריט
          </motion.h2>
          <motion.div
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="d-flex gap-2 flex-wrap justify-content-around"
          >
            <SearchProduct onSearch={handleSearch} />
            <SortByOptionMenu
              setFilteredProducts={setFilteredProducts}
              ar={ar}
            />
          </motion.div>
          <motion.hr
            initial={{ y: 30 }}
            animate={{ y: 0 }}
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
                  <ProductViewMenu item={item} />
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
