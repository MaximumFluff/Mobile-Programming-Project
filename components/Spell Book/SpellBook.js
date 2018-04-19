import Autocomplete from 'react-native-autocomplete-input'
import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, View } from 'react-native';
import { Container, Content, Button, Text, Grid, Row, Col, Header, Left, Icon, Right, Body, Title, Card, CardItem, DeckSwiper } from 'native-base';
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
    this.state = { query: "", data: newArray, spells: [] }
  }

  findSpell = query => {
    /* filtering example repurposed from https://www.npmjs.com/package/react-native-autocomplete */
    if (query === '') {
      return []
    }
    return this.state.data.filter(item =>
      item.toLowerCase().startsWith(query.toLowerCase())
    )
  }

  getSpellInfo = (query) => {
    let data = this.state.data
    let index = data.findIndex(element => {
      return element === query
    })
    index = index + 1
    console.warn(index)
    let url = `http://dnd5eapi.co/api/spells/${index}/`
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        let componentsAll = ""
        for (let i = 0; i < responseJson.components.length; i++) {
          console.log(responseJson.components[i]);
          componentsAll += responseJson.components[i];
        }
        responseJson.components = componentsAll
        if (responseJson.higher_level === undefined) {
          responseJson.higher_level = "Does not scale to higher levels"
        }
        this.setState({
          spells: [...this.state.spells, responseJson]
        })
        console.warn
      })
      .catch(err => {
        console.warn(err)
      })
  }

  render() {
    const data = this.state.data
    const spells = this.findSpell(this.state.query)
    /*const rows = this.state.spells.map((item, key) => (
      <Card contentContainerStyle={{ flex: 1 }}>
        <CardItem header bordered>
          <Text>{item.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{item.desc[0]}</Text>
            <Text>Page: {item.page}</Text>
            <Text>Range: {item.range}</Text>
            <Text>Ritual: {item.ritual}</Text>
            <Text>Concentration: {item.concentration}</Text>
            <Text>Components: {item.components}</Text>
            <Text>Casting Time: {item.casting_time}</Text>
            <Text>Level: {item.level}</Text>
            <Text>At higher levels: {item.higher_level}</Text>
          </Body>
        </CardItem>
      </Card>
    ))*/
    return (
      <Container>
        <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 13 }}>Spell Book</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row size={20}>
              <Autocomplete
                style={{ marginTop: 25, fontSize: 20 }}
                data={spells}
                defaultValue={this.state.query}
                onChangeText={text => this.setState({ query: text })}
                placeholder="Enter spell"
                renderItem={item => (
                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => this.setState({ query: item })}>
                      <Text style={{ fontSize: 20 }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                )}
              />
            </Row>
            <Row size={60}>
              <Col>
                <DeckSwiper
                  style={{ flex: 1 }}
                  dataSource={this.state.spells}
                  renderItem={item => (
                    <Card contentContainerStyle={{ flex: 1 }}>
                      <CardItem header bordered>
                        <Text>{item.name}</Text>
                      </CardItem>
                      <CardItem>
                        <Body>
                          <Text>{item.desc[0]}</Text>
                          <Text>Page: {item.page}</Text>
                          <Text>Range: {item.range}</Text>
                          <Text>Ritual: {item.ritual}</Text>
                          <Text>Concentration: {item.concentration}</Text>
                          <Text>Components: {item.components}</Text>
                          <Text>Casting Time: {item.casting_time}</Text>
                          <Text>Level: {item.level}</Text>
                          <Text>At higher levels: {item.higher_level}</Text>
                        </Body>
                      </CardItem>
                    </Card>)}></DeckSwiper>
              </Col>
            </Row>
            <Row size={5}>
              <Col>
                <Button
                  full
                  info
                  onPress={() => this.getSpellInfo(this.state.query)}
                  style={{ flex: 1 }}><Text>Save to memory</Text></Button>
              </Col>
              <Col>
                <Button
                  full
                  info
                  onPress={() => this.getSpellInfo(this.state.query)}
                  style={{ flex: 1 }}><Text>Add</Text></Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
