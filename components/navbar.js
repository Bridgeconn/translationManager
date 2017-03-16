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
    content: <p>A new, open-source platform called translationCore is being developed with the intent to:
    freely provide each ethnolinguistic Church with comprehensive checklists (“elements of meaning transfer that should be checked”)
    that enable the Church to confidently and reliably confirm and improve the accuracy of their own Bible translations (“trustworthy”)
    by applying the principles of excellence in Bible translation (described in translationAcademy)
    enabling the comparison of their translations against multiple sources and the original languages,
    and empowering the Church to confirm that their trust of their Bible translation is well-placed (“trusted”).
    ufw.io/tc</p>
    }
  return (
    <div>
      <Navbar inverse collapseOnSelect fixedTop className="customHeader">
        <Navbar.Header>
            <img src="images/TC_Icon_logo.png" href="#" style={style.logo}/><span className="pagetitle">tManager</span>
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
