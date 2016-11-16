(function() {
  require("babel-register")({
    extensions: [".js", ".jsx"],
    presets: ["react"]
  });
  const ReactDOM = require('react-dom');
  const React = require('react');
  const remote = require('electron').remote;
  
  var App = {
    init: function() {
     
      var Application = require("./require");
      //ReactDOM.render(Application, document.getElementById('content'));
    }
  };
  window.App = App;
})();

document.addEventListener('DOMContentLoaded', App.init);
