import React, { Component } from "react";
import { Header, Container, Input, Grid } from "semantic-ui-react";
import CameraComponent from "./CameraComponent";

class Main extends Component {
  constructor() {
    super();

    this.state = {
      name: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({
      name: event.target.value
    });
  }
  render() {
    return (
      <div>
        <div>
          <Grid divided="vertically" style={{ backgroundColor: "#3170E5" }}>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Container fluid>
                  <div style={{ padding: "25px 5px 0 15px" }}>
                    <Header
                      style={{
                        fontSize: "3.5em",
                        color: "white"
                      }}
                    >
                      FaceMatch
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
                      placeholder="Type your first name and press capture"
                      value={this.state.name}
                      onChange={this.changeHandler}
                    />
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div>
          <CameraComponent
            style={{ border: "0 0 20px 0" }}
            name={this.state.name}
          />
        </div>
      </div>
    );
  }
}

export default Main;
