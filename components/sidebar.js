const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Table = require('./table');
const { NameDropdown,UnitDropdown,MilestoneDropdown,TeamsizeDropdown,StartdateDropdown,EnddateDropdown,Form } = require('./form.js');

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {component: <div><Form /><NameDropdown /><UnitDropdown /><EnddateDropdown /><StartdateDropdown /><TeamsizeDropdown /><MilestoneDropdown /><Table /></div>}
        }
        showViewPage(){
            console.log('showing Table');
            this.setState({
                component: <Table />
            });
        }
        showAssignPage(){
            console.log('showing Table');
            this.setState({
                component: <div><Form /><NameDropdown /><UnitDropdown /><EnddateDropdown /><StartdateDropdown /><TeamsizeDropdown /><MilestoneDropdown /><Table /></div>
            });
    }

    render() {
        var component = this.state.component;
        return (
          <div>
          <div style={style.container}>
             <img src="images/TC_Icon_logo.png" style={style.logo}/>
              <ul style={style.ul}>
                <li style={style.li} onClick={() => this.showAssignPage()}>Assign</li>
                <li style={style.li} onClick={() => this.showViewPage()}>View</li>
                <li style={style.li}>Progress</li>
              </ul></div>
            {component}          
          </div>
        );
    }  
};

module.exports =  Sidebar

