import React from "react";
import '../styles/cardsarea.css';

const Cardsarea = ({ videosArray = [], setCurrVideoUrl, title }) => {
  return (
    <div className='block33'>
      <h1>{title}</h1>
      <div className='vidslides'>
        {videosArray.length > 0 ? (
          videosArray.map((video, index) => (
            <div className='layer1' key={index}>
              <img src={video.thumbnailUrl} alt={video.title} width="198" height="120" />
              <h2>{video.title}</h2>
              <h3>{video.genre}</h3>
              <h3>Duration: {video.duration}</h3>
              <button className='watchbtn' onClick={() => setCurrVideoUrl(video)}>Watch Now</button>
            </div>
          ))
        ) : (
          <div className='no-data'>
            <h2>No videos to display!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cardsarea;
