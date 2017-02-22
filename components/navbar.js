const React = require('react');
const bootstrap = require('react-bootstrap');
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
                </Nav>
            </Navbar>
                  <div>
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Text in a modal</h4>
                <p></p>
                <hr />
                <h4>Overflowing text to show scroll behavior</h4>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
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