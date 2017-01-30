const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const moment = require('moment');
const Button = require('react-bootstrap/lib/Button');
const ReactBsTable = require("react-bootstrap-table");
const DatePicker = require('react-datepicker');
const Panel = require("react-bootstrap/lib/Panel");
const ButtonToolbar = require("react-bootstrap/lib/ButtonToolbar");
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;
const bookData = require('../static/books.json');
const projectfile = ('./static/projects.json');
const teamfile = ('./static/team.json');
const milestonefile = ('./static/milestones.json');
const assignmentfile = ('./static/assignment.json');
const progfile = ('./static/progress_screen.json');

var chapters = require('../static/chapters_bookwise.json');

class Form extends React.Component {
    constructor(props) {
        super(props);
        var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
        var teamdata = JSON.parse(fs.readFileSync(teamfile, 'utf8'));
        var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));
        var assignmentdata = JSON.parse(fs.readFileSync(assignmentfile, 'utf8'));

        this.state = { names:teamdata, milestones: milestonedata, startDate: moment(),
          endDate: moment(), assignmentData:assignmentdata, selected: [], showModal: false, bookData : bookData,
          chapters:chapters, projectData:projectdata };
        //this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.afterSaveCell = this.afterSaveCell.bind(this);
        this.characterValidator = this.characterValidator.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
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

   // Double click function to get the value of that row. 
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
        fs.readFile(assignmentfile, (err, data) => {
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
            fs.writeFile(assignmentfile, JSON.stringify(filedata), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
            window.location.reload();
            });
        })
    }

    afterSaveCell(row, cellName, cellValue) {
        fs.readFile(assignmentfile, (err, data) => {
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
            fs.writeFile(assignmentfile, JSON.stringify(filedata), function(err){
            if (err) throw err;
                console.log('The "data to append" was appended to file!');
            }); 
        })
          
        setTimeout(function() {
            let obj =  [{table:{}}];           
            obj = row;
            console.log(obj);
                fs.readFile(assignmentfile, (err, data) => {
                    if (err) throw err;
                    let filedata = JSON.parse(data);
                    filedata.push(obj);
                    fs.writeFile(assignmentfile, JSON.stringify(filedata), function(err){
                        if (err) throw err;
                        console.log('The "data to append" was appended to file!');
                    });                           
                })
        }, 100);
    };

    handleChangeDate(date) {
        this.setState({
          Date: date
        })
    }

    //Character Validation Check - Checks if length < 5 and cant be left blank.
    characterValidator(value) {
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

    //Integer Validation Check - Checks if Number is entered and cant be left blank.
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
        //const startId = this.state.assignmentData.length;
        for (let i = 1; i <= this.state.assignmentData.length; i++) {
            let obj0 =  i+1;
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
            let obj8 = this.state.project.label; 
            let obj9 = "Pending";
            let progressobject =  [{table:{}}];                      
            obj = ({id:obj0, TeamName: obj4 , Book: obj1, Chapters:obj2, Milestones:obj3, StartDate: obj5 , EndDate: obj6, CompleteDate:obj7, Project:obj8, isCompleted: obj9 });
            progressobject = ({project : obj8, milestone:obj3, book:obj1, isCompleted: obj9  })
        }

        var result = this.refs.table.handleAddRow(obj);
        if(result){  
          alert(result);
        }
        else{
            fs.readFile(assignmentfile, (err, data) => {
                if (err) throw err;
                let filedata = JSON.parse(data);
                filedata.push(obj);
                fs.writeFile(assignmentfile, JSON.stringify(filedata), function(err){
                    if (err) throw err;
                    console.log('The "data to append" was appended to file!');
                }); 
            })
            fs.readFile(progfile, (err, data) => {
                if (err) throw err;
                let filedata = JSON.parse(data);
                filedata.push(progressobject);
                fs.writeFile(progfile, JSON.stringify(filedata), function(err){
                    if (err) throw err;
                    console.log('The "data to append" was appended to PROGRESS file!');
                }); 
            })
            window.location.reload();
        }
    };

    render() {         
        var name = this;
        var book = this;
        var milesstone = this;
        var startDate = this;
        var endDate = this;
        var projects = this;
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
                    <label>Project Name</label>
                    <SimpleSelect placeholder = "Select Project "
                    options = {
                        this.state.projectData.map(function(project) {
                            return { label: project.name, value: project.name };
                        })
                    }
                    value = { this.state.project }  
                    onValueChange = { function(project) {
                            projects.setState ({project: project, model: undefined})
                    }}/> 
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
                            return { label: mile.name, value: mile.name };
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
                    <DatePicker selected={this.state.Date} onChange={this.handleChangeDate} />
                </div>
                <Panel>
                    <ButtonToolbar>
                        <Button bsStyle="default" type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Assignment</Button>
                    </ButtonToolbar>
                </Panel>
                <BootstrapTable striped  ref="table" data={this.state.assignmentData} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
                    <TableHeaderColumn dataField="id" hidden isKey>id</TableHeaderColumn>
                    <TableHeaderColumn dataField="TeamName">Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="Milestones" editable={ { validator: this.characterValidator } }>Milestone</TableHeaderColumn>
                    <TableHeaderColumn dataField="Book" editable={ { validator: this.characterValidator } }>Book</TableHeaderColumn>
                    <TableHeaderColumn dataField="Chapters" editable={ { validator: this.integerValidator } }>Chapters</TableHeaderColumn>
                    <TableHeaderColumn dataField="StartDate" editable={ { validator: this.integerValidator } }>Start Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="EndDate" editable={ { validator: this.integerValidator } }>Target Date</TableHeaderColumn>  
                    <TableHeaderColumn dataField="CompleteDate" editable={ { validator: this.integerValidator } } hidden>Complete Date</TableHeaderColumn>  
                    <TableHeaderColumn dataField="Project">Project</TableHeaderColumn>  
                    <TableHeaderColumn dataField="isCompleted"  dataAlign="center"  editable={ { type: 'checkbox', options: { values: 'Done:Pending' } } }>Status</TableHeaderColumn>  
                </BootstrapTable>
            </div>
        )
    }
};  

module.exports = Form
