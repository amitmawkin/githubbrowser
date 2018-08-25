"use strict";
import React, { Component } from "react";
import { Text, View, ListView, Image } from "react-native";
import AuthService from "./AuthService";

export default class PushPayload extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds
    };
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      var url =
        "https://api.github.com/users/" + authInfo.user.login + "/events";

      fetch(url, {
        headers: authInfo.header
      })
        .then(response => response.json())
        .then(responseData => {
          var feedItems = responseData.filter(ev => ev.type == "PushEvent");
          this.setState(
            {
              dataSource: this.state.dataSource.cloneWithRows(feedItems),
              showProgress: false
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 80,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <Text>Hello There</Text>
      </View>
    );
  }
}
