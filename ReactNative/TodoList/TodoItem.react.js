'use strict'

var React = require('react-native');

var {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} = React;

var TodoItem = React.createClass({
  render: function() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
      >
        <View style={styles.row}>
          <Text style={styles.memo}>{this.props.item.todo}</Text>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  },
});


var styles = StyleSheet.create({
  row: {
    height: 55,
    left: 10,
  },
  memo: {
    fontSize: 15,
  },
  separator: {
    height: 1,
    marginTop: 3,
    backgroundColor: '#CCCCCC',
  },
});

module.exports = TodoItem;
