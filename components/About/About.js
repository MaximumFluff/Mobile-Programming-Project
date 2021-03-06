import React, { Component } from "react";
import { StyleSheet, Alert, Image } from "react-native";
import {
  Container,
  Button,
  Icon,
  Left,
  Title,
  Header,
  Body,
  Right,
  Content,
  Card,
  CardItem,
  Text,
  Toast
} from "native-base";
import { Asset, AppLoading } from "expo";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomMessage: [
        "Rawr!",
        "Get out of my dungeon!",
        "Don't touch me!",
        "Send me bitcoin and I'll unlock the secret features! ;)",
        "My other dungeon is the tomb of horrors",
        "Nice inventory, shame if something happened to it",
        "Waterdeep is so lovely this time of year",
        "I just cursed your dice lol",
        "Have you seen my pet mimic?",
        "My hit die is a d100",
        "I bet you're a widow main",
        "Stadin kingit IFK!",
        "I ain't scared of no cleric!",
        "Hello there!",
        "I am the senate!",
        "I live to wipe your party!",
        "This is where the fun begins!",
        "I rate this project a 5/5",
        "Imma bout to slam dunk on some paladins",
        "Torille Tavataan!",
        "SUOMI!",
        ""
      ],
      showToast: false
    };
  }

  showToast = () => {
    Toast.show({
      text: this.state.randomMessage[
        Math.floor(Math.random() * this.state.randomMessage.length)
      ],
      buttonText: ":D",
      duration: 3000,
      position: "bottom"
    });
  };

  render() {
    return (
      <Container>
        <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>About</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            <CardItem header>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                D&D Companion App
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This app was developed by myself over a period of one month as
                  part of my Mobile Programming course here at Haaga-Helia
                  University of Applied Sciences.
                </Text>
                <Text style={{ paddingTop: 25 }}>
                  This app aims to be a useful companion app for players of
                  Dungeons & Dragons, offering several features that would be
                  useful in playing or running a game as a Dungeon Master.
                </Text>
                <Text style={{ paddingTop: 25 }}>
                  This project makes extensive use of the Native Base library. it
                  also features the React Native Autocomplete Input & React
                  Navigation libraries, among others.
                </Text>
              </Body>
            </CardItem>
            <CardItem button onPress={() => this.showToast()}>
              <Image source={require("../../15467.png")} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
