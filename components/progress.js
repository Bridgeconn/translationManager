const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const Nav = require('react-bootstrap/lib/Nav');
const ProgressBar = require('react-bootstrap/lib/ProgressBar');
const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const Label = require('react-bootstrap/lib/Label');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const assignmentfile = ('./static/assignment.json');
const milestonefile = ('./static/milestones.json');
const chapterfile = ('./static/chapters.json');
const resultfile = ('./static/result.json');
const _ = require('lodash');

class Progressbar extends React.Component {
	constructor(props) {
    super(props);
		var assignmentdata = JSON.parse(fs.readFileSync(assignmentfile, 'utf8'));
		var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));

		var projects = {}
		assignmentdata.forEach(function(assignment) {
			var project = assignment.Project, book = assignment.Book,
					milestone = assignment.Milestones, chapter = assignment.Chapters,
					completed = assignment.isCompleted === 'Done'
			function empty(item) { return item === undefined }
			function initObject(item) { if (empty(item)) item = {}; return item }
			function initArray(item) { if (empty(item)) item = []; return item }
			projects[project] = initObject(projects[project])
			projects[project][book] = initObject(projects[project][book])
			projects[project][book][milestone] = initObject(projects[project][book][milestone])
			projects[project][book][milestone].completed = initArray(projects[project][book][milestone].completed)
			if (completed) projects[project][book][milestone].completed.push(chapter)
			console.log(projects)
		})
		this.state = {projects: projects}
	}

	render() {
		return (
			<ProjectsGroup projects={this.state.projects} />
		)
	}
};

var ProjectsGroup = function(props) {
	var projects = props.projects
	var projectNames = Object.keys(projects)

	const bookGroups = projectNames.map((projectName, index) =>
		<table style={{ width: '100%' }} key={index}>
			<tbody>
				<ProjectMilestoneGroup projectName={projectName} project={projects[projectName]} />
			</tbody>
			<BookGroup projectName={projectName} books={projects[projectName]} />
		</table>
	)
	return (
		<div style={{ marginLeft: '100px' }}>{bookGroups}</div>
	)
}

var ProjectMilestoneGroup = function(props) {
	var projectName= props.projectName
	var project = props.project

	var complete = {}
	var bookNames = Object.keys(project)
	bookNames.forEach(function(bookName) {
		var book = project[bookName]
		var _milestoneNames = Object.keys(book)
		_milestoneNames.forEach(function(milestoneName) {
			complete[milestoneName] += project[bookName][milestoneName].completed.length
		})
	})
	var progress = {}
	var milestoneNames = Object.keys(complete)
	milestoneNames.forEach(function(milestoneName) {
		var percent = 0, completed = 0, totalChaptersInBible = 1189
		percent = completed / totalChaptersInBible
		progress[milestoneName] = percent
	})

	const progressGroup = milestoneNames.map((milestoneName,index) =>
		<td key={index}>
			<span>{milestoneName}</span>
			<ProgressBar bsStyle="success" now={progress[milestoneName]} label={`${progress[milestoneName]}%`} key={index} />
		</td>
	)
	return (
		<tr>
			<td>{projectName}</td>
			{progressGroup}
		</tr>
	)
}

var BookGroup = function(props) {
	var projectName= props.projectName
	var books = props.books
	var bookNames = Object.keys(books)
	const milestoneGroups = bookNames.map((bookName, index) =>
		<BookMilestoneGroup projectName={projectName} bookName={bookName} milestones={books[bookName]} key={index} />
	)
	return (
		<tbody style={{ paddingLeft: '100px' }}>{milestoneGroups}</tbody>
	)
}

var BookMilestoneGroup = function(props) {
	var projectName= props.projectName
	var bookName = props.bookName
	var milestones = props.milestones
	var milestoneNames = Object.keys(milestones)
	var chaptersdata = JSON.parse(fs.readFileSync(chapterfile, 'utf8'));

	function completed(milestoneName) {
		var percent = 0
		var completed = milestones[milestoneName].completed.length
		var total = chaptersdata[bookName]
		percent = completed / total * 100
		return percent
	}

	const progressGroup = milestoneNames.map((milestoneName,index) =>
		<td key={index}>
			<ProgressBar bsStyle="success" now={completed(milestoneName)} label={`${completed(milestoneName)}%`} key={index} />
		</td>
	)
	return (
		<tr>
			<td>{bookName}</td>
			{progressGroup}
		</tr>
	)
}

module.exports = Progressbar
