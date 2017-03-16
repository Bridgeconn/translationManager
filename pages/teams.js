const React = require('react')
const Button = require('react-bootstrap/lib/Button')
const PageHeader = require('react-bootstrap/lib/PageHeader')

const CleanForm = require('../components/cleanForm')
const CleanTable = require('../components/cleanTable')
const style = require('../components/Style')
const _ = require('lodash')
const fs = require('fs')
const filename = ('./static/teams.json')

class Teams extends React.Component {
	constructor(props) {
		super(props)
		var data = JSON.parse(fs.readFileSync(filename, 'utf8'))
		this.state = {
			data: data
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
			{ key: 'name', label: 'Name', type: 'text', placeholder: 'Enter the Name', isKey: true },
			{ key: 'members', label: 'Members', type: 'text', placeholder: 'Enter the Names of the Team Members' }
		]
		const form = <CleanForm fields={fields} filename={filename} callback={this.actions.reload} />
    return  (
			<div>
				<PageHeader>
          			Teams
					<Button bsStyle="success" style={style.addButton} onClick={()=> this.props.actions.openModal('New Milestone', form)}>
						Add
					</Button>
				</PageHeader>
				<CleanTable fields={fields} filename={filename} callback={this.actions.reload} data={this.state.data} callback={this.actions.reload} />
			</div>
    )
	}
}

module.exports = Teams
