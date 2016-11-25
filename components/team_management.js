const React = require('react');
const bootstrap = require('react-bootstrap');
//const jsonfile = require('jsonfile');
const fs = require('fs');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Form = require('react-bootstrap/lib/Form');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const style = require("./Style");
const Table = require('./table');
const file = ('./static/teamname.json');
const nameData = require('../static/name.json');
const ReactSelectize = require("react-selectize");
const MultiSelect = ReactSelectize.MultiSelect;

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: <div><Table /></div> , makes:nameData } 
    }

    handleChange(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

    handleSubmit() {       
        var obj =  {table:[]};                   
        var obj1 = this.state.input1;
        var obj2 = this.state.make;
        console.log(obj2);
        obj.table.push({id: obj1});
        console.log(obj)
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            var filedata = JSON.parse(data);
            console.log(obj.table);
            filedata.table.push(obj.table);
            fs.writeFile(file, JSON.stringify(filedata), function(err){
            if (err) throw err;
            console.log(filedata);
            console.log('The "data to append" was appended to file!');
            });    
        });
 
    }

    render() {
        var component = this.state.component;
         var names = this;
      
        return (<div>
            <div className="container fluid" style={{ marginLeft: '90px' }}>
                <Form>
                <FormGroup controlId="formInlineName">
                    <div><MultiSelect options = { this.state.makes.map(function(make) {
                        return { label: make.label, value: make.id };
                    })
                    } placeholder = "Select Names" value = { this.state.make } 
                            onValueChange = { function(make) {
                            names.setState ({make: make, model: undefined}
                            )}}>                  
                    </MultiSelect></div>
                </FormGroup>
                <FormGroup controlId="formInlineName">
                  <ControlLabel>Team Name</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Enter the Name" value={this.state.input1} onChange={this.handleChange.bind(this, 'input1')}/>
                </FormGroup>
                    {' '}                                    
                </Form></div>
                {component}
                <Button type="submit" style={{ marginLeft: '90px' }} onClick={() => this.handleSubmit()}>Submit</Button>
            </div>
        );
    }
};

module.exports = TeamManagement
