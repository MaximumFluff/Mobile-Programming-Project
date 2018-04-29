import React, { Component } from "react";
import {
  ScrollView,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Body,
  Icon,
  Card,
  CardItem,
  Button,
  Drawer,
  Grid,
  Row,
  Text,
  Toast,
  Spinner
} from "native-base";
import { StackNavigator } from "react-navigation";
import { SideBar } from "../SideBar/SideBar";

export default class InitiativeTracker extends Component {
  // This handles rendering the normal navbar in the context of the Stack Navigator
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("About")}>
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
      showToast: false,
      isLoading: true
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) {
      this.setState({
        creatures: params.creatures.sort((a, b) => {
          return b.initiative - a.initiative
        }),
        isLoading: false
      });
    } else {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      let savedCreatures = await AsyncStorage.getItem("creatures");
      if (savedCreatures != null) {
        this.setState({
          creatures: JSON.parse(savedCreatures),
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
    } catch (err) {
      Toast.show({
        text: `Something seems to have gone wrong during loading: ${err}`,
        buttonText: "Okay",
        duration: 3000,
        position: "bottom",
        type: "warning"
      });
    }
  };

  saveData = async () => {
    try {
      let currentCreatures = JSON.stringify(this.state.creatures);
      await AsyncStorage.setItem("creatures", currentCreatures);
      Toast.show({
        text: "Data saved!",
        buttonText: "Okay",
        duration: 3000,
        position: "bottom"
      });
    } catch (err) {
      Toast.show({
        text: `Something went wrong with saving the data: ${err}`,
        buttonText: "Okay",
        duration: 3000,
        position: "bottom",
        type: "warning"
      });
    }
  };

  addPlayer = () => {
    let newArray = [];
    let hp = parseInt(this.state.hp);
    let ac = parseInt(this.state.ac);
    let initiative = parseInt(this.state.initiative);
    const newPlayer = {
      name: this.state.name,
      hp: hp,
      ac: ac,
      initiative: initiative
    };
    newArray = [...this.state.creatures, newPlayer];
    Toast.show({
      text: "Player added",
      buttonText: "Okay",
      duration: 3000,
      position: "bottom"
    });
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
    if (this.state.isLoading) {
      return (
        <Content
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
          <Spinner color="blue" />
        </Content>
      );
    }

    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row size={10}>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder=" Name"
                style={styles.input}
              />
              <TextInput
                onChangeText={(hp) => this.setState({ hp })}
                value={String(this.state.hp)}
                placeholder=" HP"
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                onChangeText={(ac) => this.setState({ ac })}
                value={String(this.state.ac)}
                placeholder=" AC"
                keyboardType="numeric"
                style={styles.input}
              />
              <TextInput
                onChangeText={(initiative) => this.setState({ initiative })}
                value={String(this.state.initiative)}
                placeholder=" Initiative"
                keyboardType="numeric"
                style={styles.input}
              />
            </Row>
            <Row size={10}>
              <Button full info onPress={this.addPlayer} style={{ flex: 1 }}>
                <Text>Add player</Text>
              </Button>
            </Row>
            <Row size={60}>
              <ScrollView style={{ flex: 1 }}>
                {this.state.creatures.length < 1 ? (
                  <View style={styles.container}>
                    <Text>
                      To modify list items, tap the arrow to edit, hold to
                      delete
                    </Text>
                  </View>
                ) : (
                    rows
                  )}
              </ScrollView>
            </Row>
            <Row size={10}>
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
            <Row size={10}>
              <Button full onPress={this.saveData} style={{ flex: 1, paddingTop: 5 }}>
                <Text>Save</Text>
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
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    flex: 1,
    borderColor: "transparent"
  }
});

/* solved navigation issues with: https://github.com/react-navigation/react-navigation/issues/3254 */
