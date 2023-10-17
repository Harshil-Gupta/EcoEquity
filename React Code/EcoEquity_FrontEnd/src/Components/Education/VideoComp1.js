import React from "react";
 import YouTube from "react-youtube";

// Video Component 1
 class VideoComp1 extends React.Component {
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
      return <YouTube videoId="ugHMhHAQcos" options={options} onReady={this._onReady} id="video"/>;
    }
  
    // pause video event 
    _onReady(event) {
      event.target.pauseVideo();
    }
  }

  export default VideoComp1;