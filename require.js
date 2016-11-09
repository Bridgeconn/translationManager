const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const ReactBsTable = require("react-bootstrap-table");
const Dropdown = require("react-dropdown");
const Table = require('./components/table.js');



class Assign extends React.Component {
  render() {
    return (
        <div><Table /></div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Assign />,
  document.getElementById('container')
);
