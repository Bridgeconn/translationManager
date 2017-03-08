const React = require('react')
const Form = require('react-bootstrap/lib/Form')
const FormGroup = require('react-bootstrap/lib/FormGroup')
const FormControl = require('react-bootstrap/lib/FormControl')
const ControlLabel = require('react-bootstrap/lib/ControlLabel')
const Col = require('react-bootstrap/lib/Col')
const Button = require('react-bootstrap/lib/Button')
const ReactSelectize = require('react-selectize');
const SimpleSelect = ReactSelectize.SimpleSelect;
const MultiSelect = ReactSelectize.MultiSelect;
const DatePicker = require('react-datepicker');

const fs = require('fs')

class CleanForm extends React.Component {
	constructor(props) {
    super(props)
    this.state = {}

		let that = this
		this.actions = {
			handleSubmit: function(e) {
				fs.readFile(that.props.filename, (err, data) => {
					if (err) throw err
					let filedata = JSON.parse(data)
					filedata.push(that.state)
					fs.writeFile(that.props.filename, JSON.stringify(filedata), function(err){
						if (err) throw err
						console.log('The "data to append" was appended to file!')
						that.props.callback()
					})
					that.setState({})
				})
			},
			onChange: function(key, option, callback) {
				let newState = that.state
				newState[key] = option
				that.setState(newState)
				if (typeof callback != "undefined") {
					callback(option.value)
				}
			}
		}
	}


  render() {
		let that = this
		const fields = this.props.fields.map(function(field) {

			// this section abstracts filtering based on another key as filter
			let options
			if (field.options !== undefined && field.options.constructor === Array) {
				options = field.options
			} else {
				let _options = field.options
				let optionsKey
				if (field.optionsKey !== undefined) {
					optionsKey = that.state[field.optionsKey]
					if (optionsKey !== undefined) {
						_options = field.options[optionsKey]
					}
				}
				if (_options === undefined || optionsKey === undefined) _options = []
				options = _options.map(function(option) {
					return { label: option, value: option}
				})
			}

			let formField
			switch(field.type) {
				case 'SimpleSelect':
					let value
					if (that.state[field.key] !== undefined) {
						value = { label: that.state[field.key], value: that.state[field.key] }
					}
					formField = <SimpleSelect placeholder={field.placeholder} value={ value } options={options}
						onValueChange={ function(option){ that.actions.onChange(field.key, option.value, field.callback) }}
						disabled={field.blocked !== undefined && that.state[field.blocked] === undefined}
					/>
					break
				case 'DatePicker':
					formField = <DatePicker selected={that.state.startDate} selectsStart  startDate={that.state[field.startKey]}
						endDate={that.state[field.endKey]} onChange={ function(option){ that.actions.onChange(field.key, option, field.callback) }}
					/>
					break
				default:
					formField = <FormControl type={field.type} placeholder={field.placeholder} value={field.default}
            onChange={ function(option){ that.actions.onChange(field.key, option, field.callback) }}
					/>
			}
			return (
				<FormGroup key={field.key} controlId="formInlineName">
					<Col componentClass={ControlLabel} sm={3}>
						{field.label}
					</Col>
					<Col sm={9}>
						{formField}
					</Col>
				</FormGroup>
			)
    })

    return (
      <Form horizontal>
        {fields}
        <Button onClick={() => that.actions.handleSubmit()}>Save</Button>
      </Form>
    )
  }
}

module.exports = CleanForm
