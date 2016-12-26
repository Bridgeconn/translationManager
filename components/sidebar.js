const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Progressbar = require('./progress');
const TeamManagement = require('./team_management');
const MilestoneManagement = require('./milestone_management');
const ProjectManagement = require('./project_management');
const  Form  = require('./assign.js');

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {component: <div><Form /></div>}
    }

    showAssignPage(){
        console.log('showing Table');
        this.setState({
            component: <div><Form /></div>
        });
    }

   showProgressPage(){
        console.log('showing Progress');
        this.setState({
            component: <div><Progressbar /></div>
        });
    }

    showTeamManagement(){
        console.log('Showing Team Management');
        this.setState({
            component: <div><TeamManagement /></div>
        })
    }

    showMilestoneManagement(){
        console.log('Showing Milestone Management');
        this.setState({
            component: <div><MilestoneManagement /></div>
        })
    }

    showProjectManagement(){
        console.log('Showing Project Management');
        this.setState({
            component: <div><ProjectManagement /></div>
        })
    }

    render() {
        var component = this.state.component;
        return (
          <div>
          <div style={style.container}>
             <img src="images/TC_Icon_logo.png" style={style.logo}/>
              <ul style={style.ul}>
                <li style={style.li} onClick={() => this.showAssignPage()}>Assign</li>
                <li style={style.li} onClick={() => this.showProgressPage()}>Progress</li>
                <li style={style.li} onClick={() => this.showTeamManagement()}>Team Management</li>
                <li style={style.li} onClick={() => this.showMilestoneManagement()}>Milestone Management</li>
                <li style={style.li} onClick={() => this.showProjectManagement()}>Project Management</li>
              </ul></div>
            {component}          
          </div>
        );
    }  
};

module.exports =  Sidebar

