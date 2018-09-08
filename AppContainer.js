"use strict";
import React, { Component } from "react";
import { Text, View, StyleSheet, TabBarIOS, NavigatorIOS } from "react-native";
import Feed from "./Feed";
import Search from "./Search";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Feed"
    };
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab === "Feed"}
          systemIcon="contacts"
          onPress={() => this.setState({ selectedTab: "Feed" })}
        >
          <NavigatorIOS
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Feed,
              title: "Feed"
            }}
            style={{
              flex: 1,
              paddingTop: 100
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab === "Search"}
          systemIcon="search"
          onPress={() => this.setState({ selectedTab: "Search" })}
        >
          <NavigatorIOS
            style={{
              flex: 1
            }}
            initialRoute={{
              component: Search,
              title: "Search"
            }}
            style={{
              flex: 1,
              paddingTop: 100
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="History"
          selected={this.state.selectedTab === "History"}
          systemIcon="history"
          onPress={() => this.setState({ selectedTab: "History" })}
        >
          <View style={styles.container}>
            <Text style={styles.welcome}>Tab3</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCF3"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default AppContainer;
