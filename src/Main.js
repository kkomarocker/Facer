import React, { Component } from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import CameraComponent from "./CameraComponent";

class Main extends Component {
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
      </div>
    );
  }
}

export default Main;
