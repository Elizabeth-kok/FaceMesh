// Install dependencies
// Import dependencies
// Setup webcam and canvas
// Define references to those
// Load facemesh
// Detech function
// Drawing utilities
// Load triangulation
// Setup triangle path
// Setup point drawing
// Add drawMesh to detech function

import React, {useRef,useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";

// OLD MODEL
import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
//import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
//import { drawMesh } from "./utilities";

function App() {
  // Setup reference
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //  Load posenet
  const runFacemesh = async () => {
    // OLD MODEL
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 },
      scale: 0.8
    });
    // NEW MODEL
    // const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
     //checking that our webcam is up and running
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties, grabbing video width and video height
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // OLD MODEL
      const face = await net.estimateFaces(video);
      // NEW MODEL
      // const face = await net.estimateFaces({input:video});
      console.log(face);

      // Get canvas context for drawing
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});
    }
  };

  useEffect(()=>{runFacemesh()}, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}


export default App;
