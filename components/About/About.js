import React, { Component } from "react";
import { StyleSheet, Alert, Image, Dimensions } from "react-native";
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
} from "native-base";
import { Asset, AppLoading } from "expo";

export default class About extends React.Component {
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
              <Text style={{fontSize: 30, fontWeight: "bold"}}>D&D Companion App</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  This app was developed by me over a period of one month as
                  part of my Mobile Programming course here at Haaga-Helia
                  University of Applied Sciences.
                </Text>
                <Text style={{paddingTop: 25}}>
                  This app aims to be a useful companion app for players of Dungeons & Dragons, offering several features that would be useful in playing or running a game.</Text>
                <Text style={{paddingTop: 25}}>
                  This app makes extensive use of the Native Base library. it also features the React Native Autocomplete Input & React Navigation libraries
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Very little to no copyright by Alex Jacobs</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
