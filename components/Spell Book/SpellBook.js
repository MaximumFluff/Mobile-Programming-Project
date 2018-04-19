import Autocomplete from 'react-native-autocomplete-input'
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Grid, Row } from 'native-base';
import { SideBar } from '../SideBar/SideBar';
import data from './select.json';
/* Figured out JSON import from: https://stackoverflow.com/questions/29452822/how-to-fetch-data-from-local-json-file-on-react-native */

export default class SpellBook extends Component {

  constructor(props) {
    super(props)
    let newArray = [];
    data.forEach((item, key) => {
      newArray[key] = item.text
    })
    //console.warn(newArray);
    this.state = { query: "", data: newArray }
    console.warn(this.state.data)
  }

  render() {
    const { data } = this.state.data
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row size={25}>
              <Autocomplete
                style={{ marginTop: 50 }}
                data={this.state.data}
                defaultValue={this.state.query}
                onChangeText={text => this.setState({ query: text })}
                placeholder="Enter spell"
                renderItem={item => (
                  <TouchableOpacity onPress={() => this.setState({ query: item })}>
                    <Text>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}