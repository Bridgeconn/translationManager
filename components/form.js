const React = require('react');
const bootstrap = require('react-bootstrap');
const Button = require('react-bootstrap/lib/Button');
const _ = require('lodash');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const DatePicker = require("react-bootstrap-date-picker");
const Panel = require("react-bootstrap/lib/Panel");
const ButtonToolbar = require("react-bootstrap/lib/ButtonToolbar");
const unitData = require('../static/unit.json');
const nameData = require('../static/name.json');
const milestoneData = require('../static/milestone.json');
const teamsizeData = require('../static/teamsize.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;

class Form extends React.Component {
    render() {
        return <div className="container fluid" style={{ marginLeft: '90px' }}>    
            <Panel header= "Assign" bsStyle="info">
            <ButtonToolbar>
                <Button bsStyle="primary" bsSize="small">Delete</Button>
                <Button bsStyle="primary" bsSize="small">Edit</Button>
                <Button bsStyle="default" bsSize="small">Add</Button>
            </ButtonToolbar></Panel>
        </div>
    }
};

class UnitDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { makes: unitData  };
    }
    render() {
       var unit = this;
        return <div className = "container fluid"
        style = {{ marginLeft: '90px' }} ><label>Unit</label>
            <SimpleSelect
        placeholder = "Select a Unit"
        options = {
            this.state.makes.map(function(make) {
                return { label: make.label, value: make.id };
            })
        }  
        value = { this.state.make }    onValueChange = { function(make) {
                    unit.setState ({make: make, model: undefined}
                    )
                }}
        /> </div>
    }
};

class TeamsizeDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { makes: teamsizeData };
    }
    render() {
        var teamsize = this;
        return <div className = "container fluid"
        style = {{ marginLeft: '90px' }} ><label> Teamsize </label>
            <SimpleSelect
        placeholder = "Select Teamsize"
        options = {
            this.state.makes.map(function(make) {
                return { label: make.label, value: make.id };
            })
        }
        value = { this.state.make }  
        onValueChange = { function(make) {
                teamsize.setState ({make: make, model: undefined}
                )
            }}
        /> </div>
    }
};

class MilestoneDropdown extends React.Component {
   constructor(props) {
        super(props);
        this.state = { makes: milestoneData };
    }
    render() {
         var milesstone = this;
        return <div className = "container fluid"
        style = {{ marginLeft: '90px' }} ><label> Milestone </label>
        <SimpleSelect
        placeholder = "Select Milestone"
        options = {
            this.state.makes.map(function(make) {
                return { label: make.label, value: make.id };
            })
        }
        value = { this.state.make } 
        onValueChange = { function(make) {
                milesstone.setState ({make: make, model: undefined}
                )
            }}
        /> </div>
    }
};

class NameDropdown extends React.Component {
    render() {
        var self = this,
            options = ["Mario Myers", "Myrtie Underwood", "Caroline Aguilar", "Lelia Schultz", "Micheal Terry", "Scott Duncan", "Ora Reid", "Jose Wong"].map(function(name) {
                return {
                    label: name,
                    value: name
                }
            });
        return <div className="container fluid" style={{ marginLeft: '90px' }}><label> Team Name(S) </label><MultiSelect 
        placeholder = "Select Name"
        options = {
            options
        }

        filterOptions = {
            function(options, values, search) {
                return _.chain(options)
                .filter(function(option) {
                    return option.label.indexOf(search) > -1;
                })
                .map(function(option) {
                    option.selectable = values.map(function(item) {
                      return item.value;
                    }).indexOf(option.value) == -1
                    return option;
                })
                .value()
            }
        }
        /> </div >
    }
};

class StartdateDropdown extends React.Component {
  constructor(props) {
        super(props);
        this.state = {value : new Date().toISOString()};       
    } 
      handleChange(value) {
        // value is an ISO String. 
        this.setState({ value: value });
    }
      render(){
        return <div className="container fluid" style={{ marginLeft: '90px', width:'30%' }}><label>Start Date</label> 
            <DatePicker value={this.state.value} onChange={this.handleChange} />
          </div>
    }
};

class EnddateDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value : new Date().toISOString()};       
      } 
      handleChange(value) {
        // value is an ISO String. 
        this.setState({ value: value });
      }
      render(){
        return <div className="container fluid" style={{ marginLeft: '90px', width:'30%'}}> <label>End Date</label>
            <DatePicker value={this.state.value} onChange={this.handleChange} />
          </div>
    }
};

module.exports = {
    NameDropdown,
    UnitDropdown,
    TeamsizeDropdown,
    StartdateDropdown,
    EnddateDropdown,
    MilestoneDropdown,
    Form
}
