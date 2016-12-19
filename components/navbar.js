const React = require('react');
const bootstrap = require('react-bootstrap');
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Navbar = require('react-bootstrap/lib/Navbar');
const NavDropdown = require('react-bootstrap/lib/NavDropdown');
const MenuItem = require('react-bootstrap/lib/MenuItem');
const MilestoneManagement = require('./milestone_management');

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {component: <div><NavBar /></div>}
    }
    showMilestoneManagement(){
        console.log('Showing Milestone Management');
        this.setState({
            component: <div><MilestoneManagement /></div>
        })
    }
  render() {
    
    return (
          <div>
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#">Translation Manager</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Sync</NavItem>
                <NavItem eventKey={2} href="#">Reports</NavItem>
                <NavItem eventKey={2} href="#">Settings</NavItem>
                <NavItem eventKey={2} href="#">Package Manager</NavItem>
                <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={() => this.showMilestoneManagement()}>Milestone Management</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar>
          </div>
    )}       
};

module.exports = NavBar