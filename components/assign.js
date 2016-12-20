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
const nameData = require('../static/name.json');
const milestoneData = require('../static/milestone.json');
const assignmentData = require('../static/assignment.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;
const file = ('./static/assignment.json');
const teamData = require('../static/team.json');
const bookData = require('../static/books.json');
var chapters = require('../static/chapters_bookwise.json');

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {names:teamData, milestones: milestoneData, startDate: moment(),
      endDate: moment(), assignmentData:assignmentData, selected: [], showModal: false, bookData : bookData,
      chapters:chapters};
        console.log(assignmentData);
        //this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        //this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.priorityValidator = this.priorityValidator.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            console.log(obj);
                fs.readFile(file, (err, data) => {
                    if (err) throw err;
                    let filedata = JSON.parse(data);
                    filedata.push(obj);
                    fs.writeFile(file, JSON.stringify(filedata), function(err){
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    });                           
                })
        }, 100);
    };

    /*close() {
        this.setState({ showModal: false });
    }*/ 
    handleChange(date) {
        this.setState({
          Date: date
        })
    }

    priorityValidator(value) {
        const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
        if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
        } else if (value.length < 5) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must have 5+ characters';
            response.notification.title = 'Invalid Value';
        }
        return response;           
    }

    integerValidator(value) {
        const nan = isNaN(parseInt(value, 10));
        if (nan) {
        return 'Must be a integer!';
        }
        else if (!value) {
            response.isValid = false;
            response.notification.type = 'error';
            response.notification.msg = 'Value must be inserted';
            response.notification.title = 'Requested Value';
            }
        return true;
    }

    handleSubmit(e) {
        let obj =  [{table:{}}];           
        let obj1 = this.state.book.label;        
        let obj2 = this.state.chapter.label;
        let obj3 = this.state.mile.label;
        let obj4 = this.state.teamName.label;
        let obj5 = this.state.startDate;
        let obj6 = this.state.endDate;
        let obj7 = this.state.Date;
        if (typeof obj7 === 'undefined'){
             obj7 = "";
        }   
        obj = ({ id: obj4 , Book: obj1, Chapters:obj2, Milestones:obj3, StartDate: obj5 , EndDate: obj6, CompleteDate:obj7 });
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
    };

    render() {         
        var name = this;
        var book = this;
        var milesstone = this;
        var startDate = this;
        var endDate = this;
        self = this;
        chapters = !!this.state.book ? this.state.chapters[this.state.book.label] : [];

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
                                name.setState ({teamName: teamName, chapter: undefined})
                            }}
                    />
                </div>
               
                <div>
                    <label>Book</label>
                    <SimpleSelect
                    placeholder = "Select a book"
                    options = {this.state.bookData.map(function(book){
                        return {label:book, value: book};
                    })}
                    value = {this.state.book}
                    
                    onValueChange = {function(book) {
                        self.setState ({book: book, chapter: undefined}, function(){
                            self.refs.chapters.focus();
                        });
                    }}
                    
                    onFocus = {function(item, reason){
                        self.setState({focused: true});
                    }}
                    
                    onBlur = {function(item, reason){
                        self.setState({focused: false});
                    }}
                    
                    onEnter = {function(item){
                        if (typeof item == "undefined")
                            alert("you did not select any item");
                    }}

                    style = {this.state.focused ? {color: "#0099ff"} : {}}/>
                </div>

                <div>
                    <label> Chapters </label>
                    <SimpleSelect
                    ref = "chapters"
                    placeholder = "Select a chapter"
                    options = {chapters.map(function(chapter){
                        return {label: chapter, value: chapter};
                    })}
                    value = {this.state.chapter}
                    
                    disabled = {typeof this.state.book == "undefined"}
                    
                    onValueChange = {function(chapter) {
                        self.setState({chapter: chapter});
                    }} 
                    style = {{
                        opacity: !!this.state.book ? 1 : 0.5
                    }}/>        
                </div>
                <div>
                    <label> Milestone </label>
                    <SimpleSelect
                    placeholder = "Select Milestone"
                    options = {
                        this.state.milestones.map(function(mile) {
                            return { label: mile.label, value: mile.id };
                        })
                    }
                    value = { this.state.mile } 
                    onValueChange = { function(mile) {
                            milesstone.setState ({mile: mile, model: undefined}
                            )
                        }} 
                    />
                </div>
                <div>    
                    <label>Start Date</label>
                    <DatePicker selected={this.state.startDate} selectsStart  startDate={this.state.startDate}
                    endDate={this.state.endDate} onChange={this.handleChangeStart} />
                    <label>Target Date</label>
                    <DatePicker selected={this.state.endDate}  selectsEnd  startDate={this.state.startDate}
                     endDate={this.state.endDate} onChange={this.handleChangeEnd} />
                    <label>Complete Date</label>
                    <DatePicker selected={this.state.Date} onChange={this.handleChange} />
                    <Panel>
                        <ButtonToolbar>
                            <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Assignment</Button>
                        </ButtonToolbar>
                    </Panel>
                    <BootstrapTable striped  ref="table" data={this.state.assignmentData} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
                        <TableHeaderColumn dataField="id" isKey={true} >Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="Milestones" editable={ { validator: this.priorityValidator } }>Milestone</TableHeaderColumn>
                        <TableHeaderColumn dataField="Chapters" editable={ { validator: this.integerValidator } }>Chapters</TableHeaderColumn>
                        <TableHeaderColumn dataField="StartDate" editable={ { validator: this.integerValidator } }>Start Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="EndDate" editable={ { validator: this.integerValidator } }>Target Date</TableHeaderColumn>  
                        <TableHeaderColumn dataField="CompleteDate" editable={ { validator: this.integerValidator } } hidden>Complete Date</TableHeaderColumn>  
                    </BootstrapTable>
                </div>
            </div>
        )
    }
};  

module.exports = Form
