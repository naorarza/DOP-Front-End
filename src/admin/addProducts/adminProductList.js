import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiGet } from "../../services/apiServices";
import { toast } from "react-toastify";
import ProductViewAdmin from "./productViewAdmin";
import { Button, IconButton, Tooltip } from "@mui/material";
import AuthAdminComp from "../authAdminComp";
import SearchProduct from "./searchProduct";
import SortByOption from "./sortByOption";
import { BiPlusCircle } from "react-icons/bi";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Loading from "../../components/loading/loading";

export default function AdminProductList() {
  const [ar, setAr] = useState();
  const [catAr, setCatAr] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { theme, text } = useContext(AuthContext);

  useEffect(() => {
    doApi();
    doApiCategories();
  }, []);

  const doApi = async () => {
    let url = MAIN_ROUTE + "products";
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

  const doApiCategories = async () => {
    let url = MAIN_ROUTE + "categories";
    try {
      let data = await apiGet(url);
      console.log(data);
      setCatAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {filteredProducts != null ? (
        <div style={{ minHeight: "95vh", background: theme, color: text }}>
          <AuthAdminComp />
          <h2 className="text-center display-4">עריכת תפריט ומוצרים</h2>
          <div className="d-flex  justify-content-around">
            <div className="d-flex align-items-center">
              <Link
                style={{ textDecoration: "none", marginLeft: "8px" }}
                to="/admin/products/upload-product"
              >
                {/* <Button color="info" variant="contained">
          הוספת מוצר
        </Button> */}
                <Tooltip title="הוסף מוצר">
                  <IconButton color="primary" aria-label="הוסף מוצר">
                    <BiPlusCircle />
                  </IconButton>
                </Tooltip>
              </Link>
              <SearchProduct onSearch={handleSearch} />
            </div>
            <SortByOption setFilteredProducts={setFilteredProducts} ar={ar} />
          </div>
          <hr />

          <div style={{ minHeight: "95vh" }} className="container-fluid pb-3">
            <div
              style={{ minHeight: "95vh" }}
              className="d-flex flex-wrap justify-content-center"
            >
              {filteredProducts.map((item, i) => {
                return (
                  <div key={item._id}>
                    <ProductViewAdmin
                      catAr={catAr}
                      item={item}
                      refresh={doApi}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
