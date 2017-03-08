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
	}

  handleInputChange(key, e) {
    let newState = this.state
    newState[key] = e.target.value
    this.setState(newState)
  }

  handleSubmit(e) {
    let that = this
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
	}

  render() {
		let that = this
		let newState = this.state
		const fields = this.props.fields.map(function(field) {
			let formField
			console.log(field)
			switch(field.type) {
				case 'SimpleSelect':
					formField = <SimpleSelect placeholder={field.placeholder} value={that.state[field.key]} options={field.options}
						onValueChange={ function(value) { newState[field.key] = value; that.setState(newState) } }
						disabled={field.blocked !== undefined && that.state[field.blocked] === undefined}
					/>
					break
				case 'DatePicker':
					formField = <DatePicker selected={that.state.startDate} selectsStart  startDate={that.state[field.startKey]}
						endDate={that.state[field.endKey]} onChange={that.handleInputChange.bind(that, field.key)}
					/>
					break
				default:
					formField = <FormControl type={field.type} placeholder={field.placeholder} value={field.default}
            onChange={that.handleInputChange.bind(that, field.key)}
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
        <Button onClick={() => this.handleSubmit()}>Save</Button>
      </Form>
    )
  }
}

module.exports = CleanForm
