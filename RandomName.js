import React, { Component } from "react";
import { StyleSheet, Alert, Image, Dimensions } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  Text,
  H1,
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
import { Asset, AppLoading } from "expo";
import { SideBar } from "./SideBar";

export default class RandomName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: ["Mick", "Bob", "Dave", "Susan", "Cindy"],
      lastname: ["Johnson", "Jameson", "Clark", "Musk", "Jacob"],
      randomName: ""
    };
  }

  generateName = () => {
    let length = this.state.firstname.length;
    let firstIndex = Math.floor(Math.random() * length);
    let secondIndex = Math.floor(Math.random() * length);
    this.setState({
      randomName:
        this.state.firstname[firstIndex] +
        " " +
        this.state.lastname[secondIndex]
    });
  };

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
            <Title style={{fontSize: 13}}>Random Name Generator</Title>
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
            <Row size={75}>
            <Card>
                <CardItem cardBody>
                  <H1 style={{ flex: 1, textAlign: 'center', fontSize: 30, marginTop: 50}}>
                    {this.state.randomName}
                  </H1>
                </CardItem>
                </Card>
              </Row>
              <Row size={25}>
                  <Button
                    style={{ flex: 1 }}
                    full
                    info
                    onPress={this.generateName}
                    title="Something">
                    <Title>Generate name</Title>
                  </Button>
              </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
