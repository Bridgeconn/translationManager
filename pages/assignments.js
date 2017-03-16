const React = require('react')
const PageHeader = require('react-bootstrap/lib/PageHeader')
const Button = require('react-bootstrap/lib/Button')
const style = require('../components/Style')
const CleanForm = require('../components/cleanForm')
const CleanTable = require('../components/cleanTable')

const fs = require('fs');
const moment = require('moment');
const projectsFile = ('./static/projects.json');
const booksFile = ('./static/books.json');
const chaptersFile = ('./static/chapters_bookwise.json');
const milestonesFile = ('./static/milestones.json');
const teamsFile = ('./static/teams.json');

const filename = ('./static/assignment.json');

class Assignments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: JSON.parse(fs.readFileSync(filename, 'utf8')),
      book: undefined
    }

    this.projectsData = JSON.parse(fs.readFileSync(projectsFile, 'utf8'))
    this.booksData = JSON.parse(fs.readFileSync(booksFile, 'utf8'))
    this.chaptersData = JSON.parse(fs.readFileSync(chaptersFile, 'utf8'))
    this.milestonesData = JSON.parse(fs.readFileSync(milestonesFile, 'utf8'))
    this.teamsData = JSON.parse(fs.readFileSync(teamsFile, 'utf8'))

    let that = this
    this.actions = {
      reload: function() {
        let newState = {
          data: JSON.parse(fs.readFileSync(filename, 'utf8'))
        }
        that.setState(newState)
        props.actions.closeModal()
      }
    }
  }

  render() {
    let that = this
    const projectOptions = this.projectsData.map(function(project) {
      return { label: project.name, value: project.name }
    })
    const bookOptions = this.booksData.map(function(book) {
      return { label: book, value: book}
    })
    const chapterOptions = (!!this.state.book ? this.chaptersData[this.state.book.label] : []).map(function(chapter) {
      return { label: chapter, value: chapter}
    })
    const milestoneOptions = this.milestonesData.map(function(milestone) {
      return { label: milestone.name, value: milestone.name}
    })
    const teamOptions = this.teamsData.map(function(team) {
      return { label: team.name, value: team.name}
    })

    const fields = [
        { key: 'id', label: 'id', type: 'integer', hidden: true, isKey: true, default: this.state.data[this.state.data.length-1].id+1 },
        { key: 'project', label: 'Project', type: 'SimpleSelect', validation: 'text', placeholder: 'Select Project', options: projectOptions, sort: true},
        { key: 'book', label: 'Book', type: 'SimpleSelect', validation: 'text', placeholder: 'Select Book', options: bookOptions, blocked: 'project', sort: true},
        { key: 'chapter', label: 'Chapter', type: 'SimpleSelect', validation: 'integer', placeholder: 'Select Chapter', options: this.chaptersData, optionsKey: 'book', blocked: 'book', sort: true, filter: 'book'},
        { key: 'milestone', label: 'Milestone', type: 'SimpleSelect', validation: 'text', placeholder: 'Select Milestone', options: milestoneOptions, blocked: 'chapter', sort: true},
        { key: 'team', label: 'Team', type: 'SimpleSelect', validation: 'character', placeholder: 'Select Team', options: teamOptions, blocked: 'milestone', sort: true},
        { key: 'startDate', label: 'Start Date', type: 'DatePicker', selects: 'start', startKey: 'startDate', endKey: 'endDate', sort: true },
        { key: 'endDate', label: 'End Date', type: 'DatePickerEnd', selects: 'end', startKey: 'startDate', endKey: 'endDate', sort: true },
        { key: 'isCompleted', label: 'Completed', type: 'boolean', align: 'center' },
        { key: 'completedDate', label: 'Completed Date', hidden: true, type: 'DatePickerEnd', startKey: 'endDate', endKey: 'completedDate', sort: true }
    ]
    const form = <CleanForm actions={this.actions} state={this.state} fields={fields} filename={filename} callback={this.actions.reload} />
    return(
      <div>
        <PageHeader>
          Assignments
          <Button bsStyle="success" style={style.addButton} onClick={() => this.props.actions.openModal('New Assignment', form)}>
            Add
          </Button>
        </PageHeader>
        <CleanTable fields={fields} filename={filename} callback={this.actions.reload} data={this.state.data} callback={this.actions.reload} />
      </div>
    )
  }
}

module.exports = Assignments