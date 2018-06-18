import React from "react";
import {
  Grid,
  Container,
  Card,
  Button,
  Image,
  Header
} from "semantic-ui-react";

const Pictures = props => {
  if (props.registered) {
    return (
      <Header
        size="huge"
        style={{ fontSize: "3.5em", color: "white", padding: "28px 0 0 10px" }}
      >
        You are registered! <br />Press Reset and Log-in again!
      </Header>
    );
  }

  if (props.captured) {
    return (
      <div>
        <Header
          size="huge"
          style={{
            fontSize: "3.5em",
            color: "white",
            padding: "28px 0 0 10px"
          }}
        >
          Picture has captured.<br />Please press Log-In or Register
        </Header>
        <Container>
          <Button
            size="massive"
            color="red"
            content="Register"
            onClick={() => props.register()}
          />
        </Container>
      </div>
    );
  }

  if (props.err) {
    return (
      <div>
        <Header
          size="huge"
          style={{
            fontSize: "3.5em",
            color: "white",
            padding: "28px 0 0 10px"
          }}
        >
          User not Valid.<br />Please register
        </Header>
        <Container>
          <Button
            size="massive"
            color="red"
            content="Register"
            onClick={() => props.register()}
          />
        </Container>
      </div>
    );
  }

  return (
    <div>
      <div>
        {props.logInStatus && props.data.FaceMatches[0].Similarity > 95 ? (
          <Grid>
            <Grid.Row>
              <Grid.Column style={{ padding: "28px 0 0 10px" }}>
                <Card
                  centered={true}
                  style={{ height: "410px", width: "480px" }}
                >
                  <Image
                    alt={props.name}
                    src={`https://s3.amazonaws.com/facerdb/${props.name.toLowerCase()}profile.jpg`}
                    centered={true}
                    style={{ height: "320px", width: "240px" }}
                  />
                  <Card.Content>
                    <Card.Header style={{ fontSize: "1.7em" }}>
                      {props.name}
                    </Card.Header>
                    <Card.Description style={{ fontSize: "1.3em" }}>
                      Student @ Fullstack Academy
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : (
          <div>
            <Header
              size="huge"
              style={{
                fontSize: "3.5em",
                color: "white",
                padding: "28px 0 0 10px"
              }}
            >
              Picture has not captured yet<br />Please take a snapshot!
            </Header>
          </div>
        )}
      </div>
      <div>
        {props.detectedData.FaceDetails ? (
          <Grid divided="vertically">
            <Container>
              <Header
                style={{
                  fontSize: "2.5em",
                  textAlign: "center",
                  paddingTop: "15px",
                  color: "white"
                }}
                content="Analyzed Result"
              />
            </Container>
            <Grid.Row columns={4}>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header as="h1">
                        Emotional Status:{" "}
                        {props.detectedData.FaceDetails[0].Emotions[0].Type}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header as="h1">
                        Has Eyeglasses:{" "}
                        {props.detectedData.FaceDetails[0].Eyeglasses.Value
                          ? "Yes"
                          : "No"}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header as="h1">
                        Age Range:
                        {props.detectedData.FaceDetails[0].AgeRange.Low}-
                        {props.detectedData.FaceDetails[0].AgeRange.High}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Card>
                    <Card.Content>
                      <Card.Header as="h1">
                        Smiled:{" "}
                        {props.detectedData.FaceDetails[0].Smile.Value
                          ? "Yes"
                          : "No"}
                      </Card.Header>
                    </Card.Content>
                  </Card>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ) : null
        // <div>
        //   <Header
        //     size="huge"
        //     style={{
        //       fontSize: "3.5em",
        //       color: "white",
        //       padding: "28px 0 0 10px"
        //     }}
        //   >
        //     Picture has not captured yet<br />Please take a snapshot!
        //   </Header>
        // </div>
        }
      </div>
    </div>
  );
};

export default Pictures;
