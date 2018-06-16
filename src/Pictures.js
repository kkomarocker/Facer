import React from "react";
import {
  Grid,
  Container,
  Card,
  Button,
  Dropdown,
  Image,
  Segment,
  Header
} from "semantic-ui-react";

const detail = [{ text: "Emotional Status", value: "Emotional Status" }];

const Pictures = props => {
  if (props.captured && !props.logInStatus) {
    if (props.registered) {
      return <h1>You are registered! Please log in again!</h1>;
    } else {
      return (
        <div>
          <Segment>
            <Header size="huge">
              Picture has captured.<br />Please press Log-in or register
            </Header>
            <Container>
              <Button
                size="massive"
                color="blue"
                content="Register"
                onClick={() => props.register()}
              />
            </Container>
          </Segment>
        </div>
      );
    }
  }

  return (
    <div>
      {props.logInStatus ? (
        <div>
          <Grid divided="vertically">
            <Grid.Row>
              <Grid.Column
                style={{ backgroundColor: "white", padding: "28px 0 0 10px" }}
              >
                <Card centered={true}>
                  <Image alt={props.name} src={props.pictures} size="large" />
                  <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Description>
                      You are logged into LearnDot! Have a great day!
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : (
        <div>
          <h1 style={{ padding: "28px 0 0 0" }}>
            If you do not have credentials...<br /> 1. Type your name in above.{" "}
            <br /> 2. Press "Capture"<br /> 3. Press "Register"
          </h1>
        </div>
      )}
      <div>
        {props.detectedData.FaceDetails ? (
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Container>
                  <Header size="huge" content="Aspects" />
                  <Dropdown
                    fluid
                    selection
                    placeholder="Select One of below"
                    options={detail}
                  />
                </Container>
              </Grid.Column>
              <Grid.Column>
                <h1>For score</h1>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null}
      </div>
      <div />
    </div>
  );
};

export default Pictures;
