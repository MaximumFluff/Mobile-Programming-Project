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
      firstSection: [
        "",
        "",
        "",
        "",
        "A",
        "Be",
        "De",
        "El",
        "Fa",
        "Jo",
        "Ki",
        "La",
        "Ma",
        "Na",
        "O",
        "Pa",
        "Re",
        "Si",
        "Ta",
        "Va"
      ],
      secondSection: [
        "bar",
        "ched",
        "dell",
        "far",
        "gran",
        "hal",
        "jen",
        "kel",
        "lim",
        "mor",
        "net",
        "penn",
        "quil",
        "rond",
        "sark",
        "shen",
        "tur",
        "vash",
        "yor",
        "zen"
      ],
      lastSection: [
        "",
        "a",
        "ac",
        "ai",
        "al",
        "am",
        "an",
        "ar",
        "ea",
        "el",
        "er",
        "ess",
        "ett",
        "ic",
        "id",
        "il",
        "in",
        "is",
        "or",
        "us"
      ],
      randomName: ""
    };
  }

  generateName = () => {
    let firstIndex = Math.floor(Math.random() * 19);
    let secondIndex = Math.floor(Math.random() * 19);
    let lastIndex = Math.floor(Math.random() * 19);
    // console.warn(firstIndex, secondIndex, lastIndex);
    this.setState({
      randomName: `${this.state.firstSection[firstIndex]}${this.state.firstSection[firstIndex] === "" ? this.state.secondSection[secondIndex].charAt(0).toUpperCase() : this.state.secondSection[secondIndex]}${this.state.lastSection[lastIndex]}`
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
            <Title style={{ fontSize: 13 }}>Random Name Generator</Title>
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
                  <H1
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: 30,
                      marginTop: 50
                    }}>
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
