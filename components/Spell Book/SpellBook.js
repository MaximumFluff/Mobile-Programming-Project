import Autocomplete from "react-native-autocomplete-input";
import React, { Component } from "react";
import { TouchableOpacity, ScrollView, View, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Grid,
  Row,
  Col,
  Header,
  Left,
  Icon,
  Right,
  Body,
  Title,
  Card,
  CardItem,
  DeckSwiper,
  Spinner,
  Toast
} from "native-base";
import { SideBar } from "../SideBar/SideBar";
import data from "./select.json";
/* Figured out JSON import from: https://stackoverflow.com/questions/29452822/how-to-fetch-data-from-local-json-file-on-react-native */

export default class SpellBook extends Component {
  constructor(props) {
    super(props);
    let newArray = [];
    data.forEach((item, key) => {
      newArray[key] = item.text;
    });
    this.state = { query: "", data: newArray, spells: [], isLoading: true, showToast: false };
  }

  componentDidMount() {
    this.loadData();
  }

  findSpell = (query) => {
    /* filtering example repurposed from https://www.npmjs.com/package/react-native-autocomplete */
    if (query === "") {
      return [];
    }
    return this.state.data.filter((item) =>
      item.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  getSpellInfo = (query) => {
    let data = this.state.data;
    let index = data.findIndex((element) => {
      return element === query;
    });
    index = index + 1;
    let url = `http://dnd5eapi.co/api/spells/${index}/`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let componentsAll = "";
        for (let i = 0; i < responseJson.components.length; i++) {
          console.log(responseJson.components[i]);
          componentsAll += responseJson.components[i];
        }
        responseJson.components = componentsAll;
        if (responseJson.higher_level === undefined) {
          responseJson.higher_level = "Does not scale to higher levels";
        }
        this.setState({
          spells: [...this.state.spells, responseJson]
        });
        Toast.show({
            text: "Spell added!",
            buttonText: "Okay",
            duration: 3000,
            position: "bottom"
        })
      })
      .catch((err) => {
        console.warn("Error", err);
      });
  };

  saveData = async () => {
    try {
      let currentSpells = JSON.stringify(this.state.spells);
      await AsyncStorage.setItem("spells", currentSpells);
      Toast.show({
        text: "Data saved!",
        buttonText: "Okay",
        duration: 3000,
        position: "bottom"
      })
    } catch (err) {
      console.warn(err);
    }
  };

  loadData = async () => {
    try {
      let savedSpells = await AsyncStorage.getItem("spells");
      if (savedSpells != null) {
        this.setState({
          spells: JSON.parse(savedSpells),
          isLoading: false
        });
        //console.warn("Data succesfully loaded!")
      } else {
        console.warn("No data saved yet");
        this.setState({
          spells: [],
          isLoading: false
        });
      }
    } catch (err) {
      console.warn("Error", err);
    }
  };

  render() {
    const data = this.state.data;
    const spells = this.findSpell(this.state.query);
    if (this.state.isLoading) {
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
          <Content
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Spinner color="blue" />
          </Content>
        </Container>
      );
    }
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
                onChangeText={(text) => this.setState({ query: text })}
                placeholder="Enter spell"
                renderItem={(item) => (
                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => this.setState({ query: item })}>
                      <Text style={{ fontSize: 20 }}>{item}</Text>
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
                  renderItem={(item) => (
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
                  )}
                />
              </Col>
            </Row>
            <Row size={5}>
              <Col>
                <Button full info onPress={this.saveData} style={{ flex: 1 }}>
                  <Text>Save to memory</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  full
                  info
                  onPress={() => this.getSpellInfo(this.state.query)}
                  style={{ flex: 1 }}>
                  <Text>Add</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
