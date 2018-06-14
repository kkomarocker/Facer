import React, { Component } from "react";
// import Webcam from "react-webcam";
import AWS from "aws-sdk";
import { creds } from "./secret";
import { Grid, Container } from "semantic-ui-react";

AWS.config.update({
  accessKeyId: creds.accessKeyId,
  secretAccessKey: creds.secretAccessKey,
  region: "us-east-1"
});

const rekognition = new AWS.Rekognition();

class CameraComponent extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column color="black" style={{ padding: "0 5px 0 15px" }}>
              <Container style={{ height: "80vh", width: "100vw" }}>
                This is where webcam component will be positioned
              </Container>
            </Grid.Column>
            <Grid.Column color="black" style={{ padding: "0 15px 0 5px" }}>
              <Container style={{ height: "80vh", width: "100vw" }}>
                This is where result component will be positioned
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default CameraComponent;
