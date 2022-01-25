import React, {Component} from 'react'
import './stylesheets/dropdown.css'

class ScaleDropdownItems extends React.Component {
  constructor (props) {
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onChange(e.target.text)
  }

  render () {
    return <li><a className="dropdown-item" id={this.props.index} href="#" onClick={this.handleClick}>{this.props.tuning}</a></li>
  }
}

export class TuningDropDown extends React.Component {
  constructor (props) {
    super (props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (index) {
    this.props.onChange(index)
  }

  render () {
    const tunings = Object.keys(this.props.tunings)
    const items = []
    tunings.forEach((tuning, index) => {
      items.push(<ScaleDropdownItems key={index} index={index} tuning={tuning} onChange={this.handleChange}/>)
    })
      return <div className='note-selector'>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownTuningButton" data-bs-toggle="dropdown" aria-expanded="false">
          {this.props.selected_tuning_name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {items}
        </ul>
      </div>
    </div>
  }
}
