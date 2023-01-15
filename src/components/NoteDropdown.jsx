import React from 'react'
import '../stylesheets/dropdown.css'

class DropdownItems extends React.Component {
  constructor (props) {
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onChange(e.target.id)
  }

  render () {
    return <li><a className="dropdown-item" id={this.props.index} href="#" onClick={this.handleClick}>{this.props.note}</a></li>
  }
}

export class NoteDropDown extends React.Component {
  constructor (props) {
    super (props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (index) {
    this.props.onChange(index)
  }

  render () {
    const items = []
    this.props.notes.forEach((note, index) => {
      items.push(<DropdownItems key={index} index={index} note={note} onChange={this.handleChange}/>)
    })
      return <div className='selector-item'>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          {this.props.selected_note}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {items}
        </ul>
      </div>
    </div>
  }
}
