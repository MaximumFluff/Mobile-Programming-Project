import React, { Component } from "react";
import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import DiceRoller from './DiceRoller';
import SideBar from "./SideBar";

const MyApp = DrawerNavigator({
    Home: {screen: Home},
    DiceRoller: {screen: DiceRoller}
    },
    {
        initialRouteName: "Home",
        contentComponent: props => <SideBar {...props}/>
    },);

export default MyApp;