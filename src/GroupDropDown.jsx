import React, {Component} from "react"

class CreateRadioButton extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      checked: true
    }
  this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(e) {
    this.setState({
      checked: e.target.checked
    })
    this.props.onChange(this.state.checked, this.props.group)
  }

 render () {
   return (
      <div className="form-check form-switch group-radio-button-item">
      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={this.state.checked} onChange={this.handleCheck}></input>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{this.props.group}</label>
      </div>
    )
  }
}

export class GroupDropDown extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedGroups: [...this.props.groups]
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (checked, groupName) {
    if (!checked) {
      const selectedGroups = [...this.state.selectedGroups, groupName]
      this.setState({
        selectedGroups: selectedGroups
      })
      this.props.onChange(selectedGroups)
    } else {
      const selectedGroups = this.state.selectedGroups
      selectedGroups.splice(selectedGroups.indexOf(groupName), 1)
      this.setState({
        selectedGroups: selectedGroups
      })
      this.props.onChange(selectedGroups)
    }
  }

  render () {
    const items = []
    this.props.groups.forEach((group, index) => {
      items.push(<CreateRadioButton key={index} index={index} group={group} onChange={this.handleChange}/>)
    })
    return <div>
      <div className="groups-radio-buttons">
        {items}
      </div>
    </div>
  }
  }
