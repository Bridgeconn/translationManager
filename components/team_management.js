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
const teamfile = ('./static/team.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        //var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
        var teamdata = JSON.parse(fs.readFileSync(teamfile, 'utf8'));
        //console.log(this.teamData);
        this.state = {teamData:teamdata};
        //this.handleChange = this.handleChange.bind(this);
    }

    handleInputChange(name, e) {
      let change = {};
      change[name] = e.target.value;
      this.setState(change);
    };

    handleSubmit(e) {
        let obj =  [{table:{}}];                   
        let obj1 = this.state.input1;
        let obj2 = this.state.input2;
        obj =({id: obj1 , membername: obj2 });
        
        fs.readFile(teamfile, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            filedata.push(obj);
            fs.writeFile(teamfile, JSON.stringify(filedata), function(err){
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            }); 
            this.setState({teamData: filedata, input1:'', input2:''})

        });      
    };

    
    render() {
        return  (
            <div className="container fluid" style={{ marginLeft: '90px' }}>
                <div>
                    <Form>
                        <ControlLabel>Team Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter the Name" ref="table" value={this.state.input1} 
                        onChange={this.handleInputChange.bind(this, 'input1')}/>
                        <ControlLabel>Members Name</ControlLabel>
                        <FormControl id="formControlsText" type="text" label="Text" placeholder="Enter Name" value={this.state.input2} 
                        onChange={this.handleInputChange.bind(this, 'input2')} />                    
                    </Form>
                </div>

                <Button type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>
                <TeamTable project={this.state.teamData} />      
            </div>              
        );
    }
};

var TeamTable = function(props) {

    function afterSaveCell(row, cellName, cellValue) {
        fs.readFile(teamfile, (err, data) => {
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
        fs.writeFile(teamfile, JSON.stringify(filedata), function(err){
        if (err) throw err;
            console.log('The "data to append" was appended to file!');
        }); 
    })
    setTimeout(function() {
        let obj =  [{table:{}}];           
        obj = row;
        fs.readFile(teamfile, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            filedata.push(obj);
            fs.writeFile(teamfile, JSON.stringify(filedata), function(err){
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });        
        })}, 100);
    };

    function onDeleteRow(rows) {
        fs.readFile(teamfile, (err, data) => {
        var filedata = JSON.parse(data);
            for (var n = 0 ; n < filedata.length ; n++) {
            if (filedata[n].id == rows) {
              var removedObject = filedata.splice(n,1);
              removedObject = null;
              break;
            }
        }
        if (err) throw err;
        fs.writeFile(teamfile, JSON.stringify(filedata), function(err){
            if (err) throw err;
                console.log('The "data to append" was appended to file!');
            }); 
        })
    };


    const cellEdit = {
        mode: 'dbclick',
        blurToSave: true,
        afterSaveCell: afterSaveCell
    };  

    const selectRow = {
        mode: 'radio',
        clickToSelect: true
    };

    const options = {
        //onRowDoubleClick: this.onRowDoubleClick,
        onDeleteRow: onDeleteRow,
        //afterInsertRow: this.onAfterInsertRow   // A hook for after insert rows
    };

    const bootstrapTable =  
         <BootstrapTable data={props.project} cellEdit={ cellEdit } options={ options } selectRow={selectRow} deleteRow>
            <TableHeaderColumn dataField="id" isKey={true}>Team Name</TableHeaderColumn>
            <TableHeaderColumn dataField="membername">Members Name</TableHeaderColumn>
        </BootstrapTable>               
        return (
            <div>
            {bootstrapTable}
            </div>
        )
    }   

module.exports = TeamManagement
