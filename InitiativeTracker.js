import React, { Component } from "react";
import { Text, ScrollView, TextInput, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Picker,
  Spinner,
  Button,
  Thumbnail,
  Drawer,
  Grid,
  Row
} from "native-base";

export default class InitiativeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { creatures: [], current: "" };
  }
  render() {
    return (
      <Container>
        <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Initiative Tracker</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row>
              <Button full info title="Press">
                <Text>Press me!</Text>
              </Button>
            </Row>
            <Row>
              <TextInput
                onChangeText={(current) => this.setState({ current })}
                value={this.state.current}
                style={{height: 40, borderColor: 'black', borderWidth: 1, width: 100}}
              />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
