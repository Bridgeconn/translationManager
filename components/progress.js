const React = require('react');
const bootstrap = require('react-bootstrap');
const fs = require('fs');
const Nav = require('react-bootstrap/lib/Nav');
const ProgressBar = require('react-bootstrap/lib/ProgressBar');
const Button = require('react-bootstrap/lib/Button');
const Label = require('react-bootstrap/lib/Label');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const progressfile = ('./static/progress.json');
const booksfile = ('./static/books_progress.json');
const assignmentfile = ('./static/assignment.json');
const milestonefile = ('./static/milestones.json');
const chapterfile = ('./static/chapters.json');
const progfile = ('./static/progress_screen.json');
const outputfile = ('./static/output.json');
const resultfile = ('./static/result.json');
const _ = require('lodash');

class Progressbar extends React.Component {
	constructor(props) {
        super(props);
			    var resultdata = JSON.parse(fs.readFileSync(resultfile, 'utf8'));

	    //var bookdata = JSON.parse(fs.readFileSync(booksfile, 'utf8'));
	    //var assignmentdata = JSON.parse(fs.readFileSync(assignmentfile, 'utf8'));
		//var prog = JSON.parse(fs.readFileSync(progfile, 'utf8'));
	    //var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));
	   	this.state = { label:resultdata };
	}

	componentWillMount() {
		var assignmentdata = JSON.parse(fs.readFileSync(assignmentfile, 'utf8'));
	    var milestonedata = JSON.parse(fs.readFileSync(milestonefile, 'utf8'));	
   	    var chaptersdata = JSON.parse(fs.readFileSync(chapterfile, 'utf8'));	    
    
		//console.log(assignmentdata);
		var result1 = assignmentdata.map(function(a) {return a.Project;}); 
    	//console.log(result1);
   		var result = 
   			_.chain(assignmentdata)
		    .groupBy("Project")
		    .toPairs()
		    .map(function (currentItem) {
		        return _.zipObject(["Project", "details"], currentItem);
		    })
		    .value();
		

		//console.log(result);
		var finalOutput=[];
		for (var n = 0 ; n < result.length ; n++) {
			var output = [];
			var doneAssignments = _.filter(result[n].details,  { 'isCompleted': 'Done' });
			var milestones = _.map(result[n].details, 'Milestones');
			//console.log(doneAssignments);
			//console.log(milestones);

			for (var i = 0 ; i < doneAssignments.length ; i++){
				var temp = {};
				//console.log(doneAssignments[i].Book+'====================='+doneAssignments[i].Milestones);
				if (typeof doneAssignments[i].Milestones !== 'undefined') {

				temp['BookName'] = doneAssignments[i].Book;
				temp['Milestone'] = doneAssignments[i].Milestones;
				var book = doneAssignments[i].Book;
				var bookChapters = chaptersdata[book];
				temp['progress'] = 1/bookChapters*100;
				output.push(temp);
				//console.log(output);
			}		
		}
		
			finalOutput[result[n].Project] = output;
			console.log(finalOutput);
	}
		/*fs.writeFileSync(outputfile, JSON.stringify(obj), function(err){
            if (err) throw err;
            console.log('The "data to append" was appended to PROGRESS file!');
        });*/
		//var data = JSON.parse(fs.readFileSync(outputfile, 'utf8'));

}
	render() {
		   var progressComponents = this.state.label.map(function(item){
		   	//console.log(item);
            return <div><Grid>
				    <Row className="show-grid">
				      	<Col sm={2} md={2}> 
						  	<Col sm={12} md={12} style={{ marginTop: '15px' }}><h4>{item.Project}&nbsp;</h4></Col>
						  	<Col sm={12} md={12} style={{ marginTop: '15px' }}>{item.details[0].Book}&nbsp;</Col>
						</Col>
				      	<Col sm={10} md={5}>{item.details[0].Milestones}
					    <ProgressBar active bsStyle="success" now={item.details[0].ProjectProgress} key={9} label={`${item.details[0].ProjectProgress}%`}></ProgressBar>					 
						<ProgressBar bsStyle="success" now={item.details[0].PercentProgress} key={1} label={`${item.details[0].PercentProgress}%`}></ProgressBar>
				       </Col>
				       <Col sm={10} md={5}>{item.details[0].Milestones}
					    <ProgressBar active bsStyle="success" now={item.details[0].ProjectProgress} key={9} label={`${item.details[0].ProjectProgress}%`}></ProgressBar>					 
						<ProgressBar bsStyle="success" now={item.details[0].PercentProgress} key={1} label={`${item.details[0].PercentProgress}%`}></ProgressBar>
				       </Col>
				    </Row>
					</Grid></div>;
        	})
		return (
			<div className="container fluid" style={{ marginLeft: '90px' }}>
				<div>{progressComponents}</div>
		    </div>
		)
	}       
};

module.exports = Progressbar