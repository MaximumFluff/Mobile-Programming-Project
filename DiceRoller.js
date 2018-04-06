import React, { Component } from "react";
import { StyleSheet, Alert, Text, Image, Dimensions } from "react-native";
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
  Drawer
} from "native-base";
import { Asset, AppLoading } from "expo";
import {SideBar} from "./SideBar";

export default class DiceRoller extends React.Component {
    state = {
    diceValue: 100,
    generatedValue: "Nothing rolled yet!",
  };

  calculateDiceRoll = () => {
    let currentDiceValue = this.state.diceValue;
    let randomRoll = Math.floor(Math.random() * currentDiceValue + 1);
    this.setState({
      generatedValue: randomRoll
    });
    if (randomRoll === 20 && currentDiceValue == 20) {
      Alert.alert("Nat 20 boiz!");
    } else if (randomRoll === 1 && currentDiceValue == 20) {
      Alert.alert("Uh-oh! not looking good!");
    }
  };
  // TODO: FIX the fucking emulator
  render() {
    return (
        <Container>
          <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("Home")}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Dice Roller</Title>
            </Body>
            <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
            </Right>
          </Header>
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={require("./d20icon.png")} />
                  <Body>
                    <Text>Dice Roller</Text>
                    <Text note>Developed by Alex Jacobs</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={require("./dice.jpg")}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Picker
                  style={{ width: 200, flex: 1 }}
                  selectedValue={this.state.diceValue}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ diceValue: itemValue })
                  }>
                  <Picker.Item label="d100" value="100" />
                  <Picker.Item label="d20" value="20" />
                  <Picker.Item label="d12" value="12" />
                  <Picker.Item label="d10" value="10" />
                  <Picker.Item label="d8" value="8" />
                  <Picker.Item label="d6" value="6" />
                  <Picker.Item label="d4" value="4" />
                </Picker>
              </CardItem>
              <CardItem>
                <Body style={styles.container}>
                  <Text style={{ fontSize: 30 }}>
                    {this.state.generatedValue}
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Button
                  style={{ flex: 1 }}
                  full
                  info
                  onPress={this.calculateDiceRoll}
                  title="Something">
                  <Title>Roll!</Title>
                </Button>
              </CardItem>
            </Card>
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;