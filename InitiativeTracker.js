import React, { Component } from "react";
import { ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Picker,
  Spinner,
  Button,
  Thumbnail,
  Drawer,
  Grid,
  Row,
  Text
} from "native-base";

export default class InitiativeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { creatures: [], name: "", ac: "", hp: "", initiative: "", i: 0 };
  }

  addPlayer = () => {
    let newArray = []
    const newPlayer = {
      name: this.state.name,
      hp: this.state.hp,
      ac: this.state.ac,
      initiative: this.state.initiative
    }
    newArray = [...this.state.creatures, newPlayer]
    newArray.sort((a, b) => {
      return b.initiative - a.initiative
    })
    this.setState({
      creatures: newArray
    })
  }

  handleDelete = (index) => {
    Alert.alert("Deleting item now")
    let nameToFilter = this.state.creatures[index].name
    let filteredArray = this.state.creatures.filter((item, index) => item.name != nameToFilter)
    this.setState({
      creatures: filteredArray
    })
  }

  render() {
    const rows = this.state.creatures.map((item, key) => (
      <Card>
        <CardItem>
          <Text>{item.name} </Text>
          <Text>HP: {item.hp} </Text>
          <Text>AC : {item.ac} </Text>
          <Text>Initiative: {item.initiative} </Text>
          <Right>
            <Button 
            transparent
            onLongPress={() => this.handleDelete(key)}>
              <Icon name="arrow-forward" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    ))

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
            <Title>Initiative Tracker</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row style={{ height: 50 }}>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder=" Name"
                style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 100, flex: 1 }}
              />
              <TextInput
                onChangeText={(hp) => this.setState({ hp })}
                value={this.state.hp}
                placeholder=" HP"
                style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 100, flex: 1 }}
              />
              <TextInput
                onChangeText={(ac) => this.setState({ ac })}
                value={this.state.ac}
                placeholder=" AC"
                style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 100, flex: 1 }}
              />
              <TextInput
                onChangeText={(initiative) => this.setState({ initiative })}
                value={this.state.initiative}
                placeholder=" Initiative"
                style={{ height: 40, borderColor: 'black', borderWidth: 1, width: 100, flex: 1 }}
              />
            </Row>
            <Row style={{ height: 50 }}>
              <Button
                full
                info
                onPress={this.addPlayer}
                style={{ flex: 1 }}><Text>Add player</Text></Button>
            </Row>
            <Row style={{ height: 480 }}>
              <ScrollView>
                {rows}
              </ScrollView>
            </Row>
            <Row style={{ height: 50 }}>
              <Button
                full
                style={{ flex: 1 }}><Text>Next</Text></Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
