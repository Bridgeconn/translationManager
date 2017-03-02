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
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;

class MilestoneManagement extends React.Component {
	constructor(props) {
	    super(props);
	    var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
  	    var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));
	    this.state = {milestoneData:milestonedata};
	}
	        
	handleInputChange(name, e) {
		let change = {};
		change[name] = e.target.value;
		this.setState(change);
	}

	handleSubmit(e) {
	    let obj =  [{table:{}}];                   
	    let obj1 = this.state.input1;
	    let obj3 = this.state.input2;
	    obj =({name: obj3 , description: obj1});
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            filedata.push(obj);
            fs.writeFile(file, JSON.stringify(filedata), function(err){
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            }); 
   	        this.setState({milestoneData:filedata, input1:'', input2:''})
        });
	};

	render() {
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
	            <MilestoneTable project={this.state.milestoneData} />      
	        </div>
	    );
	}
}

		var MilestoneTable = function(props) {

		function onDeleteRow(rows) {
		    fs.readFile(file, (err, data) => {
			    var filedata = JSON.parse(data);
		        for (var n = 0 ; n < filedata.length ; n++) {
		        if (filedata[n].description == rows) {
		          var removedObject = filedata.splice(n,1);
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
		}

		function afterSaveCell(row, cellName, cellValue) {
		    fs.readFile(file, (err, data) => {
		        var filedata = JSON.parse(data);
		        for (var n = 0 ; n < filedata.length ; n++) {
		        if (filedata[n].description == row.description) {
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
			<BootstrapTable data={props.project} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
		        <TableHeaderColumn dataField="name">Milestone Name</TableHeaderColumn>
		        <TableHeaderColumn dataField="description" isKey={true}>Description</TableHeaderColumn>
		    </BootstrapTable>            
			return (
				<div>
					{bootstrapTable}
			    </div>
			)
		}	

module.exports = MilestoneManagement