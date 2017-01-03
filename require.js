const React = require('react');
const ReactDOM = require('react-dom');
const NavBar = require('./components/navbar.js');
const Sidebar = require('./components/sidebar.js');

class Assign extends React.Component {
  render() {
    return (
        <div><NavBar /><Sidebar /></div>
    );
  }
};

// ========================================

ReactDOM.render(<Assign />, document.getElementById('container'));
