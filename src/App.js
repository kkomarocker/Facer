import React, { Component } from "react";
// import Webcam from "react-webcam";
import logo from "./logo.svg";
import "./App.css";
import AWS from "aws-sdk";
import { creds } from "../secret";

AWS.config.update({
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey,
  region: "us-east-1"
});

const rekognition = new AWS.Rekognition();

class App extends Component {
  constructor() {
    super();

    this.state = {
      Gender: "",
      AgeRange: 0,
      Emotions: ""
    };

    this.showPic = this.showPic.bind(this);
  }

  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  //   this.setState({
  //     picture: imageSrc
  //   });
  // };

  componentDidMount() {
    console.log(this.state);
  }

  showPic() {
    const params = {
      Attributes: ["ALL"],
      Image: {
        S3Object: {
          Bucket: "facerdb",
          Name: "businessman.jpg"
        }
      }
    };

    rekognition.detectFaces(params, (err, data) => {
      if (err) console.log(err);
      console.log(data);
      const { AgeRange, Emotions, Gender } = data.FaceDetails[0];
      this.setState({
        AgeRange: Math.floor((AgeRange.Low + AgeRange.High) / 2),
        Gender: Gender.value,
        Emotions: Emotions[0].Type
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to Facer</h1>
        </header>
        <p className="App-intro">Please press "Capture" for verification</p>
        <button onClick={this.showPic}>Capture</button>
      </div>
      // <div>
      //   <Webcam
      //     audio={false}
      //     height={350}
      //     ref={this.setRef}
      //     screenshotFormat={"image/jpeg"}
      //     width={350}
      //   />
      //   <button onClick={this.capture}>Capture Photo</button>
      //   {this.state.picture ? (
      //     <div>
      //       <img src={this.state.picture} />
      //     </div>
      //   ) : null}
      // </div>
    );
  }
}

export default App;
