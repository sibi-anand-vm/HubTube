import React, { useState } from 'react';
import VideoContext from './VideoContext';

const VideoProvider = ({ children }) => {
  const [video, setVideo] = useState(null);

  const loginvideo = (videoData) => {
    setVideo(videoData);
  };

  const logoutvideo = () => {
    setVideo(null);
  };

  return (
    <VideoContext.Provider value={{ video, loginvideo, logoutvideo }}>
      {children}
    </VideoContext.Provider> 
  );
};

export default VideoProvider;
