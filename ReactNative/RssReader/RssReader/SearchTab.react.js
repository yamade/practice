'use strict'

var React = require('react-native');
var SearchEntry = require('./SearchEntry.react.js');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} = React;

var SearchTab = React.createClass({
  render: function () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
            title: "Search Entries",
            component: SearchEntry,
        }}
        />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = SearchTab;
