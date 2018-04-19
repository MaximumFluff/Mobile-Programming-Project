import React, { Component } from "react";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import Home from "../Home/Home";
import DiceRoller from "../Dice Roller/DiceRoller";
import SideBar from "./SideBar";
import RandomName from "../Random Name Generator/RandomName";
import EditCreature from '../Initiative Tracker/EditCreature'
import InitiativeTracker from '../Initiative Tracker/InitiativeTracker'

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
      screen: StackNavigator({
        InitiativeTracker: { screen: InitiativeTracker },
        EditCreature: { screen: EditCreature }
      })
    }
  },
  {
    initialRouteName: "Home",
    contentComponent: (props) => <SideBar {...props} />
  }
);

export default MyApp;
