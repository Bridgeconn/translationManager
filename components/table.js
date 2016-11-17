const React = require('react');
const ReactDOM = require('react-dom');
const customData = require('./../static/table.json');
const ReactBsTable = require("react-bootstrap-table");

class Table extends React.Component {
    render() {
        return (
            <div className="container fluid" style={{ marginLeft: '70px' }}>
              <BootstrapTable data={customData}>
                <TableHeaderColumn dataField="id" isKey={true}>S.no</TableHeaderColumn>
                <TableHeaderColumn dataField="teamSize">Team Size</TableHeaderColumn>
                <TableHeaderColumn dataField="milestone">Milestone</TableHeaderColumn>
                <TableHeaderColumn dataField="unit">Unit</TableHeaderColumn>
                <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
                <TableHeaderColumn dataField="startDate">Start Date</TableHeaderColumn>
                <TableHeaderColumn dataField="endData">End Date</TableHeaderColumn>
              </BootstrapTable>
            </div>
        );
    }
}

module.exports = Table
