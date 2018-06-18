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
    this.blankName = this.blankName.bind(this);
  }

  changeHandler(event) {
    this.setState({
      name: event.target.value
    });
  }

  blankName() {
    this.setState({
      name: ""
    });
  }

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
                        fontSize: "6.5em",
                        color: "black"
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
                      placeholder="Enter your first name"
                      value={this.state.name}
                      onChange={this.changeHandler}
                      style={{ height: "100px", fontSize: "3.5em" }}
                    />
                  </div>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div>
          <CameraComponent
            style={{ backgroundColor: "#3170E5", border: "0 0 20px 0" }}
            name={this.state.name}
            resetName={this.blankName}
          />
        </div>
      </div>
    );
  }
}

export default Main;
