import React from "react";
 import YouTube from "react-youtube";


 class ESGVideo extends React.Component {
    render() {
      const options = {
        height: 'auto',
        width: 'auto',
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };
  
      return <YouTube videoId="AkbGz3CYvqE" options={options} onReady={this._onReady} id="video"/>;
    }
  
    _onReady(event) {
      event.target.pauseVideo();
    }
  }

  export default ESGVideo;