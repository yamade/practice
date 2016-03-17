'use strict'

var React = require('react-native');
var EntryList = require('./EntryList.react.js');

var {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} = React;

var SearchEntry = React.createClass({
  getInitialState: function () {
    return ({
      tagName: '',
      errorMessage: '',
    });
  },
  render: function () {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.instructions}>Search by Tag</Text>
          <View>
            <TextInput style={styles.searchInput}
              onChange={this._tagInput}/>
          </View>
        </View>
        <TouchableHighlight style={styles.button}
          underlayColor='#000080'>
          <Text style={styles.buttonText}
            onPress={this._searchEntry}
            >Search</Text>
        </TouchableHighlight>
      </View>
    );
  },
  _searchEntry: function() {
    if (this.state.tagName !== '') {
      this.props.navigator.push({
        title: 'Search Results',
        component: EntryList,
        passProps: {tagName: this.state.tagName}
      });
    } else {
      console.log('Empty');
    }
  },
  _tagInput: function (e) {
    this.setState({
      tagName: e.nativeEvent.text
    });
  },
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10,
  },
  instructions: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15,
  },
  searchInput: {
    height: 36,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    padding: 5,
  },
  button: {
    height: 36,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
});

module.exports = SearchEntry;
