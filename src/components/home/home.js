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
        <div id="image1"></div>
        {/* <CenterMode /> */}
        <div className="d-flex align-items-center justify-content-between p-2 flex-wrap">
          <div style={{ color: text }} className="downPhone col-lg-4 col-md-5 col-sm-12">
            <CarouselComponent />
          </div>
          <div className="d-flex col-lg-7 col-md-7 col-sm-12 align-items-center justify-content-between p-2 flex-wrap">
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
            textShadow: "3px 2px 3px rgba(255,255,255,.2)",
            fontSize: "1.3em",
          }}
          id="image2"
          className="d-flex py-3 px-4 align-items-end justify-content-between "
        >
          <div id="openTime" className="">
            <div>
              <h3 className="px-2">זמני פתיחה</h3>
              <p>
                ראשון: 18:00 - 01:00
                <br />
                שני: 18:00 - 01:00
                <br />
                שלישי: 18:00 - 01:00
                <br />
                רביעי: 18:00 - 01:00
                <br />
                חמישי: 18:00 - 01:00
                <br />
                שישי: 18:00 - 01:00
                <br />
                שבת: 18:00 - 01:00
              </p>
            </div>
          </div>

          <div>
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

          <div>
            <h3>יצירת קשר</h3>
            פלאפון: <p className="phoneText">0537201229 / 0536297403</p>
            <a
              style={{ textShadow: "3px 2px 3px rgba(255,255,255,.2)" }}
              className="phone"
              href="tel:0537201229"
            >
              0537201229
            </a>{" "}
            <span className="phone"> / </span>
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
