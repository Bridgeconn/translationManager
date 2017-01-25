const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Form = require('react-bootstrap/lib/Form');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const style = require("./Style");
const _ = require('lodash');
const ReactBsTable = require("react-bootstrap-table");
const ReactSuperSelect = require('react-super-select');
const file = ('./static/team.json');
const teamnameData = require('../static/teamname.json');
const teamsizeData = require('../static/teamsize.json');
const projectfile = ('./static/projects.json');
//const projectData = require('../static/projects.json');
const teamfile = ('./static/team.json');
//const teamData = require('../static/team.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
        var teamdata = JSON.parse(fs.readFileSync(teamfile, 'utf8'));
        //console.log(this.teamData);
        this.state = {teamData:teamdata, teams: teamsizeData, projectData:projectdata};
        //this.handleChange = this.handleChange.bind(this);
    }

    handleInputChange(name, e) {
      let change = {};
      change[name] = e.target.value;
      this.setState(change);
    };

    handlerDropdown(options) {
        let output = [];
        _.map(options, function(option){
        output = output.concat([option.name]);
        global.multiselectName = output
        })
    };

    handleSubmit(e) {
        let obj =  [{table:{}}];                   
        let obj1 = this.state.input1;
        let obj4 = this.state.project.label;
        let obj3 = this.state.teamsizes.label;
        if ( typeof multiselectName === 'undefined'){
            alert("Please select the name");
        }
        else{
            let obj2 = multiselectName;
            obj =({id: obj1 , membername: obj2 , teamsize: obj3, project: obj4});
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
                });
                setTimeout(function() {
                    fs.readFile(file, (err, data) => {
                        if (err) throw err;
                        global.team = JSON.parse(data);
                        console.log(team);
                        //this.setState({teamData: team})
                        window.location.reload();
                    }) 
                }, 100);
            }
        } 
    };

    afterSaveCell(row, cellName, cellValue) {
        fs.readFile(file, (err, data) => {
        var filedata = JSON.parse(data);
        for (var n = 0 ; n < filedata.length ; n++) {
        if (filedata[n].id == row.id) {
          var removedObject = filedata.splice(n,1);
          console.log(removedObject);
          removedObject = null;
          break;
        }
    }
        if (err) throw err;
        fs.writeFile(file, JSON.stringify(filedata), function(err){
        if (err) throw err;
            console.log('The "data to append" was appended to file!');
        }); 
    })
    setTimeout(function() {
        let obj =  [{table:{}}];           
        obj = row;
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            filedata.push(obj);
            fs.writeFile(file, JSON.stringify(filedata), function(err){
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });        
        })}, 100);
    };

    onDeleteRow(rows) {
        fs.readFile(file, (err, data) => {
        var filedata = JSON.parse(data);
            for (var n = 0 ; n < filedata.length ; n++) {
            if (filedata[n].id == rows) {
              var removedObject = filedata.splice(n,1);
              removedObject = null;
              break;
            }
        }
        if (err) throw err;
        console.log(filedata);            
        fs.writeFile(file, JSON.stringify(filedata), function(err){
        if (err) throw err;
            console.log('The "data to append" was appended to file!');
        }); 
        })
    };

    render() {
        var teamsize = this;
        var projects = this;

        const cellEdit = {
            mode: 'dbclick',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell
        };  

        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };

        const options = {
            //onRowDoubleClick: this.onRowDoubleClick,
            onDeleteRow: this.onDeleteRow
        };

        return  (
            <div className="container fluid" style={{ marginLeft: '90px' }}>
                <div>
                    <Form>
                      <label> Project </label>
                        <SimpleSelect placeholder = "Select Project "
                        options = {
                            this.state.projectData.map(function(project) {
                                return { label: project.name, value: project.name };
                            })
                        }
                        value = { this.state.project }  
                        onValueChange = { function(project) {
                                projects.setState ({project: project, model: undefined}
                            )
                        }}/> 
                        <ControlLabel>Members Name</ControlLabel>
                        <ReactSuperSelect placeholder="Select the name" 
                          dataSource={teamnameData} 
                          onChange={this.handlerDropdown} 
                          multiple={true}
                          tags={true}
                          keepOpenOnSelection={true}
                          clearSearchOnSelection = {true}
                          />
                        <FormGroup controlId="formInlineName">
                        <ControlLabel>Team Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter the Name" ref="table" value={this.state.input1} 
                        onChange={this.handleInputChange.bind(this, 'input1')}/>
                        </FormGroup>
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
                        /> </div>
                    </Form>
                </div>

                <Button type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>
                <BootstrapTable ref="table" data={ this.state.teamData} cellEdit={ cellEdit } options={ options } selectRow={selectRow} deleteRow>
                    <TableHeaderColumn dataField="id" isKey={true}>Team Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="membername">Members Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="teamsize">Teamsize</TableHeaderColumn> 
                    <TableHeaderColumn dataField="project">Project</TableHeaderColumn>        
                </BootstrapTable>   
                </div>              
        );
    }
};

module.exports = TeamManagement
