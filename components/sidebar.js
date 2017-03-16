const React = require('react');
const bootstrap = require('react-bootstrap');

const Glyphicon = require("react-bootstrap/lib/Glyphicon");
const SideBarButton = require("./sidebarbutton");

const style = require("./Style");

class Sidebar extends React.Component {

  render() {
   
    return (
      <div>
        <div style={style.sidebarContainer}>
          <ul style={style.ul}>
            <SideBarButton handleButtonClick={() => this.props.actions.showPage('Projects')} imageName={"images/assign@3xwhite.png"} hoverImage={"images/assign@3x.png"} style={style.image} value={"Projects"} />
            <SideBarButton handleButtonClick={() => this.props.actions.showPage('Milestones')} imageName={"images/assign@3xwhite.png"} hoverImage={"images/assign@3x.png"} style={style.image} value={"Milestones"}/>
            <SideBarButton handleButtonClick={() => this.props.actions.showPage('Teams')} imageName={"images/teams@3x.png"} hoverImage={"images/teams@3x.png"} style={style.image} value={"Teams"}/>
            <SideBarButton handleButtonClick={() => this.props.actions.showPage('Assignments')} imageName={"images/assign@3xwhite.png"} hoverImage={"images/assign@3x.png"} style={style.image} value={"Assignments"}/>
            <SideBarButton handleButtonClick={() => this.props.actions.showPage('Progress')} imageName={"images/stats@3xwhite.png"} hoverImage={"images/stats@3x.png"} style={style.image} value={"Progress"}/>
          </ul>
        </div>
      </div>
    );
  }
};

module.exports = Sidebar
