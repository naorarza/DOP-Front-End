import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import "./home.css";
import CarouselComponent from "../../slider_Comps/carouselComponent";
import "../../slider_Comps/slider.css";

export default function Home() {
  const { text, theme } = useContext(AuthContext);
  return (
    <>
      <div
        id="mainDiv"
        style={{ background: theme, color: text, minHeight: "95vh" }}
      >
        <div className="d-flex align-items-center" id="image1">
          <motion.div
            initial={{ y: -150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.3 }}
            className="landingHome"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
              style={{ margin: 30 }}
              className="logo"
            ></motion.div>
            <div className="moveText" style={{ margin: 30, direction: "ltr" }}>
              <p
                style={{ color: "rgba(226,226,226)", fontWeight: "bolder" }}
                className="p-0 m-0 display-3"
              >
                We make
              </p>
              <p
                style={{ color: "rgba(181,74,74)", fontWeight: "bolder" }}
                className="p-0 m-0 display-3"
              >
                an exellent
              </p>
              <p
                style={{ color: "rgba(142,129,109)", fontWeight: "bolder" }}
                className="p-0 m-0 display-3"
              >
                drinks
              </p>
            </div>
          </motion.div>
        </div>
        {/* <CenterMode /> */}
        <div className="d-flex align-items-center justify-content-between p-2 flex-wrap">
          <div
            style={{ color: text }}
            id="first_div"
            className="downPhone col-lg-4 col-md-5 col-sm-12"
          >
            <CarouselComponent />
          </div>
          <div
            id="second_div"
            className="d-flex col-lg-7 col-md-7 col-sm-12 align-items-center justify-content-between p-2 flex-wrap"
          >
            <div style={{ color: text }} className="col-lg-5 col-md-5 col-sm-5">
              <section>
                <motion.p
                  initial={{ opacity: 0, y: 150 }}
                  // animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  // viewport={{ once: true }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laborum minus obcaecati provident consequatur reprehenderit
                  cupiditate, blanditiis ab sit a voluptatibus corporis ipsa
                  accusantium iure vitae dolor iusto culpa sunt maiores. Fuga
                  cum sed expedita beatae dolor. Porro doloribus quibusdam amet
                  sed, nam molestiae nihil distinctio consectetur explicabo eos
                  neque pariatur.
                </motion.p>
              </section>
            </div>
            <div style={{ color: text }} className="col-lg-5 col-md-5 col-sm-5">
              <section>
                <motion.p
                  initial={{ opacity: 0, y: 150 }}
                  // animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  // viewport={{ once: true }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Laborum minus obcaecati provident consequatur reprehenderit
                  cupiditate, blanditiis ab sit a voluptatibus corporis ipsa
                  accusantium iure vitae dolor iusto culpa sunt maiores. Fuga
                  cum sed expedita beatae dolor. Porro doloribus quibusdam amet
                  sed, nam molestiae nihil distinctio consectetur explicabo eos
                  neque pariatur.
                </motion.p>
              </section>
            </div>
          </div>
        </div>
        <div
          style={{
            color: "#fff",
            textShadow: "3px 2px 3px rgba(255,255,255,.2)",
            fontSize: "1.3em",
          }}
          id="image2"
          className="d-flex imageTwo flex-wrap py-3 px-4 align-items-end justify-content-lg-between justify-content-md-around justify-content-sm-center text-center "
        >
          <div className="d-flex flex-column align-items-center justify-content-center col-lg-3 col-md-8 col-sm-8 col-8">
            <h3 className="px-2">זמני פתיחה</h3>
            <p> ראשון: 18:00 - 01:00</p>
            <p>שני: 18:00 - 01:00</p>
            <p>שלישי: 18:00 - 01:00</p>
            <p>רביעי: 18:00 - 01:00</p>
            <p>חמישי: 18:00 - 01:00</p>
            <p>שישי: 18:00 - 01:00</p>
            <p>שבת: 18:00 - 01:00</p>
          </div>
          <hr style={{ width: "100%", color: "greenyellow" }} className="line" />
          <div className="col-lg-3 col-md-5 col-sm-8 col-8">
            <h3>מיקום</h3>
            כתובת: אלנבי 143 תל-אביב
            <br />
            <a
              href=" https://waze.com/ul?ll=32.06954079,34.77068071&navigate=yes"
              target="_blank"
            >
              דרכי הגעה
            </a>
          </div>
          <hr style={{ width: "100%", color: "greenyellow" }} className="line" />

          <div className="col-lg-3 col-md-5 col-sm-8 col-8">
            <h3>יצירת קשר</h3>
            פלאפון: <p className="phoneText">0537201229 / 0536297403</p>
            <a
              style={{ textShadow: "3px 2px 3px rgba(255,255,255,.2)" }}
              className="phone"
              href="tel:0537201229"
            >
              0537201229
            </a>
            <a className="phone" href="tel:0536297403">
              0536297403
            </a>
            <a href="mailto:m0504152128@gmail.com" target="_blank">
              מייל ליצירת קשר
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
