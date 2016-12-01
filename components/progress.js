const React = require('react');
const bootstrap = require('react-bootstrap');
const Nav = require('react-bootstrap/lib/Nav');
const ProgressBar = require('react-bootstrap/lib/ProgressBar');
const Label = require('react-bootstrap/lib/Label');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const progressData = require('../static/progress.json');
const booksData = require('../static/books.json')


class Progressbar extends React.Component {
  render() {
  	const label= progressData; 
    const books = booksData;
    console.log(books);
    return (
    	<div className="container fluid" style={{ marginLeft: '90px' }}>
	        <Grid>
			    <Row className="show-grid">
				  <h4>Team 1</h4>
			      <Col sm={3} md={2}>Unit </Col>
			      <Col sm={3} md={3}>Stage 1</Col>
  			      <Col sm={3} md={3}>Stage 2</Col>
			      <Col sm={3} md={4}>Stage 3</Col>
				    <Col sm={3} md={2}>{books.books.book1}&nbsp;{books.chapters.genesis}</Col>
				    <Col sm={3} md={9}>
				    	<ProgressBar>
						    <ProgressBar bsStyle="success" now={label.Team1.completed} key={1} label={`${label.Team1.completed}%`}/>
						    <ProgressBar now={label.Team1.assigned} key={2} label={`${label.Team1.assigned}%`}/>
						    <ProgressBar active bsStyle="info" now={label.Team1.unassigned} key={3} label={`${label.Team1.unassigned}%`}/>
		  				</ProgressBar>
		  			</Col>
		  			<Col sm={3} md={2}>{books.books.book2}&nbsp;{books.chapters.exodus}</Col>
				    <Col sm={3} md={9}>
			    	<ProgressBar>
					    <ProgressBar bsStyle="success" now={label.Team1.completed} key={1} label={`${label.Team1.completed}%`}/>
					    <ProgressBar now={label.Team1.assigned} key={2} label={`${label.Team1.assigned}%`}/>
					    <ProgressBar active bsStyle="info" now={label.Team1.unassigned} key={3} label={`${label.Team1.unassigned}%`}/>
	  				</ProgressBar>
		  			</Col>
			    </Row>
			    <Row className="show-grid">
	  			  <h4>Team 2</h4>
			      <Col sm={3} md={2}>Unit </Col>
			      <Col sm={3} md={3}>Stage 1</Col>
  			      <Col sm={3} md={3}>Stage 2</Col>
			      <Col sm={3} md={4}>Stage 3</Col>
				    <Col sm={3} md={2}>{books.books.book3}&nbsp;{books.chapters.genesis}</Col>
				    <Col sm={3} md={9}>
		  			<ProgressBar>
					    <ProgressBar bsStyle="success" now={label.Team2.completed} key={1} label={`${label.Team2.completed}%`}/>
					    <ProgressBar now={label.Team2.assigned} key={2} label={`${label.Team2.assigned}%`}/>
					    <ProgressBar active bsStyle="info" now={label.Team2.unassigned} key={3} label={`${label.Team2.unassigned}%`}/>
		  			</ProgressBar>
	  				</Col>
	  				<Col sm={3} md={2}>{books.books.book4}&nbsp;{books.chapters.genesis}</Col>
				    <Col sm={3} md={9}>
			  			<ProgressBar>
						    <ProgressBar bsStyle="success" now={label.Team2.completed} key={1} label={`${label.Team2.completed}%`}/>
						    <ProgressBar now={label.Team2.assigned} key={2} label={`${label.Team2.assigned}%`}/>
						    <ProgressBar active bsStyle="info" now={label.Team2.unassigned} key={3} label={`${label.Team2.unassigned}%`}/>
			  			</ProgressBar>
	  				</Col>
			    </Row>
			</Grid>
        </div>
    )}       
};

module.exports = Progressbar