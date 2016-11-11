const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const Button = require('react-bootstrap/lib/Button');
const ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
//const options = require('./../static/name.json');
const sizeData = require('../static/teamsize.json');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;

class NameDropdown extends React.Component {
    // render :: a -> ReactElement
    render() {
        var self = this,
            options = ["Mario Myers", "Myrtie Underwood", "Caroline Aguilar", "Lelia Schultz", "Micheal Terry", "Scott Duncan", "Ora Reid", "Jose Wong"].map(function(name) {
                return {
                    label: name,
                    value: name
                }
            });
        return <div><label> Team Name(S) </label><MultiSelect 
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
        /></div >
    }

};

class UnitDropdown extends React.Component {
    // render :: a -> ReactElement

    render() {
       var self = this,
            options = ["Chunk","Chapter","Chapter","Book","Verse","Chapter","Verse","Book"].map(function(milestone){
                return {label: milestone, value: milestone}
            }); 
        return <div><label>Milestone</label><SimpleSelect options={options} 
                             placeholder="Select" restoreOnBackspace={function(item){
                                 return item.label.substr(0, item.label.length - 1)
                             }}>
        </SimpleSelect></div>
    
    }
};
class TeamsizeDropdown extends React.Component {
    // render :: a -> ReactElement
    render() {
       var self = this, 
            options = ["2","4","5","3","2","5","4","6"].map(function(teamSize){
                return {label: teamSize, value: teamSize}
            }); 
        return <div><label> Teamsize Dropdown </label><SimpleSelect options={options} 
                             placeholder="Select" restoreOnBackspace={function(item){
                                 return item.label.substr(0, item.label.length - 1)
                             }}>
        </SimpleSelect></div>
    
    }
};
class StartdateDropdown extends React.Component {
    // render :: a -> ReactElement

    render() {
       var self = this,        
            options = ["05-11-2016","01-12-2016","12-18-2016","01-24-2016","07-07-2016","08-15-2016","02-19-2016","06-06-2016"].map(function(startdate){
                return {label: startdate, value: startdate}
            }); 
        return <div><label> Start Date Dropdown </label><SimpleSelect options={options} 
                             placeholder="Select" restoreOnBackspace={function(item){
                               return item.label.substr(0, item.label.length - 1)
                             }}>
        </SimpleSelect></div>
    
    }
};
class EnddateDropdown extends React.Component {
    // render :: a -> ReactElement

    render() {
       var self = this,         
            options = ["05-11-2016","01-12-2016","12-18-2016","01-24-2016","07-07-2016","08-15-2016","02-19-2016","06-06-2016"].map(function(enddate){
                return {label: enddate, value: enddate}
            }); 
        return <div><label> End Date Dropdown </label><SimpleSelect options={options} placeholder="Select" restoreOnBackspace={function(item){
                             return item.label.substr(0, item.label.length - 1)
                             }}>
        </SimpleSelect></div>
    
    }
};
class MilestoneDropdown extends React.Component {
    // render :: a -> ReactElement

    render() {
       var self = this,
            options = ["MAST","Self-checking","Community-Check","Stage 1","MAST","Stage 3","MAST","MAST"].map(function(milestone){
                return {label: milestone, value: milestone}
            }); 
        return <div><label>Milestone Dropdown </label>
        <SimpleSelect options={options} placeholder="Select" restoreOnBackspace={function(item){
                      return item.label.substr(0, item.label.length - 1)
                    }}>
        </SimpleSelect></div>
    
    }
};
class Form extends React.Component {
    // render :: a -> ReactElement

    render() {
        return <div>    
        <ListGroupItem header="ASSIGN"></ListGroupItem>
        <Button bsStyle="primary" bsSize="small">Delete</Button>
        <Button bsStyle="primary" bsSize="small">Edit</Button>
        <Button bsStyle="default" bsSize="small" >Add</Button></div>
    
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