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

export default function Products() {
  const [ar, setAr] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { theme , text } = useContext(AuthContext);

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
    <div
      style={{ minHeight: "95vh", background: theme, color: text }}
      className="check container-fluid"
    >
      <h2 className="text-center display-4">מוצרים</h2>
      <div className="d-flex flex-wrap gap-2 justify-content-around">
        <SearchProduct onSearch={handleSearch} />
        <SortByOptionUsers setFilteredProducts={setFilteredProducts} ar={ar} />
      </div>
      <hr style={{color: text}}/>
      <div className="d-flex flex-wrap justify-content-center pb-4">
        {filteredProducts != null ? (
          filteredProducts.map((item, i) => {
            return (
              <div style={{border:`3px solid grey`, background:theme , color:text}} className="parent">
                <ProductView key={i} item={item} />
              </div>
            );
          })
        ) : (
          <h2>Loading..</h2>
        )}
      </div>
    </div>
  );
}
