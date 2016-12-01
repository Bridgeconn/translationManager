const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Form = require('react-bootstrap/lib/Form');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const FormControl = require('react-bootstrap/lib/FormControl');
const Button = require('react-bootstrap/lib/Button');
const style = require("./Style");
const Table = require('./table');
const _ = require('lodash');
const ReactBsTable = require("react-bootstrap-table");
const ReactSuperSelect = require('react-super-select');
const file = ('./static/team.json');
const teamnameData = require('../static/teamname.json');
const teamData = require('../static/team.json');

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        global.multiselect = output
      })
    };

    handleSubmit(e) {
        let obj =  [{table:{}}];                   
        let obj1 = this.state.input1;
        if ( typeof multiselect === 'undefined'){
            alert("Please select the name");
        }else{
            let obj2 = multiselect;
            obj =({id: obj1 , membername: obj2});
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
                });
            }
            
        }    
    };

    render() {
        return  (
            <div className="container fluid" style={{ marginLeft: '90px' }}>
                <div >
                    <Form>
                        <ReactSuperSelect placeholder="Select the name" 
                          dataSource={teamnameData} 
                          onChange={this.handlerDropdown} 
                          multiple={true}
                          tags={true}
                          keepOpenOnSelection={true}
                          clearSearchOnSelection = {true}
                          />

                        <FormGroup controlId="formInlineName">
                        <ControlLabel>Team Name</ControlLabel>
                        {' '}
                        <FormControl type="text" placeholder="Enter the Name" ref="table" value={this.state.input1} onChange={this.handleInputChange.bind(this, 'input1')}/>
                        </FormGroup>
                            {' '} 
                    </Form>
                </div>

                <Button type="submit" style={{ position: 'left' }} onClick={() => this.handleSubmit()}>Add Team</Button>
                <BootstrapTable ref="table" data={teamData} >
                    <TableHeaderColumn dataField="id" isKey={true}>Team Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="membername">Names</TableHeaderColumn>    
                </BootstrapTable>                 
            </div>
        );
    }
};

module.exports = TeamManagement
