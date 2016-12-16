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
const unitData = require('../static/chapters.json');
const bookData = require('../static/book.json');
const nameData = require('../static/name.json');
const milestoneData = require('../static/milestone.json');
const assignmentData = require('../static/assignment.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const ReactSuperSelect = require('react-super-select');
const file = ('./static/assignment.json');
const teamData = require('../static/team.json');

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {names:teamData, books: bookData, milestones: milestoneData, startDate: moment(),
      endDate: moment(), assignmentData:assignmentData,
        selected: [], showModal: false};
        console.log(assignmentData);
        //this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        //this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
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
/*
    onRowDoubleClick(row) {
        console.log(row);
        this.setState({ showModal: true  });
         if (this.didSwitchParentObject)
        {
            this.didSwitchParentObject= false;
            this.refs.myTextInput.label = row;
        }
    }
*/
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
    }

    afterSaveCell(row, cellName, cellValue) {
        console.log(row.id);
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
            console.log(filedata);            
            fs.writeFile(file, JSON.stringify(filedata), function(err){
            if (err) throw err;
                console.log('The "data to append" was appended to file!');
            }); 
    })
    setTimeout(function() {
        let obj =  [{table:{}}];           
        obj = row;
        console.log(obj);
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

    /*close() {
        this.setState({ showModal: false });
    }*/

    handlerDropdown(options) {
          let output = [];
          _.map(options, function(option){
            output = output.concat([option.name]);
            global.multiselectUnit = output
            console.log(multiselectUnit)
          })
        };

    handleSubmit(e) {
        let obj =  [{table:{}}];           
        let obj1 = this.state.bookdata.label;        
        //let obj2 = this.state.teamsizes.label;
        let obj3 = this.state.make.label;
        let obj4 = this.state.teamName.label;
        let obj5 = this.state.startDate;
        let obj6 = this.state.endDate;
        if ( typeof multiselectUnit === 'undefined'){
            alert("Please select the name");
        }else{
            let obj7 = multiselectUnit;
            obj = ({ id: obj4 , book: obj1, chapters:obj7, Milestones:obj3, StartDate: obj5 , Enddate: obj6 });
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
                })
            }
        }
    };

    render() {
        var milestone = this;
        var name = this;
        var book = this;
        var teamsize = this;
        var milesstone = this;
        var startDate = this;
        var endDate = this;
       
        const options = {
            //onRowDoubleClick: this.onRowDoubleClick,
            onDeleteRow: this.onDeleteRow
        };

        const cellEdit = {
            mode: 'dbclick',
            blurToSave: true,
            afterSaveCell: this.afterSaveCell
        };    

        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };
        return( 
            <div className="container fluid" style={{ marginLeft: '90px' }}>
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
                        name.setState ({teamName: teamName, model: undefined})
                    }}
            />
            </div>
            <div>
                <label>Book</label>
                <SimpleSelect
            placeholder = "Select a Book"
            options = {
                this.state.books.map(function(bookdata) {
                    return { label: bookdata.label, value: bookdata.id };
                })
            }  
            value = { this.state.bookdata }    onValueChange = { function(bookdata) {
                        book.setState ({bookdata: bookdata, model: undefined}
                        )
                    }}
            />
            </div>
            <div>
            <label> Milestone </label>
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
            <div>
                <label>Chapters</label>

                 <ReactSuperSelect placeholder="Select the Chapters" dataSource={unitData} 
                    onChange={this.handlerDropdown} multiple={true} tags={true}
                    keepOpenOnSelection={true} clearSearchOnSelection = {true} />
            </div>
                <label>Start Date</label>
                  <DatePicker selected={this.state.startDate} selectsStart  startDate={this.state.startDate}
                endDate={this.state.endDate} onChange={this.handleChangeStart} />
                <label>End Date</label><DatePicker selected={this.state.endDate}  selectsEnd  startDate={this.state.startDate}
                 endDate={this.state.endDate} onChange={this.handleChangeEnd} />
               <Panel >
                    <ButtonToolbar>
                        <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Assignment</Button>
                    </ButtonToolbar>
                </Panel>
                <BootstrapTable striped  ref="table" data={this.state.assignmentData} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
                    <TableHeaderColumn dataField="id" isKey={true} >Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="Milestones">Milestone</TableHeaderColumn>
                    <TableHeaderColumn dataField="chapters">Chapters</TableHeaderColumn>
                    <TableHeaderColumn dataField="StartDate">StartDate</TableHeaderColumn>
                    <TableHeaderColumn dataField="Enddate">EndDate</TableHeaderColumn>  
                </BootstrapTable>
          </div>
    )}
};  

module.exports = {
    Form
}
