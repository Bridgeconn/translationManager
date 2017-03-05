const React = require('react');
const bootstrap = require('react-bootstrap');
const Tooltip = require("react-bootstrap/lib/Tooltip");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

const style = require("./style");

class Sidebar extends React.Component {
  render() {
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
              <li style={style.li} onClick={() => this.props.actions.showPage('Projects')}>Projects</li>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={milestonetooltip}>
              <li style={style.li} onClick={() => this.props.actions.showPage('Milestones')}>Milestones</li>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={teamtooltip}>
              <li style={style.li} onClick={() => this.props.actions.showPage('Teams')}>Teams</li>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={assigntooltip}>
              <li style={style.li} onClick={() => this.props.actions.showPage('Assignments')}>Assignments</li>
            </OverlayTrigger>
            <OverlayTrigger placement="right" overlay={progresstooltip}>
              <li style={style.li} onClick={() => this.props.actions.showPage('Progress')}>Progress</li>
            </OverlayTrigger>
          </ul>
        </div>
      </div>
    );
  }
};

module.exports = Sidebar
