"use strict";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableHighlight
} from "react-native";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }

  render() {
    var errorCtl = <View />;
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./images/Octocat.png")} />
        <TextInput
          onChangeText={text => this.setState({ searchQuery: text })}
          style={styles.input}
          placeholder="Search Query"
        />
        <TouchableHighlight
          onPress={this.onSearchPressed.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onSearchPressed() {
    console.log("Attempting to Search for" + this.state.searchQuery);
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FcFF",
    flex: 1,
    paddingTop: 100,
    padding: 10,
    alignItems: "center"
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 2,
    borderColor: "#48bbec",
    alignSelf: "stretch"
  },
  button: {
    height: 50,
    backgroundColor: "#48BBEC",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 22,
    color: "#FFF",
    alignSelf: "center"
  }
});
