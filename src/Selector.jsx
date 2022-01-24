import React, {Component} from 'react'
import './stylesheets/clock.css'

const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

function DropdownItems ({note, index}) {
  return <li><a className="dropdown-item" id={index} href="#">{note}</a></li>
}

function DropDown ({notes}) {
  const items = []
  notes.forEach((note, index) => {
    items.push(<DropdownItems key={index} index={index} note={note}/>)
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


export class Selector extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selected_note: 0
    }
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  handleNoteChange (note) {
    this.setState({selected_note: note})
  }

  render () {
    return <div className='note-selector'>
      <DropDown notes={NOTES} onChange={this.handleNoteChange}/>
    </div>
  }
}
