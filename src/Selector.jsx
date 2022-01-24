import React, {Component} from 'react'
import './stylesheets/selector.css'
import {NoteDropDown} from './NoteDropdown'
import {ScaleDropDown} from './ScaleDropDown'
import {Scale} from './Scale'
import {ScaleTable} from './ScaleTable'
import { NOTES } from './data'
import { SCALES } from './data'
import { SCALES_LIST } from './data'

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
    const selected_scale_notes = Scale ({notes: NOTES, selected_note_index: this.state.selected_note_index, scale_intervals: this.state.selected_scale})
    const selected_note = NOTES[this.state.selected_note_index]
    return <div className='container'>
      <div className="selectors">
        <NoteDropDown className="note-selector" selected_note={selected_note} notes={NOTES} onChange={this.handleNoteChange}/>
        <ScaleDropDown className="scale-selector" selected_scale={this.state.selected_scale_name} scales={SCALES} onChange={this.handleScaleChange}/>
      </div>
      {/* <Scale notes={NOTES} selected_note_index={this.state.selected_note_index} scale_intervals={SCALES_LIST[this.state.selected_scale_name]}/> */}
      <ScaleTable notes={NOTES} selected_scale_notes={selected_scale_notes} selected_note={selected_note} selected_note_index={this.state.selected_note_index}/>
    </div>
  }
}
