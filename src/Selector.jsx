import './stylesheets/selector.css'
import React, {Component} from 'react'
import {NoteDropDown} from './NoteDropdown'
import {ScaleDropDown} from './ScaleDropDown'
import {ScaleNotes} from './Scale'
import {ScaleDisplay} from './Scale'
import {ScaleTable} from './ScaleTable'
import { NOTES, SCALES, SCALES_LIST } from './data'
import { Title } from './Title'
import { Intervals } from './Intervals'
import { Triads } from './Triads'
import { NeckTable } from './NeckTable'

export class Selector extends Component {
  constructor (props) {
    super (props)
    this.state = {
      selected_note_index: 0,
      selected_scale: SCALES_LIST["Major"],
      selected_scale_name: SCALES[0],
      selected_scale_notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
    }
    this.handleNoteChange = this.handleNoteChange.bind(this)
    this.handleScaleChange = this.handleScaleChange.bind(this)
  }

  handleNoteChange (note) {
    this.setState({
      selected_note_index: note,
    })
  }

  handleScaleChange (scale_index) {
    const scale_name = SCALES[scale_index]
    this.setState({
      selected_scale_name: scale_name,
      selected_scale: SCALES_LIST[scale_name],
    })
  }

  render () {
    const selected_scale_notes =  ScaleNotes({notes: NOTES, selected_note_index: this.state.selected_note_index, scale_intervals: this.state.selected_scale})
    const selected_note = NOTES[this.state.selected_note_index]
    return <div className='container'>
      <Title selected_note={selected_note} selected_scale_name={this.state.selected_scale_name}/>
      <div className="selectors">
        <NoteDropDown className="note-selector" selected_note={selected_note} notes={NOTES} onChange={this.handleNoteChange}/>
        <ScaleDropDown className="scale-selector" selected_scale={this.state.selected_scale_name} scales={SCALES} onChange={this.handleScaleChange}/>
      </div>
      <div className="scale-display">
        <ScaleDisplay notes={NOTES} selected_note_index={this.state.selected_note_index} scale_intervals={SCALES_LIST[this.state.selected_scale_name]} />
        <Intervals selected_scale={this.state.selected_scale}/>
      </div>
      <div className="scale-table">
        <ScaleTable notes={NOTES} selected_scale_notes={selected_scale_notes} selected_note={selected_note} selected_note_index={this.state.selected_note_index} selected_scale_notes={selected_scale_notes}/>
      </div>
      <div className="triads-container">
        <Triads selected_scale_notes={selected_scale_notes} selected_scale={this.state.selected_scale}/>
      </div>
        <NeckTable selected_scale_notes={selected_scale_notes} selected_note_index={this.state.selected_note_index} selected_scale={this.state.selected_scale} />
    </div>
  }
}
