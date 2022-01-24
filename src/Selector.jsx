import React, {Component} from 'react'
import './stylesheets/clock.css'

const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

class DropdownItems extends React.Component {
  constructor (props) {
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.onChange(e.target.id)
  }

  render () {
    return <li><a className="dropdown-item" id={this.props.index} href="#" onClick={this.handleClick}>{this.props.note}</a></li>
  }
}

class DropDown extends React.Component {
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
      return <div className='note-selector'>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Note
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {items}
        </ul>
      </div>
    </div>
  }
}

export class Selector extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selected_note_index: 0
    }
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  handleNoteChange (note) {
    this.setState({selected_note_index: note})
  }

  render () {
    const selected_note = NOTES[this.state.selected_note_index]
    return <div className='note-selector'>
      <h1>{selected_note}</h1>
      <DropDown notes={NOTES} onChange={this.handleNoteChange}/>
    </div>
  }
}
