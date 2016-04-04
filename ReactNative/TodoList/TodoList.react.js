'use strict'

var React = require('react-native');
var TodoItem = require('./TodoItem.react.js');

var {
  View,
  ListView
} = React;


var TodoList = React.createClass({
  getInitialState: function () {
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: this.ds.cloneWithRows(this.props.items),
    };
  },
  componentWillReceiveProps: function(next) {
    this.setState({
      dataSource: this.ds.cloneWithRows(next.items)
    });
  },
  render: function() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionID, rowID) =>
            <TodoItem item={rowData}
              onPress={() => this.props.onPress(rowData, rowID)}
            />
          }
        />
      </View>
    );
  },
});

module.exports = TodoList;
