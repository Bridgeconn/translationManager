const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Form = require('react-bootstrap/lib/Form');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const _ = require('lodash');
const ReactBsTable = require("react-bootstrap-table");

const { TableHeaderColumn, InsertButton } = require('react-bootstrap-table');
const file = ('./static/milestones.json');
const projectfile = ('./static/projects.json');
const milestonefile = ('./static/milestones.json');
//const milestoneData = require('../static/milestones.json');
//const projectData = require('../static/projects.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;

class MilestoneManagement extends React.Component {
	constructor(props) {
	    super(props);
	    var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
  	    var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));
	    this.state = {projectData:projectdata, milestoneData:milestonedata};
	}
	        
	handleInputChange(name, e) {
		let change = {};
		change[name] = e.target.value;
		this.setState(change);
	}

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
	    let obj3 = this.state.input2;
	    obj =({name: obj3 , description: obj1});
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
            window.location.reload();
	    }
	};

	afterSaveCell(row, cellName, cellValue) {
	    fs.readFile(file, (err, data) => {
	        var filedata = JSON.parse(data);
	        for (var n = 0 ; n < filedata.length ; n++) {
	        if (filedata[n].name == row.name) {
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
	        }); 
		})
	    setTimeout(function() {
	        let obj =  [{table:{}}];           
	        obj = row;
	        fs.readFile(file, (err, data) => {
	            if (err) throw err;
	            let filedata = JSON.parse(data);
	            console.log(filedata)
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
	        if (filedata[n].name == rows) {
	          var removedObject = filedata.splice(n,1);
	          removedObject = null;
	          break;
	        }
	    }
	    if (err) throw err;
	    fs.writeFile(file, JSON.stringify(filedata), function(err){
		    if (err) throw err;
		        console.log('The "data to append" was appended to file!');
                window.location.reload();
		    }); 
	    })
	}

	render() {
	    var teamsize = this;

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
	        onDeleteRow: this.onDeleteRow,
	        //afterInsertRow: this.onAfterInsertRow   // A hook for after insert rows
	    };

	    return  (
	        <div className="container fluid" style={{ marginLeft: '90px' }}>
	        	Milestone Mangement
	            <div >
	                <Form>
	                    <FormGroup controlId="formInlineName">
	                        <ControlLabel>Milestone Name</ControlLabel>
	                        <FormControl type="text" placeholder="Enter the Milestone Name" 
	                        onChange={this.handleInputChange.bind(this, 'input2')}/>
	                        <ControlLabel>Description</ControlLabel>
	                        <FormControl type="text" placeholder="Enter the Milestone Description"  
	                        onChange={this.handleInputChange.bind(this, 'input1')}/>
	                    </FormGroup>
	                </Form>
	            </div>
	            <Button type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add New Milestone</Button>
	            <BootstrapTable ref="table" data={this.state.milestoneData} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
	                <TableHeaderColumn dataField="name" >Milestone Name</TableHeaderColumn>
	                <TableHeaderColumn dataField="description" isKey={true}>Description</TableHeaderColumn>
	            </BootstrapTable>                 
	        </div>
	    );
	}
};

module.exports = MilestoneManagement