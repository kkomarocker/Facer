import React, { Component } from "react";
import Webcam from "react-webcam";
import { Grid, Container, Button } from "semantic-ui-react";
import AWS from "aws-sdk";
import { creds } from "./secret";

import Pictures from "./Pictures";

AWS.config.update({
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey,
  region: "us-east-1"
});

const rekognition = new AWS.Rekognition({ apiVersion: "2016-06-27" });
const s3 = new AWS.S3();

class CameraComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null,
      pictures: "",
      logInStatus: false,
      data: {},
      detectedData: {},
      captured: false,
      registered: false,
      emotional: null,
      eyeglasses: null,
      smile: null
    };

    this.onCapture = this.onCapture.bind(this);
    this.result = this.result.bind(this);
    this.funFacts = this.funFacts.bind(this);
    this.register = this.register.bind(this);
    this.reset = this.reset.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  // Returns base64 encoded data of captured image and sets state.
  // ex. data:image/jpeg;base64,/9skQ2jsd...
  onCapture = () => {
    this.setState({
      pictures: this.webcam.getScreenshot(),
      captured: true
    });
  };

  // Returns comparison result from AWS Rekognition and sets state accordingly.
  result = () => {
    const getBinary = base64Image => {
      const binaryImg = atob(base64Image);
      const length = binaryImg.length;
      const ab = new ArrayBuffer(length);
      const ua = new Uint8Array(ab);
      for (let i = 0; i < length; i++) {
        ua[i] = binaryImg.charCodeAt(i);
      }

      return ab;
    };

    const base64Image = this.state.pictures.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );

    const params = {
      SimilarityThreshold: 95,
      SourceImage: {
        Bytes: getBinary(base64Image)
      },
      TargetImage: {
        S3Object: {
          Bucket: "facerdb",
          Name: this.props.name.toLowerCase() + "profile.jpg"
        }
      }
    };

    rekognition.compareFaces(params, (err, data) => {
      if (err) {
        this.setState({
          err,
          logInStatus: false,
          captured: false
        });
      } else {
        this.setState({
          data,
          logInStatus: true,
          captured: false
        });
      }
    });
  };

  // Returns data object containing details of face detected from image.
  funFacts() {
    const getBinary = base64Image => {
      const binaryImg = atob(base64Image);
      const length = binaryImg.length;
      const ab = new ArrayBuffer(length);
      const ua = new Uint8Array(ab);
      for (let i = 0; i < length; i++) {
        ua[i] = binaryImg.charCodeAt(i);
      }

      return ab;
    };

    const base64Image = this.state.pictures.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );
    const params = {
      Image: {
        Bytes: getBinary(base64Image)
      },
      Attributes: ["ALL"]
    };

    rekognition.detectFaces(params, (err, detectedData) => {
      if (err) console.log(err);
      this.setState({
        detectedData
      });
    });
  }

  // Stores image to AWS S3 bucket
  register() {
    const getBinary = base64Image => {
      const binaryImg = atob(base64Image);
      const length = binaryImg.length;
      const ab = new ArrayBuffer(length);
      const ua = new Uint8Array(ab);
      for (let i = 0; i < length; i++) {
        ua[i] = binaryImg.charCodeAt(i);
      }

      return ab;
    };

    const base64Image = this.state.pictures.replace(
      /^data:image\/(png|jpeg|jpg);base64,/,
      ""
    );

    const params = {
      Body: getBinary(base64Image),
      Bucket: "facerdb",
      Key: this.props.name.toLowerCase() + "profile.jpg"
    };

    s3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      this.setState({
        registered: true
      });
    });
  }

  reset() {
    this.setState({
      err: null,
      pictures: "",
      logInStatus: false,
      data: {},
      detectedData: {},
      captured: false,
      registered: false,
      emotional: null,
      eyeglasses: null,
      smile: null
    });
    this.props.resetName();
  }

  render() {
    return (
      <div style={{ backgroundColor: "#3170E5" }}>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column style={{ padding: "10px 5px 0 15px" }}>
              <Container
                textAlign="center"
                style={{
                  height: "50vh",
                  width: "50vw"
                }}
              >
                <Webcam
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  height="480"
                  width="710"
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "10px 15px 0 5px" }}>
              <Container
                textAlign="center"
                style={{
                  height: "70vh",
                  width: "50vw",
                  padding: "10px 15px 0 5px"
                }}
              >
                <Pictures
                  {...this.state}
                  name={this.props.name}
                  register={this.register}
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column style={{ padding: "0 5px 0 15px" }}>
              <Container style={{ textAlign: "center" }}>
                <Button
                  size="massive"
                  color="yellow"
                  content="Capture"
                  onClick={this.onCapture}
                  fluid
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 5px 0 5px" }}>
              <Container style={{ textAlign: "center" }}>
                <Button
                  size="massive"
                  color="red"
                  content="Log-In"
                  onClick={this.result}
                  fluid
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 15px 0 5px" }}>
              <Container style={{ textAlign: "center" }}>
                <Button
                  size="massive"
                  color="yellow"
                  content="Start Analyzation"
                  onClick={this.funFacts}
                  fluid
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 15px 0 5px" }}>
              <Container style={{ textAlign: "center" }}>
                <Button
                  size="massive"
                  color="red"
                  content="Reset"
                  onClick={this.reset}
                  fluid
                />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default CameraComponent;
