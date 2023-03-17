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
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    console.log(pictureSrc);
  });

  return (
    <div className="face_ui">
      <div className="face_area">
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
              onClick={(e) => {
                e.preventDefault();
                console.log("Compare FaceID");
              }}
              className="btn-primary d-flex align-items-center mx-10"
            >
              <span className="icon_scan">
                <img className="w-100" alt="timer" src={compare} />
              </span>
              Compare
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Facedetection;
