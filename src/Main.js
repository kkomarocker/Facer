import React, { Component } from "react";
import { Header, Container, Segment, Input, Grid } from "semantic-ui-react";
import CameraComponent from "./CameraComponent";

class Main extends Component {
  render() {
    return (
      <div>
        <div>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Container fluid>
                  <div style={{ padding: "25px 5px 0 15px" }}>
                    <Header
                      style={{
                        fontSize: "3.5em"
                      }}
                    >
                      FS FaceMatch 3.0
                    </Header>
                  </div>
                </Container>
              </Grid.Column>
              <Grid.Column
                style={{
                  textAlign: "right"
                }}
              >
                <Container>
                  <div style={{ padding: "25px 15px 0 5px" }}>
                    <Input
                      fluid
                      size="massive"
                      placeholder="Type Your First Name"
                    />
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div>
          <CameraComponent style={{ border: "0 0 20px 0" }} />
        </div>
      </div>
    );
  }
}

export default Main;
