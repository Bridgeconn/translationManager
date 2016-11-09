const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const customData = require('./static/table.json');
const ReactBsTable = require("react-bootstrap-table")
//const part1 = yield fs.readFile(p, 'utf-8', function (err, data) {}

/*const Upload = require('../components/core/Upload');*/
//const parse = require("../../../hebrew.js");
console.log(customData);
/*import React from 'react';
*/
const Hello = React.createClass({
  render() {
    return (
      <div><BootstrapTable data={customData}>
          <TableHeaderColumn dataField="id" isKey={true}>S.no</TableHeaderColumn>
          <TableHeaderColumn dataField="teamSize">Team Size</TableHeaderColumn>
          <TableHeaderColumn dataField="milestone">Milestone</TableHeaderColumn>
          <TableHeaderColumn dataField="unit">Unit</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="startDate">Start Date</TableHeaderColumn>
          <TableHeaderColumn dataField="endData">End Date</TableHeaderColumn>
        </BootstrapTable></div>
    );
  }
});


ReactDOM.render( < Hello / > , document.getElementById('container'));