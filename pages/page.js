const React = require('react')
const ReactDOM = require('react-dom')

const style = require('../components/style')
const NavBar = require('../components/navbar')
const Sidebar = require('../components/sidebar')

const CleanModal = require('../components/cleanModal')

const Projects = require('./projects')
const Milestones = require('./milestones')
const Teams = require('./teams')
const Assignments = require('./assignments')
const Progress = require('./progress')

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'projects',
      modal: { show: false, title: '', content: ''}
    }
    var that = this
    this.actions = {
      showPage: function(page) {
        that.setState({currentPage: page})
      },
      openModal: function(title, content) {
        let newState = that.state
        newState.modal = { show: true, title: title, content: content }
        that.setState(newState)
      },
      closeModal: function() {
        if (that.state.modal.show) {
          let newState = that.state
          newState.modal.show = false
          that.setState(newState)
        }
      }
    }
  }

  render() {
    const modal = this.state.modal

    var currentPage
    switch(this.state.currentPage) {
      case 'Projects':
        currentPage = <Projects actions={this.actions} />
        break
      case 'Milestones':
        currentPage = <Milestones actions={this.actions} />
        break
      case 'Teams':
        currentPage = <Teams actions={this.actions} />
        break
      case 'Assignments':
        currentPage = <Assignments actions={this.actions} />
        break
      case 'Progress':
        currentPage = <Progress actions={this.actions} />
        break
      default:
        currentPage = <Projects actions={this.actions} />
    }

    return (
      <div>
        <NavBar actions={this.actions} />
        <Sidebar actions={this.actions} />
        <CleanModal actions={this.actions} show={modal.show} title={modal.title} content={modal.content} />
        <div className="container fluid" style={{ paddingLeft: '90px' }}>
          {currentPage}
        </div>
      </div>
    )
  }
}

module.exports = Page
