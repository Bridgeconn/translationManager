const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const moment = require('moment');
const Button = require('react-bootstrap/lib/Button');
const Modal = require('react-bootstrap/lib/Modal');
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const _ = require('lodash');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const ReactBsTable = require("react-bootstrap-table");
const FormGroup = require('react-bootstrap/lib/FormGroup');
const DatePicker = require('react-datepicker');
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
const easyjson = require('easyjson');

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {names:teamData, units: unitData, teams: teamsizeData, milestones: milestoneData, startDate: moment('2016-12-08'),
      endDate: moment('2016-12-14'), assignmentData:assignmentData,
        selected: [], showModal: false};
        console.log(assignmentData);
        this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }

    handleChange({ startDate, endDate }) {
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)) {
          var temp = startDate
          startDate = endDate
          endDate = temp
        }
        this.setState({ startDate, endDate })
    }

    handleChangeStart(startDate) {
        this.handleChange({ startDate })
    }

    handleChangeEnd(endDate) {
        this.handleChange({ endDate })
    }

    onRowDoubleClick(row) {
        console.log(row);
        this.setState({ showModal: true });
    }

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
            //setTimeout(function() {this.setState({input1 : ''});}.bind(this), 3000);  
        })
    }

    close() {
        this.setState({ showModal: false });
    }

    handleSubmit(e) {
        let obj =  [{table:{}}];           
        let obj1 = this.state.unitdata.label;        
        let obj2 = this.state.teamsizes.label;
        let obj3 = this.state.make.label;
        let obj4 = this.state.teamName.label;
        let obj5 = this.state.startDate;
        let obj6 = this.state.endDate;

        console.log(obj5);
        obj = ({ id: obj4 , unit: obj1, Teamsize:obj2, Milestones:obj3, StartDate: obj5 , Enddate: obj6 });
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
        var selectRowProp = {
            mode: 'radio',  // multi select
        };
        const options = {
            onRowDoubleClick: this.onRowDoubleClick,
            onDeleteRow: this.onDeleteRow
        };      

        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };
       
        return( <div className="container fluid" style={{ marginLeft: '90px' }}> 
            <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading{this.props.row}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
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
                            unit.setState ({unitdata: unitdata, model: undefined})
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
                        <hr />       
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>

                      </Modal.Footer>
                </Modal>   

           
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
        /> </div><label>Start Date</label>
              <DatePicker selected={this.state.startDate} selectsStart  startDate={this.state.startDate}
            endDate={this.state.endDate} onChange={this.handleChangeStart} />
            <label>End Date</label><DatePicker selected={this.state.endDate}  selectsEnd  startDate={this.state.startDate}
             endDate={this.state.endDate} onChange={this.handleChangeEnd} />
           <Panel >
                <ButtonToolbar>
                    <Button bsStyle="info" onClick={() => this.handleEdit()} >Edit</Button>
                    <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>
                </ButtonToolbar>
            </Panel>
            <BootstrapTable striped data={this.state.assignmentData} ref="table" selectRow={selectRow} options={ options } deleteRow>
                <TableHeaderColumn dataField="id" isKey={true} >Name</TableHeaderColumn>
                <TableHeaderColumn dataField="Teamsize" >Team Size</TableHeaderColumn>
                <TableHeaderColumn dataField="Milestones">Milestone</TableHeaderColumn>
                <TableHeaderColumn dataField="unit">Unit</TableHeaderColumn>
                <TableHeaderColumn dataField="StartDate">StartDate</TableHeaderColumn>
                <TableHeaderColumn dataField="Enddate">EndDate</TableHeaderColumn>  
            </BootstrapTable>
          </div>
    )}
};  

module.exports = {
    Form
}
