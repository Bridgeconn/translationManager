const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const ReactBsTable = require("react-bootstrap-table");
const Table = require('./components/table.js');
const { NameDropdown,MilestoneDropdown,TeamsizeDropdown,StartdateDropdown,EnddateDropdown,Form } = require('./components/form.js');



class Assign extends React.Component {
  render() {
    return (
        <div><Form /><NameDropdown /><EnddateDropdown /><StartdateDropdown /><TeamsizeDropdown /><MilestoneDropdown /><Table /></div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Assign />,
  document.getElementById('container')
);
