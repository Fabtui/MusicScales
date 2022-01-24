import React, {Component} from 'react'
import './stylesheets/dropdown.css'

class ScaleDropdownItems extends React.Component {
  constructor (props) {
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.onChange(e.target.id)
  }

  render () {
    return <li><a className="dropdown-item" id={this.props.index} href="#" onClick={this.handleClick}>{this.props.scale}</a></li>
  }
}

export class ScaleDropDown extends React.Component {
  constructor (props) {
    super (props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (index) {
    this.props.onChange(index)
  }

  render () {
    const items = []
    this.props.scales.forEach((scale, index) => {
      items.push(<ScaleDropdownItems key={index} index={index} scale={scale} onChange={this.handleChange}/>)
    })
      return <div className='note-selector'>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {this.props.selected_scale}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {items}
        </ul>
      </div>
    </div>
  }
}
