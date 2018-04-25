import React, { Component } from "react";
import { ScrollView, TextInput, StyleSheet } from "react-native";
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
  Text,
  Toast
} from "native-base";
import { StackNavigator } from "react-navigation";
import { SideBar } from "../SideBar/SideBar";

export default class InitiativeTracker extends Component {
  // This handles rendering the normal navbar in the context of the Stack Navigator
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Home")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Initiative Tracker</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      creatures: [],
      name: "",
      ac: "",
      hp: "",
      initiative: "",
      i: 0,
      showToast: false
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      this.setState({
        creatures: params.creatures.sort((a, b) => {
          return b.initiative - a.initiative;
        })
      });
    }
  }

  addPlayer = () => {
    let newArray = [];
    const newPlayer = {
      name: this.state.name,
      hp: this.state.hp,
      ac: this.state.ac,
      initiative: this.state.initiative
    };
    newArray = [...this.state.creatures, newPlayer];
    Toast.show({
      text: "Player added",
      buttonText: "Okay",
      duration: 3000,
      position: "bottom"
    })
    this.setState({
      creatures: newArray.sort((a, b) => {
        return b.initiative - a.initiative;
      })
    });
  };

  handleDelete = (index) => {
    let filteredArray = this.state.creatures;
    filteredArray.splice(index, 1);
    this.setState({
      creatures: filteredArray
    });
    // Show toast when deleting
    Toast.show({
      text: "Item deleted",
      buttonText: "Okay",
      duration: 3000,
      position: "bottom"
    });
    if (this.state.i > this.state.creatures.length - 1) {
      this.setState({
        i: this.state.i - 1
      });
    }
  };

  incrementor = () => {
    if (this.state.i == this.state.creatures.length - 1) {
      this.setState({
        i: 0
      });
    } else if (this.state.creatures == "") {
      // Error handling, if nothing in state and button pressed make no changes
      return;
    } else {
      this.setState({
        i: this.state.i + 1
      });
    }
  };

  decrementor = () => {
    if (this.state.i == 0) {
      this.setState({
        i: this.state.creatures.length - 1
      });
    } else if (this.state.creatures == "") {
      // Error handling, if nothing in state and button pressed make no changes
      return;
    } else {
      this.setState({
        i: this.state.i - 1
      });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const rows = this.state.creatures.map((item, key) => (
      <Card key={key}>
        <CardItem
          style={
            key === this.state.i
              ? { backgroundColor: "lightblue" }
              : { backgroundColor: "white" }
          }>
          <Body>
            <Text>{item.name} </Text>
            <Text>HP: {item.hp} </Text>
            <Text>AC : {item.ac} </Text>
            <Text>Initiative: {item.initiative} </Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                navigate("EditCreature", {
                  creatures: this.state.creatures,
                  key: key
                })
              }
              style={{ width: 50 }}
              onLongPress={() => this.handleDelete(key)}>
              <Icon name="arrow-forward" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    ));

    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row style={{ height: 50 }}>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder=" Name"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1,
                  borderColor: "transparent"
                }}
              />
              <TextInput
                onChangeText={(hp) => this.setState({ hp })}
                value={String(this.state.hp)}
                placeholder=" HP"
                keyboardType="numeric"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1,
                  borderColor: "transparent"
                }}
              />
              <TextInput
                onChangeText={(ac) => this.setState({ ac })}
                value={String(this.state.ac)}
                placeholder=" AC"
                keyboardType="numeric"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1,
                  borderColor: "transparent"
                }}
              />
              <TextInput
                onChangeText={(initiative) => this.setState({ initiative })}
                value={String(this.state.initiative)}
                placeholder=" Initiative"
                keyboardType="numeric"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1,
                  borderColor: "transparent"
                }}
              />
            </Row>
            <Row style={{ height: 50 }}>
              <Button
                full
                info
                onPress={this.addPlayer}
                style={{ flex: 1 }}>
                <Text>Add player</Text>
              </Button>
            </Row>
            <Row style={{ height: 480 }}>
              <ScrollView>{this.state.creatures.length < 1 ? <Text>Tap the arrow to edit, hold to delete</Text> : rows}</ScrollView>
            </Row>
            <Row style={{ height: 70 }}>
              <Button
                full
                onPress={this.decrementor}
                style={{ flex: 1, marginRight: 10 }}>
                <Text>Prev</Text>
              </Button>
              <Button
                full
                onPress={this.incrementor}
                style={{ flex: 1, marginLeft: 10 }}>
                <Text>Next</Text>
              </Button>
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

/* solved navigation issues with: https://github.com/react-navigation/react-navigation/issues/3254 */
