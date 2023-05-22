import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import { toast } from "react-toastify";
import SearchProduct from "../../admin/addProducts/searchProduct";
import SortByOptionMenu from "./sortByOptionMenu";
import ProductViewMenu from "./productViewMenu";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

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
    <div
      style={{ minHeight: "95vh", background: theme, color: text }}
      className="check container-fluid"
    >
      <h2 className="text-center display-4">תפריט</h2>
      <div className="d-flex gap-2 flex-wrap justify-content-around">
        <SearchProduct onSearch={handleSearch} />
        <SortByOptionMenu setFilteredProducts={setFilteredProducts} ar={ar} />
      </div>
      <hr style={{color: text}}/>
      <div className="d-flex flex-wrap justify-content-center pb-4">
        {filteredProducts != null ? (
          filteredProducts.map((item, i) => {
            return (
              <div className="parent">
                <ProductViewMenu key={i} item={item} />
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
