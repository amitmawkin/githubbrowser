"use strict";
import React, { Component } from "react";
import { Text, View, ListView, ActivityIndicator, Image } from "react-native";
import AuthService from "./AuthService";

export default class Feed extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
    console.log("executed");
  }

  fetchFeed() {
    console.log("In FetchFeed");
    AuthService.getAuthInfo((err, authInfo) => {
      var url =
        "https://api.github.com/users/" + authInfo.user.login + "/events";

      fetch(url, {
        headers: authInfo.header
      })
        .then(response => response.json())
        .then(responseData => {
          console.log("ResponseData is :" + JSON.stringify(responseData));
          var feedItems = responseData.filter(ev => ev.type == "PushEvent");
          console.log("FeedItems:" + JSON.stringify(feedItems[0]));
          this.setState(
            {
              dataSource: this.state.dataSource.cloneWithRows(feedItems[0]),
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

  renderRow(rowData) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: 20,
          alignItems: "center",
          borderColor: "#D7D7D7",
          borderBottomWidth: 1
        }}
      >
        <Image
          source={{ uri: rowData.avatar_url }}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18
          }}
        />
      </View>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" animating={true} />
        </View>
      );
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}
