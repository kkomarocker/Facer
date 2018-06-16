import React from "react";
import {
  Grid,
  Container,
  Card,
  Button,
  Segment,
  Image,
  Header
} from "semantic-ui-react";

const Pictures = props => {
  if (props.captured && !props.logInStatus) {
    if (props.registered) {
      return (
        <Header size="huge" style={{ padding: "28px 0 0 10px" }}>
          You are registered! Please log-in again!
        </Header>
      );
    } else {
      return (
        <div>
          <Header size="huge" style={{ padding: "28px 0 0 10px" }}>
            Picture has captured.<br />Please press Log-In or Register
          </Header>
          <Container>
            <Button
              size="massive"
              color="blue"
              content="Register"
              onClick={() => props.register()}
            />
          </Container>
        </div>
      );
    }
  }

  return (
    <div>
      {props.logInStatus && props.data !== {} ? (
        <div>
          <Grid divided="vertically">
            <Grid.Row>
              <Grid.Column
                style={{ backgroundColor: "white", padding: "28px 0 0 10px" }}
              >
                <Card centered={true} fluid>
                  <Image
                    alt={props.name}
                    src={props.pictures}
                    size="large"
                    centered={true}
                  />
                  <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Description>
                      You are logged into LearnDot!
                    </Card.Description>
                    <Card.Description>Have a great day!</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      ) : null}
      <div>
        {props.detectedData.FaceDetails ? (
          <Grid divided="vertically">
            <Container>
              <Segment>
                <Header size="large" content="Analyzed Result" />
              </Segment>
            </Container>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header>Emotional Status</Card.Header>
                      <Card.Description>
                        {props.detectedData.FaceDetails[0].Emotions[0].Type}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header>Has Eyeglasses?</Card.Header>
                      <Card.Description>
                        {props.detectedData.FaceDetails[0].Eyeglasses.Value
                          ? "Yes"
                          : "No"}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header>Smiled?</Card.Header>
                      <Card.Description>
                        {props.detectedData.FaceDetails[0].Smile.Value
                          ? "Yes"
                          : "No"}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Container>
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
