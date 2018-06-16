import React from "react";
import {
  Grid,
  Container,
  Card,
  Dropdown,
  Image,
  Segment,
  Header
} from "semantic-ui-react";

const Pictures = props => {
  console.log(props);
  //TODO

  if (!props.data.FaceMatches && props.pictures) {
    return (
      <div>
        <Segment>
          <Header size="huge">
            Picture has captured.<br />Please press log-in.
          </Header>
        </Segment>
      </div>
    );
  }

  return (
    <div>
      {props.logInStatus === "Successfully logged-in" &&
      props.data.FaceMatches.length ? (
        <div>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column
                style={{ backgroundColor: "white", padding: "28px 0 0 10px" }}
              >
                <Card fluid>
                  <Image alt={props.name} src={props.pictures} size="medium" />
                  <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                    <Card.Description>
                      {props.name} is something to be descriptive.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column
                style={{ backgroundColor: "red", padding: "28px 10px 0 0px" }}
              />
            </Grid.Row>
          </Grid>
        </div>
      ) : (
        <div>
          <h1>
            Data not found.<br /> Please check your name or register.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Pictures;
