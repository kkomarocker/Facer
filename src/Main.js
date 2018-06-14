import React, { Component } from "react";
import { Header, Container, Segment, Button } from "semantic-ui-react";
import CameraComponent from "./CameraComponent";

class Main extends Component {
  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  //   this.setState({
  //     picture: imageSrc
  //   });
  // };

  render() {
    return (
      <div>
        <div>
          <Container textAlign="center" fluid>
            <Segment>
              <Header size="huge">App Name???</Header>
            </Segment>
          </Container>
        </div>
        <div>
          <CameraComponent style={{ border: "0 0 20px 0" }} />
        </div>
        <div>
          <Container fluid>
            <Button fluid size="massive" color="red">
              Capture & Verify
            </Button>
          </Container>
        </div>
      </div>
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

export default Main;
