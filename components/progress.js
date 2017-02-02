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
					temp['Count'] = 1;
					var book = doneAssignments[i].Book;
					var bookChapters = chaptersdata[book];
					temp['progress'] = 1/bookChapters*100;
					var z = (_.findIndex(output, { 'BookName': doneAssignments[i].Book , 'Milestone': doneAssignments[i].Milestones }));
					if( z > -1 ){
						output[z].progress = output[z].progress + 1/bookChapters*100;
						output[z].Count = output[z].Count + 1;

					}else{
						output.push(temp);
					}	
				}

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

		for (var i = 0; i < arrProgress.length; i++) {
			var x = arrProgress.filter(function(value){ 
			return value.Milestone === arrProgress[i].Milestone && value.Project === arrProgress[i].Project }).length;
			if (arrProgress[i].Count > 1) {
				arrProgress[i].totalProgress = arrProgress[i].Count/1189*100;
			}else{
				arrProgress[i].totalProgress = x/1189*100;
			}
		}

		console.log(arrProgress);
		fs.writeFileSync(resultfile, JSON.stringify(arrProgress),'utf8');               
		var resultdata = JSON.parse(fs.readFileSync(resultfile, 'utf8'));
		var projectData = _.uniq(resultdata);
		console.log(projectData);
		var xyz =  _.uniqBy(projectData,'project');
		//var xyz = _.find(objects, _.matchesProperty('a', 4));
		this.state = { label: resultdata, projectLabel: xyz };
	}

	render() {
		    var progressComponents = this.state.label.map(function(item,i){
            
            return <div key={i}>
					<Table striped bordered condensed hover>
					    <thead>
					      <tr>
					        <th>Project</th>
					        <th>{item.Milestone}</th>
					      </tr>
					    </thead>
					    <tbody>
					      <tr>
					      	<td style={{ width: '350px' }}>{item.Project}</td>
					        <td><ProgressBar bsStyle="success" now={item.totalProgress} key={1} label={`${item.totalProgress}%`}></ProgressBar></td>
					      </tr>
					      <tr>
					      	<td style={{ width: '350px' }}>{item.BookName}</td>
					        <td><ProgressBar bsStyle="success" now={item.progress} key={1} label={`${item.progress}%`}></ProgressBar></td>
					      </tr>
					    </tbody>
					</Table>
					</div>;
				})   
    
				return (
			<div className="container fluid" style={{ marginLeft: '90px' }}>
				<Grid><Row className="show-grid"><h4><strong>Book Progress</strong></h4>
				<Col sm={6} md={12}>{progressComponents}</Col></Row></Grid>	
		    </div>
		)	
	}       
};

module.exports = Progressbar
