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
const file = ('./static/team.json');
const teamnameData = require('../static/teamname.json');
const teamData = require('../static/team.json');
const _ = require('lodash');
const ReactBsTable = require("react-bootstrap-table");
//const Select = require('react-select');
const ReactSuperSelect = require('react-super-select');

class TeamManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(teamData);
}
    handleInputChange(name, e) {
      let change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

    handlerExample(options) {
      let output = [];
      _.map(options, function(option){
        output = output.concat([option.name]);
        global.multiselect = output
        console.log(multiselect);
      })

    };
   
    handleSubmit() {  
        let obj =  {table:[]};                   
        let obj1 = this.state.input1;
        let obj2 = multiselect;
        //console.log(obj2);
        obj.table.push({id: obj1 , membername: obj2});
        console.log(obj)
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            let filedata = JSON.parse(data);
            console.log(obj);
            filedata.push(obj);
            fs.writeFile(file, JSON.stringify(filedata), function(err){
            if (err) throw err;
            console.log(filedata);
            console.log('The "data to append" was appended to file!');
            });    
        });
 
    }

    render() {
        var element = [];
       for  (var i = 0, len = teamData.length; i < len; ++i) {
              element.push(teamData[i].table);
              //console.log(JSON.stringifyteamData[i]);              
              }
              console.log(element);

        return (<div>
            <div className="container fluid" style={{ marginLeft: '90px' }}>

                <Form>
                <ReactSuperSelect placeholder="Make Your Selections" 
                  dataSource={teamnameData} 
                  onChange={this.handlerExample} 
                  multiple={true}
                  tags={true}
                  keepOpenOnSelection={true}
                   />

                <FormGroup controlId="formInlineName">
                  <ControlLabel>Team Name</ControlLabel>
                  {' '}
                  <FormControl type="text" placeholder="Enter the Name" value={this.state.input1} onChange={this.handleInputChange.bind(this, 'input1')}/>
                </FormGroup>
                    {' '} 
                <BootstrapTable data={element}>
                    <TableHeaderColumn dataField="id" isKey={true}>Team Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="membername">Names</TableHeaderColumn>    
                </BootstrapTable>
                                   
                </Form></div>
                <Button type="submit" style={{ marginLeft: '90px' }} onClick={() => this.handleSubmit()}>Submit</Button>
            </div>
        );
    }
};

module.exports = TeamManagement
