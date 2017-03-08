const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Navbar = require('react-bootstrap/lib/Navbar');
const NavDropdown = require('react-bootstrap/lib/NavDropdown');
const MenuItem = require('react-bootstrap/lib/MenuItem');

var NavBar = function(props) {
  const aboutUs = {
    title: "About Us",
    content: <p>content</p>
  }
  return (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Translation Manager</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={2} onClick={() => props.actions.openModal(aboutUs.title, aboutUs.content)}>
            About Us
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  )
}
   
module.exports = NavBar
