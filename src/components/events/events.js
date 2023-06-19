import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { motion } from "framer-motion";
import "./events.css";

export default function Events() {
  const [flag, setFlag] = useState(false);
  const [verified, setVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { theme, text } = useContext(AuthContext);

  const onSubForm = (_bodyData) => {
    doApiPost(_bodyData);
  };

  const handleChange = () => {
    setVerified((verified) => !verified);
    console.log(verified);
  };

  const doApiPost = async (_bodyData) => {
    let myUrl = "http://localhost:3002/events";
    try {
      let resp = await axios({
        method: "POST",
        data: _bodyData,
        url: myUrl,
      });
      if (resp.data._id) {
        toast.success("הפרטים נשלחו בהצלחה");
        handleChange();
        // nav("/login");
      }
    } catch (err) {
      console.log(err.response.data.msg);
      toast.warning(err.response.data.msg);
    }
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    e.target.value === "other" ? setFlag(true) : setFlag(false);
  };

  return (
    <div
      className="d-flex flex-wrap"
      style={{ minHeight: "100vh", background: theme }}
    >
      <div
        className="rightDiv d-flex flex-column col-md-6 col-sm-10 align-items-center col-lg-6 p-5"
        style={{
          backgroundImage: `url("/images/drinkpointBlack.jpg")`,
          // backgroundImage: `url("../public/images/drinkpointBlack.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "100% 110%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-4 mx-auto mt-4" style={{ width: "100%" }}>
          <h2
            style={{
              textDecoration: "underLine",
              textAlign: "center",
              color: "#fff",
            }}
            className="pb-3"
          >
            אירועים והפעלות בבר
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              color: "#fff",
              columnCount: 2,
              columnGap: "28px",
              width: "100%",
              fontSize: "larger",
            }}
            className="mx-auto mt-5"
          >
            מתכננים מסיבת רווקים/ רווקות, יום הולדת, מסיבת גיוס לחבר או כל אירוע
            אחר? ורוצים להפוך את החגיגה לבלתי נשכחת? אם כך, הגעתם בדיוק לכתובת
            הנכונה. אנחנו נשמח לעמוד לרשותכם ולהפוך את האירוע לחוויה מטורפת. עם
            בר קוקטייל לאירועים D.O.P תוכלו, מתחילת האירוע ועד סופו, להנות מסוגי
            אלכוהול הכי איכותיים שיש, קוקטליים מגוונים ומפתיעים מגוון של אוכל
            ממכר, צוות מקצועי וחייכן המעניק יחס אישי ללא פשרות ועיצוב הבר
            שמתאימים לכל סוג אירוע מהפרטים הכי קטנים. שכל שיישאר לכם לעשות הוא
            לרקוד, לשמוח ולהנות. וכל מה שנשאר לכם לעשות בשביל שכל זה יהיה אמיתי
            - הוא ליצור איתנו קשר ואנחנו כבר נדאג להכל.
          </motion.p>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center col-md-6 col-sm-9 col-lg-6 align-items-center mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ color: text }}
        >
          טופס להשארת פרטים לחזרה
        </motion.h2>
        <hr className="pt-0 mt-0 mb-5" style={{ color: text, width: "100%" }} />
        {!verified ? (
          <motion.form
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ color: text, lineHeight: "2" }}
            onSubmit={handleSubmit(onSubForm)}
            id="id_form"
            className="d-flex flex-column"
          >
            {/* <label>בחר אירוע</label>
          <select {...register("event_name", { required: true, minLength: 2 })} className="form-select" type="select" onChange={handleSelectChange} >
            <option value="" >בחר אופציה</option>
            <option value="Birthday" >מסיבת יום הולדת</option>
            <option value="Bachelor Party" >מסיבת רווקים/רווקות</option>
            <option value="Army recruitment party" >מסיבת גיוס</option>
            <option value="release party" >מסיבת שחרור</option>
            <option value="other" >אחר</option>
          </select> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-autowidth-label">
                בחר אירוע
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-autowidth"
                className="my-2"
                label="בחר אירוע"
                {...register("event_name", { required: true, minLength: 2 })}
                onChange={handleSelectChange}
              >
                {/* <MenuItem value={""} >בחר אופציה</MenuItem> */}
                <MenuItem value={"Birthday"}>מסיבת יום הולדת</MenuItem>
                <MenuItem value={"Bachelor Party"}>
                  מסיבת רווקים/רווקות
                </MenuItem>
                <MenuItem value={"Army recruitment party"}>מסיבת גיוס</MenuItem>
                <MenuItem value={"release party"}>מסיבת שחרור</MenuItem>
                <MenuItem value={"other"}>אחר</MenuItem>
              </Select>
            </FormControl>
            {flag && (
              <>
                <TextareaAutosize
                  minRows={2}
                  placeholder="תיאור האירוע..."
                  className="text-white"
                  required
                  sx={{ mb: 1, color: theme }}
                  style={{ backgroundColor: theme }}
                  {...register("text", { required: true, minLength: 10 })}
                />
                {errors.text && <div className="text-danger">* התיאור קצר</div>}
              </>
            )}

            <TextField
              id="outlined-basic"
              label="שם מלא"
              variant="outlined"
              className="my-2"
              {...register("name", { required: true, minLength: 2 })}
            />
            {errors.name && <div className="text-danger">* השם קצר מידי</div>}
            <TextField
              id="outlined-basic"
              label="מספר טלפון"
              variant="outlined"
              className="my-2"
              {...register("phone", { required: true, minLength: 10 })}
            />
            {errors.phone && <div className="text-danger">* מספר הטלפון לא הגיוני</div>}

            <TextField
              id="outlined-basic"
              label="מייל"
              variant="outlined"
              className="my-2"
              {...register("email", { required: true, minLength: 2 })}
            />
            {errors.email && <div className="text-danger">* מייל לא תקין</div>}

            <div className="d-flex justify-content-center">
              <div className="btn-group">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="mt-3 btn btn-info"
                >
                  אישור
                </Button>
              </div>
            </div>
          </motion.form>
        ) : (
          <motion.h2
            initial={{ color: "white", opacity: 0 }}
            whileInView={{ color: "aqua", opacity: 1 }}
            transition={{ duration: 1, repeatType: Infinity }}
            style={{ color: "white", width: "70%" }}
          >
            תודה על שהשארת את הפרטים שלך, נחזור אליך בהקדם.
          </motion.h2>
        )}
      </div>
    </div>
  );
}
