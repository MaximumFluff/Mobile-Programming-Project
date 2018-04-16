import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import Home from "./Home";
import DiceRoller from "./DiceRoller";
import SideBar from "./SideBar";
import RandomName from "./RandomName";
import InitiativeTracker from "./InitiativeTracker";

const MyApp = DrawerNavigator(
  {
    Home: {
      screen: Home
    },
    "Dice Roller": {
      screen: DiceRoller
    },
    "Random Name Generator": {
      screen: RandomName
    },
    "Initiative Tracker": {
        screen: InitiativeTracker
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: (props) => <SideBar {...props} />
  }
);

export default MyApp;
