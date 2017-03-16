const React = require('react')
const bootstrap = require('react-bootstrap')
const ReactBSTable = require('react-bootstrap-table');
const BootstrapTable = ReactBSTable.BootstrapTable;
const TableHeaderColumn = ReactBSTable.TableHeaderColumn;
const Tooltip = require('react-bootstrap/lib/Tooltip')
const OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
const moment = require('moment');
const fs = require('fs')

class CleanTable extends React.Component {
	constructor(props) {
    super(props)
    this.state = {}
            //this.createCustomDeleteButton = this.createCustomDeleteButton.bind(this);

		let keyField
		props.fields.forEach(function(field) {
			if (field.isKey) keyField = field.key
		})

		let that = this
		this.actions = {
			writeFile: function(filename, filedata, callback) {
				fs.writeFile(filename, JSON.stringify(filedata), function(err){
					if (err) throw err
					callback()
				})
			},
			onDeleteRow: function(key) {
				fs.readFile(props.filename, (err, data) => {
					var filedata = JSON.parse(data)
					for (var n=0; n < filedata.length; n++) {
						if (filedata[n][keyField] == key) {
							var removedObject = filedata.splice(n,1)
							break
						}
					}
					if (err) throw err
					that.actions.writeFile(props.filename, filedata, props.callback)
				})
			},
			afterSaveCell: function(row, cellName, cellValue) {
				fs.readFile(props.filename, (err, data) => {
					var filedata = JSON.parse(data)
					for (var n=0; n < filedata.length; n++) {
						if (filedata[n][keyField] == row[keyField]) {
							filedata[n][cellName] = cellValue
							break
						}
					}
					if (err) throw err
					that.actions.writeFile(props.filename, filedata, props.callback)
				})
			},
			//Character Validation Check - Checks if length < 5 and cant be left blank.
			characterValidator: function(value) {
				const response = { isValid: true, notification: { type: 'success', msg: '', title: '' } };
				if (!value) {
					response.isValid = false;
					response.notification.type = 'error';
					response.notification.msg = 'Value must be inserted';
					response.notification.title = 'Requested Value';
				} else if (value.length < 5) {
					response.isValid = false;
					response.notification.type = 'error';
					response.notification.msg = 'Value must have 5+ characters';
					response.notification.title = 'Invalid Value';
				}
				return response;
			},
			//Integer Validation Check - Checks if Number is entered and cant be left blank.
			integerValidator: function(value) {
				const nan = isNaN(parseInt(value, 10));
				if (nan) {
					return 'Must be a integer!';
				}
				else if (!value) {
					response.isValid = false;
					response.notification.type = 'error';
					response.notification.msg = 'Value must be inserted';
					response.notification.title = 'Requested Value';
				}
				return true;
			},

			handleCheckboxChange:function (row,cell) {
				fs.readFile(props.filename, (err, data) => {
					var filedata = JSON.parse(data)
					for (var n=0; n < filedata.length; n++) {
						if (filedata[n][keyField] == row[keyField]) {
							filedata[n].isCompleted = !filedata[n].isCompleted 
							filedata[n].completedDate = moment(); 
							break
						}
					}
					if (err) throw err
					that.actions.writeFile(props.filename, filedata, props.callback)
				})
			},
		}
	}
			

	render() {

		let that = this
		const cellEdit = {
			mode: 'dbclick',
			blurToSave: true,
			afterSaveCell: this.actions.afterSaveCell
		}
		const selectRow = {
			mode: 'radio',
			clickToSelect: true
		}
		const options = {
			onDeleteRow: this.actions.onDeleteRow
		}
		const tooltip = (
			<Tooltip id="tooltip">Double click the cell to edit</Tooltip>
		)

		function activeFormatter(cell, row, enumObject, index) {
			return (
				<input type='checkbox' title="Click to edit" key={index} onChange={that.actions.handleCheckboxChange.bind(this,row,cell)} checked={row.isCompleted} active={ cell } />
			)
		}  

		const headers = that.props.fields.map(function(field) {
			let editable = {}
			switch(field.validation) {
				case 'text':
				editable = { validator: that.actions.characterValidator }
				break
				case 'integer':
				editable = { validator: that.actions.integerValidator }
				break
				case 'boolean':
				editable = false
				break
				default:
				editable = {}
			}
			let dataFormat
			switch(field.type) {
				case 'boolean':
				dataFormat = activeFormatter,
				editable = false 
				break
				default:
				dataFormat = undefined
			}

			return (
				<TableHeaderColumn key={field.key} dataField={field.key} hidden={field.hidden} isKey={field.isKey}
					editable={editable} dataSort={field.sort} dataAlign={field.align} dataFormat={dataFormat}>
					{field.label}
				</TableHeaderColumn>
			)
		})

		return (
			<BootstrapTable responsive striped data={that.props.data} cellEdit={cellEdit} selectRow={selectRow} options={options} headerStyle={ { background: '#D5DBE4' } } deleteRow>
				{headers}
			</BootstrapTable>
		)
	}

}

module.exports = CleanTable
