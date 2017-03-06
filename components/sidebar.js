const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Progressbar = require('./progress');
const TeamManagement = require('./team_management');
const MilestoneManagement = require('./milestone_management');
const ProjectManagement = require('./project_management');
const  Form  = require('./assign.js');
const Tooltip = require("react-bootstrap/lib/Tooltip");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
const Glyphicon = require("react-bootstrap/lib/Glyphicon");

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {component: <div><ProjectManagement /></div>}
    }

    showProjectManagement(){
        console.log('Showing Project Management');
        this.setState({
            component: <div><ProjectManagement /></div>
        }) 
    }

    showMilestoneManagement(){
        console.log('Showing Milestone Management');
        this.setState({
            component: <div><MilestoneManagement /></div>
        })
        //window.location.reload()
    }

    showTeamManagement(){
        console.log('Showing Team Management');
        this.setState({
            component: <div><TeamManagement /></div>
        })
        //window.location.reload(); 
    }

    showAssignPage(){
        console.log('showing Table');
        this.setState({
            component: <div><Form /></div>
        });
        //window.location.reload() 
    }

   showProgressPage(){
        console.log('showing Progress');
        this.setState({
            component: <div><Progressbar /></div>
        });
        //window.location.reload() 
    }
   

    render() {
        var component = this.state.component;
    const projecttooltip = (
        <Tooltip id="tooltip">Add/Update Translation Project Detail</Tooltip>
    );

    const milestonetooltip = (
        <Tooltip id="tooltip"> Configure / set Milestones for your projects</Tooltip>
    );

    const teamtooltip = (
        <Tooltip id="tooltip">Add/Edit Teams and Members</Tooltip>
    );

    const assigntooltip = (
        <Tooltip id="tooltip">Assign Chapters to a team in a particular milestone</Tooltip>
    );

    const progresstooltip = (
        <Tooltip id="tooltip">View Progress of Each Project by Milestone and Book</Tooltip>
    );
        return (
        <div>
            <div style={style.container}>
                <img src="images/TC_Icon_logo.png" style={style.logo}/>
                <ul style={style.ul}>
                <OverlayTrigger placement="right" overlay={projecttooltip}>
                    <li style={style.li} onClick={() => this.showProjectManagement()}><img src="tmicons/assign.png" style={style.image}/><label>Project Management</label></li>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={milestonetooltip}>
                    <li style={style.li} onClick={() => this.showMilestoneManagement()}><Glyphicon glyph="th-large" /><label>Milestone Management</label></li>      
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={teamtooltip}>
                    <li style={style.li} onClick={() => this.showTeamManagement()}><img src="tmicons/teams.png" style={style.image}/><label>Team Management</label></li>                
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={assigntooltip}>
                    <li style={style.li} onClick={() => this.showAssignPage()}><img src="tmicons/assign@3x.png" style={style.image}/><label>Assignment</label></li>
                </OverlayTrigger>
                <OverlayTrigger placement="right" overlay={progresstooltip}>
                    <li style={style.li} onClick={() => this.showProgressPage()}><img src="tmicons/stats@3x.png" style={style.image}/>Progress</li>
                </OverlayTrigger>
                </ul></div>
            {component}          
        </div>
        );
    }  
};

module.exports =  Sidebar

