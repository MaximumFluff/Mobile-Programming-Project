import React, { Component } from "react";
import { Root } from "native-base";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import About from "../About/About";
import DiceRoller from "../Dice Roller/DiceRoller";
import SideBar from "./SideBar";
import RandomName from "../Random Name Generator/RandomName";
import EditCreature from "../Initiative Tracker/EditCreature";
import InitiativeTracker from "../Initiative Tracker/InitiativeTracker";
import SpellBook from "../Spell Book/SpellBook";

const MyApp = DrawerNavigator(
  {
    About: {
      screen: About
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
    },
    "Spell Book": {
      screen: SpellBook
    }
  },
  {
    initialRouteName: "About",
    contentComponent: (props) => <SideBar {...props} />
  }
);

export default () => (
  <Root>
    <MyApp />
  </Root>
);
