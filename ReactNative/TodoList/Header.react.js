'use strict'

var React = require('react-native');

var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;

var Header = React.createClass({
  render: function() {
    return (
      <View style={styles.header}>
        <Image source={require('./img/logo.jpg')} style={styles.logoImage}/>
        <Text style={styles.titleText}>Todo List</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30
  },
  logoImg: {
    flex: 1,
    width: 20,
    height: 20,
    marginBottom: 10,
    backgroundColor: '#F5FCFF',
    resizeMode: 'cover'
  },
});

module.exports = Header;
