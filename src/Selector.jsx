import React, {Component} from 'react'
import './stylesheets/selector.css'
import {NoteDropDown} from './NoteDropdown'
import {ScaleDropDown} from './ScaleDropDown'
import {Scale} from './Scale'

const NOTES = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
const SCALES = ["Major", "Minor"]
const SCALES_LIST = {
  Major: [0, 2, 4, 5, 7, 9, 11],
  Minor: [0, 2, 3, 5, 7, 8, 10]
}

export class Selector extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selected_note_index: 0,
      selected_scale: SCALES_LIST["Major"],
      selected_scale_name: SCALES[0]
    }
    this.handleNoteChange = this.handleNoteChange.bind(this)
    this.handleScaleChange = this.handleScaleChange.bind(this)
  }

  handleNoteChange (note) {
    this.setState({selected_note_index: note})
  }

  handleScaleChange (scale) {
    this.setState({selected_scale_name: SCALES[scale]})
  }

  render () {
    const selected_note = NOTES[this.state.selected_note_index]
    return <div className='note-selector'>
      <NoteDropDown selected_note={selected_note} notes={NOTES} onChange={this.handleNoteChange}/>
      <ScaleDropDown selected_scale={this.state.selected_scale_name} scales={SCALES} onChange={this.handleScaleChange}/>
      <Scale notes={NOTES} selected_note_index={this.state.selected_note_index} scale_intervals={SCALES_LIST[this.state.selected_scale_name]}/>
    </div>
  }
}
