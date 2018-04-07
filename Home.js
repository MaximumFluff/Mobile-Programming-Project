import React, { Component } from "react";
import { StyleSheet, Alert, Text, Image, Dimensions } from "react-native";
import {Container, Button, Icon, Left, Title, Header, Body, Right} from "native-base";
import { Asset, AppLoading } from "expo";

export default class Home extends React.Component {
  render() {
    return (
        <Container>
            <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73}}>
                <Left>
                    <Button
                    transparent
                    onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                    <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Home</Title>
                </Body>
            </Header>
            <Image source={require("./cover.png")} style={{width: width, height: height + 20}} />
        </Container>
    );
  }
}

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
