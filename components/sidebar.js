const React = require('react');
const ReactDOM = require('react-dom');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const {Glyphicon} = bootstrap;


class Sidebar extends React.Component {
  render() {
    return (
            <div style={style.container}>
               <img src="images/TC_Icon_logo.png" style={style.logo}/>
                <ul style={style.ul}>
                <li style={style.li} className="active">Assign</li>
                <li style={style.li}>View</li>
                <li style={style.li}>Progress</li>
                </ul>
            </div>
      );
      }   
}
module.exports =  Sidebar
