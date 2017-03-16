const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Tooltip = require("react-bootstrap/lib/Tooltip");
const OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");

class SideBarButton extends React.Component{
  constructor(){
    super();
    this.state ={
      hover: false,
    }
  }

  mouseEnter(){
    this.setState({hover: true});
  }

  mouseLeave(){
    this.setState({hover: false});
  }

    render(){
    const linkStyle = this.state.hover ? style.hover : style.li;
    const iconImage = this.state.hover ? this.props.hoverImage : this.props.imageName;
    let icon;
    if(iconImage){
    icon = <img src={iconImage} style={style.img}/>;
    }
    return(
    <div>
        <li style={linkStyle} onClick={this.props.handleButtonClick} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>{icon}<br/>{this.props.value}</li>
    </div>
      );
    }

}

module.exports = SideBarButton;
