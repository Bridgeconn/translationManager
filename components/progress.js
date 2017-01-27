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

   		var result = 
   			_.chain(assignmentdata)
		    .groupBy("Project")
		    .toPairs()
		    .map(function (currentItem) {
		        return _.zipObject(["Project", "details"], currentItem);
		    })
		    .value();

		var finalOutput=[];
		for (var n = 0 ; n < result.length ; n++) {
			var output = [];
			var doneAssignments = _.filter(result[n].details,  { 'isCompleted': 'Done' });

			for (var i = 0 ; i < doneAssignments.length ; i++){
				var temp = {};
				if (typeof doneAssignments[i].Milestones !== 'undefined') {
					temp['BookName'] = doneAssignments[i].Book;
					temp['Milestone'] = doneAssignments[i].Milestones;
					temp['Project'] = doneAssignments[i].Project;
					var book = doneAssignments[i].Book;
					var bookChapters = chaptersdata[book];
					temp['progress'] = 1/bookChapters*100;
					var z = (_.findIndex(output, { 'BookName': doneAssignments[i].Book , 'Milestone': doneAssignments[i].Milestones }));
					if( z > -1 ){
						output[z].progress = output[z].progress + 1/bookChapters*100;
					}else{
						output.push(temp);
					}	
				}
				var groups = _.groupBy(output, 'BookName');
			}
			finalOutput.push(output);
		}
		
		var arrProgress = [];
		var count = 0;
		finalOutput.forEach(
		    function outerFunc(value) { 
		    	value.forEach(	
			    	function innerFunc(item) { 
			    		arrProgress[count++] = item;
					}
				);				
			}
		);

		console.log(arrProgress);
		fs.writeFileSync(resultfile, JSON.stringify(arrProgress),'utf8');
                
		var resultdata = JSON.parse(fs.readFileSync(resultfile, 'utf8'));
		var projectData = _.uniqBy(resultdata, 'BookName');	
		this.state = { label: resultdata, projectLabel: projectData };
	}

	render() {
		    var progressComponents = this.state.label.map(function(item,i){
            return <div key={i}><Grid>
				    <Row className="show-grid">
				      	<Col sm={2} md={2}> 
						  	<Col sm={12} md={12} style={{ marginTop: '15px' }}><h4>{item.Project}&nbsp;</h4></Col>
						  	<Col sm={12} md={12} style={{ marginTop: '15px' }}>{item.BookName}&nbsp;</Col>
						</Col>
				      	<Col sm={10} md={5}>{item.Milestone}
						<ProgressBar bsStyle="success" now={item.progress} key={1} label={`${item.progress}%`}></ProgressBar>
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
