'use strict'

var React = require('react-native');
var EntryList = require('./EntryList.react.js');

var {
  StyleSheet,
  NavigatorIOS,
} = React;

var FeaturedTab = React.createClass({
  render: function () {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Featured Entries',
          component: EntryList
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

module.exports = FeaturedTab;
