const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const moment = require('moment');
const Button = require('react-bootstrap/lib/Button');
const Form = require('react-bootstrap/lib/Form');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const Col = require('react-bootstrap/lib/Col');
const ReactBsTable = require("react-bootstrap-table");
const DatePicker = require('react-datepicker');
const Panel = require("react-bootstrap/lib/Panel");
const ButtonToolbar = require("react-bootstrap/lib/ButtonToolbar");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
const Tooltip = require("react-bootstrap/lib/Tooltip");
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;
const bookfile = ('./static/books.json');
const projectfile = ('./static/projects.json');
const teamfile = ('./static/team.json');
const milestonefile = ('./static/milestones.json');
const assignmentfile = ('./static/assignment.json');
const progfile = ('./static/progress_screen.json');

var chaptersfile = ('./static/chapters_bookwise.json');

class AssignForm extends React.Component {
  constructor(props) {
    super(props);
    var bookData = JSON.parse(fs.readFileSync(bookfile, 'utf8'));
    var chapters = JSON.parse(fs.readFileSync(chaptersfile, 'utf8'));
    var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
    var teamdata = JSON.parse(fs.readFileSync(teamfile, 'utf8'));
    var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));
    var assignmentdata = JSON.parse(fs.readFileSync(assignmentfile, 'utf8'));

    this.state = { names:teamdata, milestones: milestonedata, startDate: moment(),
      endDate: moment(), assignmentData:assignmentdata, selected: [], showModal: false, bookData : bookData,
      chapters:chapters, projectData:projectdata};
      //this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeStart = this.handleChangeStart.bind(this);
      this.handleChangeEnd = this.handleChangeEnd.bind(this);
      this.afterSaveCell = this.afterSaveCell.bind(this);
      this.characterValidator = this.characterValidator.bind(this);
      this.handleChangeDate = this.handleChangeDate.bind(this);
      this.activeFormatter = this.activeFormatter.bind(this);
      this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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
        row.isCompleted = (row.isCompleted == "true" ? true : false);
        fs.readFile(assignmentfile, (err, data) => {
          if (err) throw err;
          let filedata = JSON.parse(data);
          filedata.push(obj);
          fs.writeFile(assignmentfile, JSON.stringify(filedata), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to file!');
          });
          window.location.reload();

        })}, 800);

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
        for (let i = 0; i <= this.state.assignmentData.length; i++) {
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
          let obj9 = false;
          let progressobject =  [{table:{}}];
          obj = ({id:obj0, TeamName: obj4 , Book: obj1, Chapters:obj2, Milestones:obj3, StartDate: obj5 , EndDate: obj6, CompleteDate:obj7, Project:obj8, isCompleted: obj9 });
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
          window.location.reload();
        }
      };

      handleCheckboxChange(event) {
        this.setState({isCompleted: this.state.assignmentData});
      }

      activeFormatter(cell, row, enumObject, index) {
        return (
          <input type='checkbox' title="Double Click to edit" key={index} onChange={this.handleCheckboxChange} checked={this.state.assignmentData[index].isCompleted} active={ cell } />
        )
      }

      render() {
        var name = this;
        var book = this;
        var milesstone = this;
        var startDate = this;
        var endDate = this;
        var projects = this;
        self = this;
        var chapters = !!this.state.book ? this.state.chapters[this.state.book.label] : [];

        const options = {
          //onRowDoubleClick: this.onRowDoubleClick,
          onDeleteRow: this.onDeleteRow,
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

        const tooltip = (
          <Tooltip id="tooltip">Double click the cell to edit</Tooltip>
        );

        return(

          <div className="container fluid" style={{ paddingLeft: '90px' }}>
            <h2 style={{ float: 'left' }} >Assign</h2>
            <div style={{ height: '100%', width: '100%', textAlign: 'right', paddingTop: '20px', }} >
              <ButtonToolbar style={{ float: 'right' }} >
                <Button bsStyle="danger">Delete</Button>
                <Button bsStyle="info">Edit</Button>
                <Button bsStyle="success">Add</Button>
              </ButtonToolbar>
              <SimpleSelect style={{ top: '-2px', marginRight: '5px', display: 'inline-block' }} placeholder = "Select Project"
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

              <Panel style={{ marginTop: '10px' }} >
                <Form horizontal>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                      Book
                    </Col>
                    <Col sm={7}>
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
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={3}>
                      Chapter
                    </Col>
                    <Col sm={7}>
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
                        }} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Milestone
                      </Col>
                      <Col sm={7}>
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
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Team Name
                      </Col>
                      <Col sm={7}>
                        <SimpleSelect
                          placeholder = "Select a Name"
                          options = {
                            this.state.names.map(function(teamName) {
                              return { label: teamName.id, value: teamName.id };
                            })
                          }
                          value = { this.state.teamName }    onValueChange = { function(teamName) {
                            name.setState ({teamName: teamName})
                          }}
                          />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Start Date
                      </Col>
                      <Col sm={7}>
                        <DatePicker selected={this.state.startDate} selectsStart  startDate={this.state.startDate}
                          endDate={this.state.endDate} onChange={this.handleChangeStart} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Target Date
                      </Col>
                      <Col sm={7}>
                        <DatePicker selected={this.state.endDate}  selectsEnd  startDate={this.state.startDate}
                          endDate={this.state.endDate} onChange={this.handleChangeEnd} />
                      </Col>
                    </FormGroup>

                    <FormGroup>
                      <Col componentClass={ControlLabel} sm={3}>
                        Complete Date
                      </Col>
                      <Col sm={7}>
                        <DatePicker selected={this.state.Date} onChange={this.handleChangeDate} />
                      </Col>
                    </FormGroup>

                    <ButtonToolbar style={{ float: 'right' }} >
                      <Button bsStyle="success" type="submit" onClick={() => this.handleSubmit()}>Save</Button>
                    </ButtonToolbar>

                  </Form>

                </Panel>

                <BootstrapTable striped  ref="table" data={this.state.assignmentData} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
                  <TableHeaderColumn dataField="id" hidden isKey>id</TableHeaderColumn>
                  <TableHeaderColumn dataField="TeamName" headerTitle={ true } dataSort>Team Name</TableHeaderColumn>
                  <TableHeaderColumn dataField="Milestones" editable={ { validator: this.characterValidator } } dataSort>Milestone</TableHeaderColumn>
                  <TableHeaderColumn dataField="Book" editable={ { validator: this.characterValidator } } dataSort>Book</TableHeaderColumn>
                  <TableHeaderColumn dataField="Chapters" editable={ { validator: this.integerValidator } } dataSort>Chapter</TableHeaderColumn>
                  <TableHeaderColumn dataField="StartDate" editable={ { validator: this.integerValidator } } dataSort>Start Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="EndDate" editable={ { validator: this.integerValidator } } dataSort>Target Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="CompleteDate" editable={ { validator: this.integerValidator } } hidden>Complete Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="Project" dataSort>Project</TableHeaderColumn>
                  <TableHeaderColumn  dataField="isCompleted" dataAlign="center" dataFormat={ this.activeFormatter } editable={{type: 'checkbox', options: { values: 'true:false' }}} >
                    <OverlayTrigger placement="top" overlay={tooltip}>
                      <div>Status</div>
                    </OverlayTrigger>
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            )
          }
        };

        module.exports = AssignForm
