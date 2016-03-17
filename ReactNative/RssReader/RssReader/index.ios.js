/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

var FeaturedTab = require('./FeaturedTab.react.js');
var SearchTab = require('./SearchTab.react.js');

var RssReader = React.createClass({
  getInitialState: function (){
    return ({
      selectedTab: 'FeaturedTab'
    });
  },
  render: function() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'FeaturedTab'}
          title="Featured"
          systemIcon="featured"
          onPress={() => {
            this.setState(
              {selectedTab: 'FeaturedTab'}
            )
          }}
        >
          <FeaturedTab />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab === 'SearchTab'}
          title="Search"
          systemIcon="search"
          onPress={() => {
            this.setState(
              {selectedTab: 'SearchTab'}
            )
          }}
        >
          <SearchTab />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 15,
  }
});

AppRegistry.registerComponent('RssReader', () => RssReader);
