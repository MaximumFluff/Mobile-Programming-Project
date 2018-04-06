import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Expo from "expo";
import MyApp from "./router";
import SideBar from "./SideBar";

export default class App extends React.Component {
    state = {isReady: false}
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <MyApp />;
  }
}
