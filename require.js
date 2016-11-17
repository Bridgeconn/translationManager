const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const ReactBsTable = require("react-bootstrap-table");
const NavBar = require('./components/navbar.js');
const Sidebar = require('./components/sidebar.js');
const Table = require('./components/table.js');
const { NameDropdown,UnitDropdown,MilestoneDropdown,TeamsizeDropdown,StartdateDropdown,EnddateDropdown,Form } = require('./components/form.js');



class Assign extends React.Component {
  render() {
    return (
        <div><NavBar /><Sidebar /><Form /><NameDropdown /><UnitDropdown /><EnddateDropdown /><StartdateDropdown /><TeamsizeDropdown /><MilestoneDropdown /><Table /></div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Assign />,
  document.getElementById('container')
);
