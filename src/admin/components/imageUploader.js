// import { PhotoCamera } from "@mui/icons-material";
// import { Button, IconButton } from "@mui/material";
// import React, { useState } from "react";
// // import UploadButton from "./UploadButton";

// function ImageUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

//     if (file && allowedTypes.includes(file.type)) {
//       setSelectedFile(file);
//     } else {
//       setSelectedFile(null);
//       alert("Please select a PNG, JPEG, or JPG image");
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append("myFile", selectedFile);

//       // Use fetch or your preferred library to upload the image
//       fetch("https://drinkorderparty.cyclic.app/uploads", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Image uploaded successfully", data);
//         })
//         .catch((error) => {
//           console.error("Error uploading image", error);
//         });
//     } else {
//       alert("Please select an image to upload");
//     }
//   };

  

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="image">Select an image:</label>

//       <IconButton color="primary" aria-label="upload picture" component="label">
//         <label htmlFor="file-upload" className="custom-file-upload">
//           <input
//             type="file"
//             id="image"
//             accept=".png,.jpeg,.jpg"
//             onChange={handleFileChange}
//           />
//         </label>
//         <PhotoCamera />
//       </IconButton>
//         {/* <UploadButton/> */}
//       <Button variant="contained" component="label">
//         Upload
//         <button hidden type="submit"></button>
//       </Button>
//       {/* <Button  variant="contained" component="label">
//   Upload
//   <input hidden accept="image/*" multiple type="file" />
// </Button> */}
//     </form>
//   );
// }

// export default ImageUploader;
