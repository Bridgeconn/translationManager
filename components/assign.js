const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const moment = require('moment');
const Button = require('react-bootstrap/lib/Button');
const _ = require('lodash');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const ReactBsTable = require("react-bootstrap-table");
const FormGroup = require('react-bootstrap/lib/FormGroup');
const DatePicker = require("react-bootstrap-date-picker");
const Panel = require("react-bootstrap/lib/Panel");
const ButtonToolbar = require("react-bootstrap/lib/ButtonToolbar");
const unitData = require('../static/unit.json');
const nameData = require('../static/name.json');
const milestoneData = require('../static/milestone.json');
const teamsizeData = require('../static/teamsize.json');
const assignmentData = require('../static/assignment.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;
const ReactSuperSelect = require('react-super-select');
const file = ('./static/assignment.json');
const teamData = require('../static/team.json');


class Form extends React.Component {
    constructor(props) {
        super(props);
        console.log(teamData);
        this.state = {names:teamData, units: unitData, teams: teamsizeData, milestones: milestoneData,value : new Date().toISOString()   };
    }   
   /* handleChange(value) {
        // value is an ISO String. 
        this.setState({ value: value });
    }*/

    handleSubmit(e) {
        let obj =  [{table:{}}];           
        let obj1 = this.state.unitdata.label;        
        let obj2 = this.state.teamsizes.label;
        let obj3 = this.state.make.label;
        let obj4 = this.state.teamName.label;
        //let obj5 = this.state.startDate;
        //console.log(obj5);
        obj = ({ id: obj4 , unit: obj1, Teamsize:obj2, Milestones:obj3 });
        console.log(obj);
           var result = this.refs.table.handleAddRow(obj);
            if(result){  
              alert(result);
            }
            else{
                fs.readFile(file, (err, data) => {
                    if (err) throw err;
                    let filedata = JSON.parse(data);
                    filedata.push(obj);
                    fs.writeFile(file, JSON.stringify(filedata), function(err){
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    }); 
                    //setTimeout(function() {this.setState({input1 : ''});}.bind(this), 3000);  
                })
            }               
        };

    render() {
        var name = this;
        var unit = this;
        var teamsize = this;
        var milesstone = this;
        var startDate = this;
        var endDate = this;
            const selectRow = {
            mode: 'radio' //radio or checkbox
        };

        return <div className="container fluid" style={{ marginLeft: '90px' }}>    
            <Panel header= "Assign" bsStyle="info">
            <ButtonToolbar>
                <Button bsStyle="danger" >Delete</Button>
                <Button bsStyle="info" >Edit</Button>
                <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>
            </ButtonToolbar></Panel>
             <div>
            <label>Team Name</label>
            <SimpleSelect
        placeholder = "Select a Name"
        options = {
            this.state.names.map(function(teamName) {
                return { label: teamName.id, value: teamName.id };
            })
        }  
        value = { this.state.teamName }    onValueChange = { function(teamName) {
                    unit.setState ({teamName: teamName, model: undefined})
                }}
        />
        </div>
            <div>
            <label>Unit</label>
            <SimpleSelect
        placeholder = "Select a Unit"
        options = {
            this.state.units.map(function(unitdata) {
                return { label: unitdata.label, value: unitdata.id };
            })
        }  
        value = { this.state.unitdata }    onValueChange = { function(unitdata) {
                    unit.setState ({unitdata: unitdata, model: undefined}
                    )
                }}
        />
        </div>
         <div><label> Teamsize </label>
        <SimpleSelect placeholder = "Select Teamsize"
        options = {
            this.state.teams.map(function(teamsizes) {
                return { label: teamsizes.label, value: teamsizes.id };
            })
        }
        value = { this.state.teamsizes }  
        onValueChange = { function(teamsizes) {
                teamsize.setState ({teamsizes: teamsizes, model: undefined}
                )
            }}
        /> </div><div><label> Milestone </label>
        <SimpleSelect
        placeholder = "Select Milestone"
        options = {
            this.state.milestones.map(function(make) {
                return { label: make.label, value: make.id };
            })
        }
        value = { this.state.make } 
        onValueChange = { function(make) {
                milesstone.setState ({make: make, model: undefined}
                )
            }}
        /> </div>
        <div ><label>Start Date</label> 
            <DatePicker value={this.state.startDate}  />
          </div>
           <div> <label>End Date</label>
            <DatePicker value={this.state.value} onChange={this.handleChange} />
          </div>
             <BootstrapTable data={assignmentData} ref="table" selectRow={ selectRow } deleteRow>
                    <TableHeaderColumn dataField="id" isKey={true}>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="Teamsize">Team Size</TableHeaderColumn>
                    <TableHeaderColumn dataField="Milestones">Milestone</TableHeaderColumn>
                    <TableHeaderColumn dataField="unit">Unit</TableHeaderColumn>
                </BootstrapTable>
          </div>
    }
};  

module.exports = {
    Form
}
