import React, { useState } from "react";
import FaceScan from "../assets/icons/facescan.png";
import compare from "../assets/icons/compare.png";
import Webcam from "react-webcam";

const WebcamComponent = () => <Webcam />;
const videoConstraints = {
  width: 250,
  height: 250,
  facingMode: "user",
};

const Facedetection = () => {
  const [picture, setPicture] = useState("");
  const [file, setfile] = useState("");
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    console.log(pictureSrc);
  });

  function handlechange(e) {
    console.log(e.target.files);
    setfile(URL.createObjectURL(e.target.files[0]));
  }

  async function compareImage(e) {
    e.preventDefault();
    // console.log("Image Comparison Button clicked!!!");

    const formData = new FormData();
    formData.append("file", setfile);

    const data = await fetch("http://localhost:3000/upload/post", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    // const uploadedImage = await data.json();

    if (data) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  }

  return (
    <div className="face_ui">
      <div className="face_area capture_image grid_item">
        {picture == "" ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt="User" />
        )}
      </div>
      <div>
        {picture !== "" ? (
          <div>
            <div className="d-flex">
              <div className="face_area grid_item">
                <img src={picture} alt="User" />
              </div>
              <div className="face_area grid_item">
                <div className="face_area grid_item">
                  <img src={file} />
                </div>
                <input type="file" onChange={handlechange} />
              </div>
            </div>
            <div className="butn_wrapper">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="btn-primary d-flex align-items-center mx-10"
              >
                <span className="icon_scan">
                  <img className="w-100" alt="timer" src={FaceScan} />
                </span>
                Retake
              </button>
              <button
                onClick={compareImage}
                className="btn-primary d-flex align-items-center mx-10"
              >
                <span className="icon_scan">
                  <img className="w-100" alt="timer" src={compare} />
                </span>
                Compare
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="butn_wrapper">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  capture();
                }}
                className="btn-primary d-flex align-items-center"
              >
                <span className="icon_scan">
                  <img className="w-100" alt="timer" src={FaceScan} />
                </span>
                Capture
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Facedetection;
