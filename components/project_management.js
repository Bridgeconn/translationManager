const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Form = require('react-bootstrap/lib/Form');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const ReactBsTable = require("react-bootstrap-table");
var projectfile = ('./static/projects.json');

class ProjectManagement extends React.Component {
	constructor(props) {
	    super(props);
	    var projectdata = JSON.parse(fs.readFileSync(projectfile, 'utf8'));
	    this.state = {projectData:projectdata};
	}
      
	handleInputChange(name, e) {
		let change = {};
		change[name] = e.target.value;
		this.setState(change);
	}

	handleSubmit(e) {
	    let obj = [{table:{}}];                   
	    let obj1 = this.state.input1;
	    //let obj2 = this.state.project.label;
	    let obj3 = this.state.input2;
   	    let obj4 = this.state.input3;    
	    let obj5 = this.state.input4;    
	    obj =({name: obj3, language: obj1, version:obj5, organization:obj4});
        fs.readFile(projectfile, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            filedata.push(obj);
            fs.writeFile(projectfile, JSON.stringify(filedata), function(err){
                if (err) throw err;
                console.log('The "data to append" was appended to file!');
            });
   	        this.setState({projectData:filedata, input1:'', input2:''})
        });
	};

	render() {
	    return  (
	        <div className="container fluid" style={{ marginLeft: '90px' }}>
	        <Form>
                <FormGroup controlId="formInlineName">
                    <ControlLabel>Project Name</ControlLabel>
                    <FormControl type="text" placeholder="Enter the Project Name" value={this.state.input2} 
                    onChange={this.handleInputChange.bind(this, 'input2')}/>
                    <ControlLabel>Language</ControlLabel>
                    <FormControl type="text" placeholder="Enter the Language" value={this.state.input1} 
                    onChange={this.handleInputChange.bind(this, 'input1')}/>
                    <ControlLabel>Organization</ControlLabel>
                    <FormControl type="text" placeholder="Enter the organization" value={this.state.input3} 
                    onChange={this.handleInputChange.bind(this, 'input3')}/>
                    <ControlLabel>Version</ControlLabel>
                    <FormControl type="text" placeholder="Enter the version" value={this.state.input4} 
                    onChange={this.handleInputChange.bind(this, 'input4')}/>
                </FormGroup>
            </Form>
            <Button type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add New Project</Button>
   			<ProjectTable project={this.state.projectData} />      
	        </div>
	    );
	}
};

var ProjectTable = function(props) {
	function onDeleteRow(rows) {
    	fs.readFile(projectfile, (err, data) => {
		    var filedata = JSON.parse(data);
		        for (var n = 0 ; n < filedata.length ; n++) {
		        if (filedata[n].name == rows) {
		          var removedObject = filedata.splice(n,1);
		          removedObject = null;
		          break;
		        }
		    }
		    if (err) throw err;
		    fs.writeFile(projectfile, JSON.stringify(filedata), function(err){
			    if (err) throw err;
			    console.log('The "data to append" was appended to file!');
			}); 
    	})
	}

	function afterSaveCell(row, cellName, cellValue) {
	    fs.readFile(projectfile, (err, data) => {
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
	        fs.writeFile(projectfile, JSON.stringify(filedata), function(err){
	        if (err) throw err;
	        }); 
		})
	    setTimeout(function() {
	        let obj =  [{table:{}}];           
	        obj = row;
	        console.log(obj);
	        fs.readFile(projectfile, (err, data) => {
	            if (err) throw err;
	            let filedata = JSON.parse(data);
	            filedata.push(obj);
	            console.log(filedata);
	            fs.writeFile(projectfile, JSON.stringify(filedata), function(err){
	                if (err) throw err;
	                console.log('The "data to append" was appended to file!');
	            });              
	    })}, 100);
	};
	const options = {
		onDeleteRow: onDeleteRow
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

	const bootstrapTable =  
		<BootstrapTable data={props.project} cellEdit={ cellEdit } selectRow={selectRow} options={ options } deleteRow>
            <TableHeaderColumn dataField="name" isKey={true}>Project Name</TableHeaderColumn>
            <TableHeaderColumn dataField="language">Language</TableHeaderColumn>
            <TableHeaderColumn dataField="organization">Organization</TableHeaderColumn>
            <TableHeaderColumn dataField="version">Version</TableHeaderColumn>
        </BootstrapTable>
	return (
		<div>
			{bootstrapTable}
	    </div>
	)
}

module.exports = ProjectManagement