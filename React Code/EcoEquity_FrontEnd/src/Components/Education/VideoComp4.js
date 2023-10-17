import React from "react";
import YouTube from "react-youtube";

// Video Component 4
 class VideoComp4 extends React.Component {
    render() {
      // options parameters
      const options = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };
  
       // display Youtube video with options and videoID 
      return <YouTube videoId="eOy8ztvhGYo" options={options} onReady={this._onReady} id="video"/>;
    }
  
    // pause video event
    _onReady(event) {
      event.target.pauseVideo();
    }
  }

  export default VideoComp4;