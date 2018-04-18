import React, { Component } from "react";
import { DrawerNavigator } from "react-navigation";
import Home from "../Home/Home";
import DiceRoller from "../Dice Roller/DiceRoller";
import SideBar from "./SideBar";
import RandomName from "../Random Name Generator/RandomName";
import index from "../Initiative Tracker/index";

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
        screen: index
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: (props) => <SideBar {...props} />
  }
);

export default MyApp;
