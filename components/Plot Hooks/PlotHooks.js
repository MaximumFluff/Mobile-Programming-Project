import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
import Accordion from 'react-native-collapsible/Accordion';
import { SideBar } from "../SideBar/SideBar";
import Hooks from "./hooks.json";

export default class PlotHooks extends Component {

  constructor(props) {
    super(props)
    this.state = { hooks: Hooks }
  }

  _renderHeader(section) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>{section.title}</Text>
      </View>

    );
  }

  _renderContent(section) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 18, paddingBottom: 20 }}>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Header style={{ paddingTop: 30, paddingBottom: 20, height: 73 }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("About")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 13 }}>Plot Hooks</Title>
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
            <Row size={100}>
              <Card style={{ flex: 1, elevation: 3 }}>
                <CardItem>
                  <Body>
                    <Accordion
                      style={{ flex: 1 }}
                      underlayColor={"rgba(0,0,0,0)"}
                      sections={Hooks}
                      renderHeader={this._renderHeader}
                      renderContent={this._renderContent}
                    />
                  </Body>
                </CardItem>
              </Card>
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
  }
});