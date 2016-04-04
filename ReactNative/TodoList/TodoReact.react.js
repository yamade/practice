'use strict'

var React = require('react-native');
var Header = require('./Header.react.js');
var TodoList = require('./TodoList.react.js');

var {
  StyleSheet,
  TabBarIOS,
  View,
  Text,
  TextInput,
  AlertIOS,
} = React;

var todoId = (function(){
  var id = 3;
  return function() {
    return (id++);
  };
})();

var TodoReact = React.createClass({
    getInitialState: function() {
      return ({
        items : [
          {id: 1, todo: 'Learn more about React', complete: false},
          {id: 2, todo: 'Make a todo app', complete:false}
        ],
        value: '',
        selectedTab: 'todo',
      });
    },
    render: function() {
      return (
        <TabBarIOS tintColor={'black'} barTintColor={'#3ABEFF'}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'todo'}
            title='ToDo'
            icon={require('./img/List.png')}
            onPress={() => this.setState({ selectedTab: 'todo'})}
            >
            <View style={styles.container}>
              <Header />
                <TextInput
                  style={styles.todoInput}
                  id={this.props.id}
                  value={this.state.value}
                  onChangeText={(text) => this.setState({value: text})}
                  onBlur={(event) => this._save(event)}
                />
                <TodoList items={this._getTodo(this.state.items)}
                  onPress={this._alertMenu}
                />
            </View>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'done'}
            title='Done'
            icon={require('./img/Done.png')}
            onPress={() => this.setState({ selectedTab: 'done'})}
            >
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.titleText}>Already Done</Text>
              </View>
              <TodoList items={this._getDone(this.state.items)}
                onPress={this._alertMenuDone}
              />
            </View>
          </TabBarIOS.Item>
        </TabBarIOS>
      );
    },
    _alertMenu: function(rowData) {
      AlertIOS.alert(
        'What do you want to do?',
        null,
        [
          {text: 'Done', onPress: () => this._done(rowData)},
          {text: 'Delete', onPress: () => this._delete(rowData)},
          {text: 'Cancel'}
        ]
      );
    },
    _alertMenuDone: function(rowData) {
      AlertIOS.alert(
        'What do you want to do?',
        null,
        [
          {text: 'Delete', onPress: () => this._delete(rowData)},
          {text: 'Back to Todo', onPress: () => this._backTodo(rowData)},
          {text: 'Cancel'}
        ]
      );
    },
    _done: function(rowData) {
      var items = this.state.items.filter(function(v){
        if (v.id == rowData.id) {
          v.complete = true;
        }
        return v;
      });
      this.setState({items: items});
    },
    _delete: function(rowData) {
      var items = this.state.items;

      items = items.filter(function(v){
        return v.id != rowData.id;
      });
      this.setState({items: items})
    },
    _backTodo: function(rowData) {
      var items = this.state.items.filter(function(v){
        if (v.id == rowData.id) {
          v.complete = false;
        }
        return v;
      });
      this.setState({items: items});
    },
    _save: function(event) {
      var text = [{id: todoId(), todo: event.nativeEvent.text, complete: false}];

      this.setState({
        items: this.state.items.concat(text),
        value: ''
      });
      console.log(this.state.items);

    },
    _getTodo: function(items) {
      return items.filter(function(v){
        return v.complete === false;
      });
    },
    _getDone: function(items) {
      return items.filter(function(v){
        return v.complete === true;
      });
    },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
  },
  todoInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 10,
    fontSize: 15,
  },
  text: {
    fontSize: 18,
    backgroundColor: '#F5FCFF'
  },
  titleText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  }
});

module.exports = TodoReact;
