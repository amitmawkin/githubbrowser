"use strict";
import React, { Component } from "react";
import {
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from "react-native";
import AuthService from "./AuthService";
import moment from "moment";
import PushPayload from "./PushPayload";

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
  }

  fetchFeed() {
    console.log("in fetch feed");
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

  pressRow(rowData) {
    this.props.navigator.push({
      title: "Push Event",
      component: PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor="#ddd"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 50,
            alignItems: "center",
            borderColor: "#D7D7D7",
            borderBottomWidth: 1
          }}
        >
          <Image
            source={{ uri: rowData.actor.avatar_url }}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }}
          />

          <View
            style={{
              paddingLeft: 20
            }}
          >
            <Text style={{ backgroundColor: "#fff" }}>
              {moment(rowData.created_at).fromNow()}
            </Text>
            <Text
              style={{
                backgroundColor: "#fff",
                fontWeight: "600"
              }}
            >
              {rowData.actor.login} pushed to{" "}
            </Text>

            <Text style={{ backgroundColor: "#fff" }}>
              {rowData.payload.ref.replace("refs/heads/", "")}
            </Text>
            <Text style={{ backgroundColor: "#fff" }}>
              at{" "}
              <Text
                style={{
                  fontWeight: "700"
                }}
              >
                {rowData.repo.name}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableHighlight>
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
