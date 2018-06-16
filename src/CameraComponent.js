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
      pictures: "",
      logInStatus: null,
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
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  onCapture = () => {
    this.setState({
      // returns base64 encoded data of captured image and sets state.
      // ex. data:image/jpeg;base64,/9skQ2jsd...
      pictures: this.webcam.getScreenshot(),
      captured: true
    });
  };

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
          logInStatus: false
        });
      } else {
        this.setState({
          data,
          logInStatus: true
        });
      }
    });
  };

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

  render() {
    return (
      <div>
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
                  backgroundColor: "white",
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
          <Grid.Row columns={3}>
            <Grid.Column style={{ padding: "0 5px 0 15px" }}>
              <Container style={{ textAlign: "left" }}>
                <Button
                  size="massive"
                  fluid
                  color="blue"
                  content="Capture"
                  onClick={this.onCapture}
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 5px 0 5px" }}>
              <Container style={{ textAlign: "right" }}>
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
              <Container style={{ textAlign: "right" }}>
                <Button
                  size="massive"
                  color="blue"
                  content="Wanna have some fun?"
                  onClick={this.funFacts}
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
