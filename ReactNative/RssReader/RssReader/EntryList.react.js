'use strict'

var React = require('react-native');
var EntryDetail = require('./EntryDetail.react');

var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;

var baseURL = "http://qiita.com/api/v2/tags/";

var EntryList = React.createClass({
  getInitialState: function (){
    return ({
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      isLoaded: false,
      errorMessage: ''
    });
  },
  componentDidMount: function() {
    if(typeof this.props.tagName !== 'undefined') {
      console.log("in search condition");
      this._fetchData(baseURL + this.props.tagName + '/items');
    }else{
      console.log("in featured condition");
      this._fetchData(baseURL + 'reactjs/items');
    }
  },
  _fetchData: function(url) {
    fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData == '') {
        console.log('No result');
        this.setState({
          errorMessage: 'No result found!'
        });
      } else if (responseData.title !== '') {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          isLoaded: true
        });
      }
    })
    .catch(error => {
        this.setState({
          errorMessage: error
        });
    })
    .done();
  },
  render: function() {
    if(this.state.errorMessage !== ''){
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
        </View>
      );
    }else if(this.state.isLoaded) {
      return (
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderEntry}
        />
      );
    }else{
      return(
        this._loadingData()
      );
    }
  },
  _loadingData: function() {
    return(
      <View style={styles.activityIndicator}>
        <ActivityIndicatorIOS
          animating={true}
          size={'large'}
        />
        <View>
          <Text style={styles.loadingMessage}>Please wait a second...</Text>
        </View>
      </View>
    );
  },
  _renderEntry: function(entry) {
    return (
        <TouchableHighlight onPress={() => this._onPressed(entry)}>
        <View>
          <View style={styles.container}>
            <Image
              source={{uri: entry.user.profile_image_url}}
              style={styles.thumbnail} />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{entry.title}</Text>
              <Text style={styles.name}>{entry.user.id}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  },
  _onPressed: function(entry) {
    console.log(entry.title + " : " + entry.url);
    this.props.navigator.push({
      title: entry.title,
      component: EntryDetail,
      passProps: { url: entry.url }
    });
  },
});


var styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    flex: 1,
    fontSize: 20,
    color: '#656565'
  },
  listView: {
    marginTop: 65,
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 10
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 20,
    backgroundColor: '#FFFFFF'
  }
});


module.exports = EntryList;
