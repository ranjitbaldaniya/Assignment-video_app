import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import "./VideoApp.css";
import { Button } from "react-bootstrap";

const VideoAppLayout = () => {
  const videoUrls = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  ];

  const [currentVideo, setCurrentVideo] = useState(videoUrls[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [webcamReady, setWebcamReady] = useState(false);

  const webcamRef = useRef(null);
  const recorderRef = useRef(null);

  const handlePlayerError = (error) => {
    setError("Error loading the video. Please try again.");
    setIsLoading(false);
    if (webcamRef.current) {
      webcamRef.current.stop();
    }
  };

  const handleBuffer = () => {
    setIsLoading(true);
  };

  const handleBufferEnd = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleVideoClick = (url) => {
    setCurrentVideo(url);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleWebcamStart = () => {
    setWebcamReady(true);
  };

  const handleWebcamError = (error) => {
    setWebcamReady(false);
  };

  const startRecording = () => {
    if (webcamReady) {
      setRecording(true);
      const stream = webcamRef.current.stream;
      recorderRef.current = RecordRTC(stream, { type: "video" });
      recorderRef.current.startRecording();
    } else {
      console.error("Webcam is not ready. Please wait for it to initialize.");
    }
  };

  const stopRecording = () => {
    setRecording(false);
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current.getBlob();
      setRecordedVideo(URL.createObjectURL(blob));
    });
    setShowWebcam(!showWebcam);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="main-left">
          {isLoading && !error && <h2 className="text-primary text-center">Loading please wait...</h2>}
          {error && <div className="error-message">{error}</div>}

          <ReactPlayer
            url={currentVideo}
            controls
            width="100%"
            height="100%"
            playing={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onError={handlePlayerError}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            config={{
              file: { forceVideo: true },
              attributes: { controlsList: "nodownload" },
            }}
          />
        </div>
        <div className="main-right">
          <div className="sidebar">
            <h2 className="text-center text-primary">Video List</h2>
            {videoUrls.map((url, index) => (
              <div
                key={index}
                className={`small-div ${currentVideo === url ? "active" : ""}`}
                onClick={() => handleVideoClick(url)}
              >
                <ReactPlayer url={url} width="100%" height="100%" poster />
              </div>
            ))}
            {recordedVideo && (
              <div
                className={`small-div ${
                  currentVideo === recordedVideo ? "active" : ""
                }`}
                onClick={() => handleVideoClick(recordedVideo)}
              >
                <ReactPlayer
                  url={recordedVideo}
                  width="100%"
                  height="100%"
                  poster
                />
              </div>
            )}

            {showWebcam && (
              <div className="webcam-container">
                <Webcam
                  audio={true}
                  ref={webcamRef}
                  videoConstraints={{ facingMode: "user" }}
                  onUserMedia={handleWebcamStart}
                  onError={handleWebcamError}
                />
                <div>
                  {webcamReady &&
                    (!recording ? (
                      <div className="d-flex ">
                        <Button className="me-3" onClick={startRecording}>
                          Start Recording
                        </Button>
                        <Button onClick={() => setShowWebcam(!showWebcam)}>
                          Close Webcam
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={stopRecording}>Stop Recording</Button>
                    ))}
                </div>
              </div>
            )}
            <div className="button-div text-center">
              {!showWebcam && (
                <Button onClick={() => setShowWebcam(!showWebcam)}>
                  Open Webcam
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAppLayout;
