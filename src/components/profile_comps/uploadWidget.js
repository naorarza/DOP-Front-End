import React, { useState } from "react";
import axios from "axios";
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./upload.css";
import { MAIN_ROUTE } from "../../constant/urls";
import { apiPut } from "../../services/apiServices";
import { API_KEY } from "../../constant/constants";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Fab, createMuiTheme } from "@mui/material";
import { RestartAltOutlined } from "@mui/icons-material";

const UploadWidget = ({setOpen , open , setChanging}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, mutate } = useContext(AuthContext);
  const [fileList, setFileList] = useState([
    {
      uid: user._id,
      name: "תמונת פרופיל",
      status: "done",
      url: user.profile_img,
    },
  ]);

  useEffect(() => {
    setFileList([
      {
        uid: user._id,
        name: "תמונת פרופיל",
        status: "done",
        url: user.profile_img,
      },
    ]);
    
  }, [user.profile_img]);

  const getBase64 = async (file) =>
    await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      setLoading(false);
    });

  const uploadRequest = ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ck330gif");
    axios
      .post("https://api.cloudinary.com/v1_1/dovpnyz7a/image/upload", formData)
      .then((response) => {
        const img_url = response.data.secure_url.toString();
        doApiProfile(img_url);
      });
    };
    
    const doApiProfile = async (img_url) => {
      let url = MAIN_ROUTE + "users/profile";
      // setLoading(true)
      setChanging(true);
      try {
        let {data} = await axios({
          method: "PUT",
          url,
          headers: { "x-api-key": localStorage[API_KEY] },
          data: { img_url },
        });
        console.log(data);
        
        if(data.modifiedCount){
          setOpen(false);
          setLoading(false);
          setChanging(false);
          mutate();
          toast.success('תמונת הפרופיל השתנתה!')
        }
      } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  
  const handleChange = ({ fileList: newFileList }) => {
    setLoading(true);
    setFileList(newFileList);
    
    user.profile_img === null && doApiProfile("https://freesvg.org/img/abstract-user-flat-4.png");
  };
  const handleCancel = () => setPreviewOpen(false);

  return (
    <>

          <ImgCrop
            showGrid
            rotationSlider
            aspectSlider
            showReset
            aspect={2 / 1.2}
            quality={1}
            minZoom={0.9}
            maxZoom={5}
            resetText="איפוס"
            modalOk="אישור"
            modalCancel="ביטול"
            modalTitle="עריכת תמונה"
            modalClassName=""
          >
            <Upload
              customRequest={uploadRequest}
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
              accept="image/*"
              className="dark:text-slate-200"
            >
              <div>
                {loading ? <LoadingOutlined /> : <PictureOutlined />}
                <div style={{ marginTop: 8 }}>שינוי תמונה</div>
              </div>
            </Upload>
          </ImgCrop>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>

    </>
  );
};
export default UploadWidget;
