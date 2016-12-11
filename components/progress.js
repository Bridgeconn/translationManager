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
			      	<Col sm={3} md={2}>Unit 
   					  	<Col sm={12} md={12}>{books.books.book1}&nbsp;{books.chapters.genesis}</Col>
  			  			<Col sm={12} md={12} style={{ marginTop: '20px' }}>{books.books.book2}&nbsp;{books.chapters.exodus}</Col>
					</Col>
			      	<Col sm={3} md={3}>Stage 1
			      	    <ProgressBar bsStyle="success" now={label.Team1.Genesiscompleted} key={1} label={`${label.Team1.Genesiscompleted}%`}/> 
					    <ProgressBar bsStyle="success" now={label.Team1.Exoduscompleted} key={2} label={`${label.Team1.Exoduscompleted}%`}/> 	
					</Col>
  			      	<Col sm={3} md={3}>Stage 2
	  			      	<ProgressBar now={label.Team1.Genesisassigned} key={3} label={`${label.Team1.Genesisassigned}%`}/>
	 					<ProgressBar now={label.Team1.Exodusassigned} key={4} label={`${label.Team1.Exodusassigned}%`}/>
  			        </Col>
			        <Col sm={3} md={3}>Stage 3
			      		<ProgressBar active bsStyle="info" now={label.Team1.Genesisunassigned} key={5} label={`${label.Team1.Genesisunassigned}%`}/>
					    <ProgressBar active bsStyle="info" now={label.Team1.Exodusunassigned} key={6} label={`${label.Team1.Exodusunassigned}%`}/>
				    </Col>
				    <Col sm={3} md={9}>
				  	</Col>
			    </Row>

			     <Row className="show-grid">
	  			  	<h4>Team 2</h4>
			      	<Col sm={3} md={2}>Unit 
   					  	<Col sm={12} md={12}>{books.books.book3}&nbsp;{books.chapters.genesis}</Col>
  			  			<Col sm={12} md={12} style={{ marginTop: '20px' }}>{books.books.book4}&nbsp;{books.chapters.genesis}</Col>
					</Col>
			      	<Col sm={3} md={3}>Stage 1
			      	    <ProgressBar bsStyle="success" now={label.Team2.Leviticuscompleted} key={1} label={`${label.Team2.Leviticuscompleted}%`}/> 
					    <ProgressBar bsStyle="success" now={label.Team2.Deutronomycompleted} key={2} label={`${label.Team2.Deutronomycompleted}%`}/> 	
					</Col>
  			      	<Col sm={3} md={3}>Stage 2
	  			      	<ProgressBar now={label.Team2.Leviticusassigned} key={3} label={`${label.Team2.Leviticusassigned}%`}/>
	 					<ProgressBar now={label.Team2.Deutronomyassigned} key={4} label={`${label.Team2.Deutronomyassigned}%`}/>
  			        </Col>
			        <Col sm={3} md={3}>Stage 3
			      		<ProgressBar active bsStyle="info" now={label.Team2.Leviticusunassigned} key={5} label={`${label.Team2.Leviticusunassigned}%`}/>
					    <ProgressBar active bsStyle="info" now={label.Team2.Deutronomyunassigned} key={6} label={`${label.Team2.Deutronomyunassigned}%`}/>
				    </Col>
				    <Col sm={3} md={9}>
				  	</Col>
			    </Row>
			</Grid>
        </div>
    )}       
};

module.exports = Progressbar