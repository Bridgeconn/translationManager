const React = require('react');
const style = require("./Style");
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const Nav = require('react-bootstrap/lib/Nav');
const ProgressBar = require('react-bootstrap/lib/ProgressBar');
const Button = require('react-bootstrap/lib/Button');
const Table = require('react-bootstrap/lib/Table');
const Label = require('react-bootstrap/lib/Label');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const PageHeader = require("react-bootstrap/lib/PageHeader");
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
		var chaptersdata = JSON.parse(fs.readFileSync(chapterfile, 'utf8'));
		var projects = {}
		assignmentdata.forEach(function(assignment) {
			var project = assignment.Project, book = assignment.Book,
				milestone = assignment.Milestones, chapter = assignment.Chapters,
				completed = assignment.isCompleted == true
			function empty(item) { return item === undefined }
			function initObject(item) { if (empty(item)) item = {}; return item }
			function initArray(item) { if (empty(item)) item = []; return item }
			projects[project] = initObject(projects[project])
			projects[project][book] = initObject(projects[project][book])
			projects[project][book][milestone] = initObject(projects[project][book][milestone])
			projects[project][book][milestone].completed = initArray(projects[project][book][milestone].completed)
			if (completed) projects[project][book][milestone].completed.push(chapter)
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
		<Table responsive striped bordered condensed hover key={index}>
			<thead>
				<ProjectMilestoneGroup projectName={projectName} project={projects[projectName]} />
			</thead>
			<BookGroup projectName={projectName} books={projects[projectName]} />
		</Table>
	)
	return (
		<div style={{ marginLeft: '100px' }}><h2>View Projects Progress</h2>
		{bookGroups}</div>
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
			if (complete[milestoneName] === undefined) complete[milestoneName] = 0
			complete[milestoneName] += project[bookName][milestoneName].completed.length
		})
	})
	var progress = {}
	var milestoneNames = Object.keys(complete)
	milestoneNames.forEach(function(milestoneName) {
		var percent = 0, completed = complete[milestoneName], totalChaptersInBible = 1189
		percent = Math.round(completed / totalChaptersInBible * 1000)/10
		progress[milestoneName] = percent
	})

	const progressGroup = milestoneNames.map((milestoneName,index) =>
		<th key={index} id={milestoneName} style={style.milestoneName}>
			<span>{milestoneName}</span>
			<ProgressBar style={style.purpleProgressBar} bsClass="purpleProgressBar" active now={progress[milestoneName]} label={`${progress[milestoneName]}%`} key={index} />
		</th>
	)
	return (
		<tr>
			<th style={style.projectName}>{projectName}</th>
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
		percent = Math.round(completed / total * 1000)/10
		return percent
	}

	const progressGroup = milestoneNames.map((milestoneName,index) =>
		<td key={index} headers={milestoneName} style={style.progressBarContainer}>
			<span style={style.circleGreen}>{milestones[milestoneName].completed.length}</span>
			<ProgressBar style={style.greenProgressBar} bsClass="greenProgressBar" now={completed(milestoneName)} label={`${completed(milestoneName)}%`} key={index}></ProgressBar>
			<span style={style.percent}>{`${completed(milestoneName)}%`}</span>
		</td>	
	)

	return (
		<tr>
			<td style={style.bookTitle}><span>{bookName}</span><span style={style.circleGrey}>{chaptersdata[bookName]}</span></td>
			{progressGroup}
		</tr>
	)
}

module.exports = Progressbar
