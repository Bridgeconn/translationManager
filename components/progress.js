const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const Nav = require('react-bootstrap/lib/Nav');
const ProgressBar = require('react-bootstrap/lib/ProgressBar');
const Label = require('react-bootstrap/lib/Label');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const progressfile = ('./static/progress.json');
const booksfile = ('./static/books_progress.json');

class Progressbar extends React.Component {
  render() {
	var progressdata = JSON.parse(fs.readFileSync(progressfile, 'utf8'));
    var bookdata = JSON.parse(fs.readFileSync(booksfile, 'utf8'));
    this.state = { label:progressdata, books: bookdata };
    console.log(this.state.label.Team1);
    return (
    	<div className="container fluid" style={{ marginLeft: '90px' }}>
	        <Grid>
			    <Row className="show-grid">
				  	<h4>Team 1</h4>
			      	<Col sm={2} md={2}>Unit 
   					  	<Col sm={12} md={12}>{this.state.books.books.book1}&nbsp;50</Col>
  			  			<Col sm={12} md={12} style={{ marginTop: '20px' }}>{this.state.books.books.book3}&nbsp;27</Col>
					</Col>
			      	<Col sm={10} md={10}>Stage 1 -{this.state.label.Team1.milestone1}
			      	<ProgressBar>
					    <ProgressBar  bsStyle="success" now={this.state.label.Team1.milestone1genesiscompleted} key={1} label={`${this.state.label.Team1.milestone1genesiscompleted}%`}/>
					    <ProgressBar bsStyle="warning" now={this.state.label.Team1.milestone1genesisassigned} key={2} label={`${this.state.label.Team1.milestone1genesisassigned}%`}/>
					    <ProgressBar active bsStyle="info" now={this.state.label.Team1.milestone1genesisunassigned} key={3} label={`${this.state.label.Team1.milestone1genesisunassigned}%`}/>
				    </ProgressBar>
				    <ProgressBar>
			      	    <ProgressBar active bsStyle="warning" now={this.state.label.Team1.milestone1leviticuscompleted} key={4} label={`${this.state.label.Team1.milestone1leviticuscompleted}%`}/> 
					    <ProgressBar bsStyle="success" now={this.state.label.Team1.milestone1leviticusassigned} key={5} label={`${this.state.label.Team1.milestone1leviticusassigned}%`}/>
   					    <ProgressBar active bsStyle="info" now={this.state.label.Team1.milestone1leviticusunassigned} key={6} label={`${this.state.label.Team1.milestone1leviticusunassigned}%`}/> 	
					  </ProgressBar>
					</Col>
  			      	
				    <Col sm={3} md={9}>
				  	</Col>
			    </Row>

			     <Row className="show-grid">
	  			  	<h4>Team 2</h4>
			      	<Col sm={2} md={2}>Unit 
   					  	<Col sm={12} md={12}>{this.state.books.books.book1}&nbsp; 50</Col>
  			  			<Col sm={12} md={12} style={{ marginTop: '20px' }}>{this.state.books.books.book3}&nbsp; 27</Col>
					</Col>
					<Col sm={10} md={10}>Stage 2 - {this.state.label.Team2.milestone2}
  			      	<ProgressBar>
					    <ProgressBar  bsStyle="success" now={this.state.label.Team2.milestone2genesiscompleted} key={7} label={`${this.state.label.Team2.milestone2genesiscompleted}%`}/>
					    <ProgressBar bsStyle="warning" now={this.state.label.Team2.milestone2genesisassigned} key={8} label={`${this.state.label.Team2.milestone2genesisassigned}%`}/>
					    <ProgressBar active bsStyle="info" now={this.state.label.Team2.milestone2genesisunassigned} key={9} label={`${this.state.label.Team2.milestone2genesisunassigned}%`}/>
				    </ProgressBar> 
				    <ProgressBar>
			      	    <ProgressBar active bsStyle="warning" now={this.state.label.Team1.milestone1leviticuscompleted} key={11} label={`${this.state.label.Team2.milestone2leviticuscompleted}%`}/> 
					    <ProgressBar bsStyle="success" now={this.state.label.Team1.milestone1leviticusassigned} key={12} label={`${this.state.label.Team2.milestone2leviticusassigned}%`}/>
   					    <ProgressBar active bsStyle="info" now={this.state.label.Team1.milestone1leviticusunassigned} key={13} label={`${this.state.label.Team2.milestone2leviticusunassigned}%`}/> 	
					  </ProgressBar>
  			        </Col>
				    <Col sm={3} md={9}>
				  	</Col>
			    </Row>
			</Grid>
        </div>
    )}       
};

module.exports = Progressbar