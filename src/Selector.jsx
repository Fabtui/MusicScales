import React, {Component} from 'react'
import './stylesheets/selector.css'
import {DropDown} from './Dropdown'

const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
const maj_scale = [0, 2, 4, 5, 7, 9, 11]

function Scale ({notes, selected_note_index, scale_intervals}) {
  const ordered_notes = [...NOTES.slice(selected_note_index), ...NOTES.slice(0, selected_note_index)]
  let scale_notes = []
  scale_intervals.forEach(scale_interval => {
    scale_notes.push(ordered_notes[scale_interval])
  })
  return scale_notes
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
      <DropDown selected_note={selected_note} notes={NOTES} onChange={this.handleNoteChange}/>
      <Scale notes={NOTES} selected_note_index={this.state.selected_note_index} scale_intervals={maj_scale}/>
    </div>
  }
}
