"use strict";
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";

import AuthService from "./AuthService";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    };
  }

  render() {
    var errorCtl = <View />;
    if (!this.state.success && this.state.badCredentials) {
      errorCtl = (
        <Text style={styles.error}>
          That username and password combination did not work
        </Text>
      );
    }
    if (!this.state.success && this.state.unknownError) {
      errorCtl = (
        <Text style={styles.error}>We experienced an unknown issue</Text>
      );
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./images/Octocat.png")} />
        <Text style={styles.heading}>Github browser</Text>
        <TextInput
          onChangeText={text => this.setState({ username: text })}
          style={styles.input}
          placeholder="Github username"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          placeholder="Github password"
          secureTextEntry={true}
        />

        <TouchableHighlight
          onPress={this.onLoginPressed.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableHighlight>
        {errorCtl}

        <ActivityIndicator
          animating={this.state.showProgress}
          size="large"
          style={styles.loader}
        />
      </View>
    );
  }

  onLoginPressed() {
    console.log("Attempting to log in with username" + this.state.username);
    this.setState({ showProgress: true });
    AuthService.login(
      {
        username: this.state.username,
        password: this.state.password
      },
      results => {
        this.setState(
          Object.assign(
            {
              showProgress: false
            },
            results
          )
        );
        if (results.success && this.props.onLogin) {
          this.props.onLogin();
        }
      }
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FcFF",
    flex: 1,
    paddingTop: 40,
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
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: "red",
    paddingTop: 10
  }
});

export default Login;
