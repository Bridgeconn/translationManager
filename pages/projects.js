const React = require('react')
const PageHeader = require('react-bootstrap/lib/PageHeader')
const Button = require('react-bootstrap/lib/Button')

const CleanForm = require('../components/cleanForm')
const CleanTable = require('../components/cleanTable')
const style = require('../components/Style')

const fs = require('fs')
const filename = ('./static/projects.json')

class Projects extends React.Component {
	constructor(props) {
    super(props)

    this.state = {
			data: JSON.parse(fs.readFileSync(filename, 'utf8'))
		}

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
		const fields = [
			{ key: 'name', label: 'Name', type: 'text', placeholder: 'Enter the Project Name', isKey: true },
			{ key: 'language', label: 'Language', type: 'text', placeholder: 'Enter the Project Language' },
			{ key: 'organization', label: 'Organization', type: 'text', placeholder: 'Enter the Project Organization' },
			{ key: 'version', label: 'Version', type: 'text', placeholder: 'Enter the Version Name' }
		]
		const form = <CleanForm fields={fields} filename={filename} callback={this.actions.reload} />
    return  (
			<div>
				<PageHeader>
					Projects
					<Button bsStyle="success" style={style.addButton} onClick={()=> this.props.actions.openModal('New Project', form)}>
						Add
					</Button>
				</PageHeader>
				<CleanTable fields={fields} filename={filename} callback={this.actions.reload} data={this.state.data} />
			</div>
    )
	}
}

module.exports = Projects
