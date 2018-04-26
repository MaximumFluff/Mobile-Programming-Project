import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { StackNavigator } from "react-navigation";
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

export default class EditCreature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hp: "",
      ac: "",
      initiative: "",
      creatures: []
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.setState({
      name: params.creatures[params.key].name,
      hp: String(params.creatures[params.key].hp),
      ac: String(params.creatures[params.key].ac),
      initiative: String(params.creatures[params.key].initiative),
      creatures: params.creatures
    });
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Edit Creature</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => params.navigation.navigate("DrawerOpen")}>
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>
    )
  });

  edit = () => {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    let newArray = this.state.creatures;
    let newCreature = {
      name: this.state.name,
      hp: this.state.hp,
      ac: this.state.ac,
      initiative: this.state.initiative
    };
    newArray[params.key] = newCreature;
    navigate("InitiativeTracker", { creatures: newArray });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content contentContainerStyle={{ flex: 1 }} style={{ padding: 10 }}>
          <Grid>
            <Row style={{ height: 50 }}>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                defaultValue={this.state.name}
                placeholder=" Name"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1
                }}
              />
              <TextInput
                onChangeText={(hp) => this.setState({ hp })}
                defaultValue={this.state.hp}
                placeholder=" HP"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1
                }}
              />
              <TextInput
                onChangeText={(ac) => this.setState({ ac })}
                defaultValue={this.state.ac}
                placeholder=" AC"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1
                }}
              />
              <TextInput
                onChangeText={(initiative) => this.setState({ initiative })}
                defaultValue={this.state.initiative}
                placeholder=" Initiative"
                style={{
                  height: 40,
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  flex: 1
                }}
              />
            </Row>
            <Row>
              <Button full style={{ flex: 1 }} onPress={this.edit}>
                <Text>Save</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
