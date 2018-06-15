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

class CameraComponent extends Component {
  constructor() {
    super();

    this.state = { pictures: "" };

    this.onCapture = this.onCapture.bind(this);
    this.result = this.result.bind(this);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  onCapture = () => {
    this.setState({
      pictures: this.webcam.getScreenshot() // this returns base64 encoded data of captured image => data:image/jpeg;base64,/9skQ2jsd...
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
      Image: {
        Bytes: getBinary(base64Image)
      },
      // TargetImage: {
      //   S3Object: {
      //     Bucket: "facerdb",
      //     Name: "jayprofile.jpg"
      //   }
      // },
      // SimilarityThreshold: 95
      Attributes: ["ALL"]
    };

    rekognition.detectFaces(params, (err, data) => {
      if (err) console.log(err.stack);
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column style={{ padding: "0 5px 0 15px" }}>
              <Container
                textAlign="center"
                style={{
                  height: "70vh",
                  width: "50vw",
                  backgroundColor: "black"
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
            <Grid.Column style={{ padding: "0 15px 0 5px" }}>
              <Container
                textAlign="center"
                style={{
                  height: "70vh",
                  width: "50vw",
                  backgroundColor: "black"
                }}
              >
                <Pictures pic={this.state.pictures} />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column style={{ padding: "0 5px 0 15px" }}>
              <Container textAlign="center">
                <Button
                  size="massive"
                  fluid
                  color="blue"
                  content="Capture"
                  onClick={this.onCapture}
                />
              </Container>
            </Grid.Column>
            <Grid.Column style={{ padding: "0 15px 0 5px" }}>
              <Container textAlign="center">
                <Button
                  size="massive"
                  fluid
                  color="blue"
                  content="Result"
                  onClick={this.result}
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
