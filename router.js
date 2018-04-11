import React, { Component } from "react";
import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import DiceRoller from './DiceRoller';
import SideBar from "./SideBar";
import RandomName from "./RandomName"

const MyApp = DrawerNavigator({
    Home: {screen: Home},
    DiceRoller: {screen: DiceRoller},
    RandomName: {screen: RandomName}
    },
    {
        initialRouteName: "Home",
        contentComponent: props => <SideBar {...props}/>
    },);

export default MyApp;