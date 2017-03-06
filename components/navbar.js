const React = require('react');
const bootstrap = require('react-bootstrap');
const style = require("./Style");
const Nav = require('react-bootstrap/lib/Nav');
const NavItem = require('react-bootstrap/lib/NavItem');
const Navbar = require('react-bootstrap/lib/Navbar');
const NavDropdown = require('react-bootstrap/lib/NavDropdown');
const MenuItem = require('react-bootstrap/lib/MenuItem');
const MilestoneManagement = require('./milestone_management');
const Modal = require('react-bootstrap/lib/Modal');
const Button = require('react-bootstrap/lib/Button');

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {comp: <div><NavBar /></div>}
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
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
                    <NavItem eventKey={2} onClick={() => this.open()}>About Us</NavItem>
                    <NavItem eventKey={3}><img src="tmicons/user-icon.png" style={style.glyphicon}/></NavItem>
                </Nav>
            </Navbar>
                  <div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>About Us</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>translationManager</h4>
                    <p>A new, open-source platform called translationManager is being developed with the intent to:
                      freely provide each ethnolinguistic Church with comprehensive checklists (“elements of meaning transfer that should be checked”)
                      that enable the Church to confidently and reliably confirm and improve the accuracy of their own Bible translations (“trustworthy”)
                      by applying the principles of excellence in Bible translation (described in translationAcademy)
                      enabling the comparison of their translations against multiple sources and the original languages,
                      and empowering the Church to confirm that their trust of their Bible translation is well-placed (“trusted”).
                      ufw.io/tc</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.close()}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
    )}       
};

module.exports = NavBar