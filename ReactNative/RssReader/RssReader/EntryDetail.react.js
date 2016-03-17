'use strict'

var React = require('react-native');


var {
  WebView
} = React;


var EntryDetail = React.createClass({
  render: function() {
    return (
      <WebView source={{uri: this.props.url}}/>
    );
  },
});


module.exports = EntryDetail;
