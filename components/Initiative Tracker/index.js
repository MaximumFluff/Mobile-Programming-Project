import { StackNavigator } from 'react-navigation';
import InitiativeTracker from './InitiativeTracker';
import EditCreature from './EditCreature';

import React, { Component } from 'react';
import { View, Text, } from 'react-native';

const MyApp = StackNavigator({
  InitiativeTracker: {screen: InitiativeTracker},
  EditCreature: {screen: EditCreature}
});

export default class index extends Component {
  render() {
    return (
      <MyApp />
    );
  }
}
