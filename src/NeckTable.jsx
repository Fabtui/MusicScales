import React, {Component} from 'react'
import { GuitarNeck } from './GuitarNeck'
import { TuningDropDown } from './TuningDropDown'
import { GUITAR_TUNING, NOTES } from './data'
import { ScaleNotes } from './Scale'

export class NeckTable extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selected_tuning: GUITAR_TUNING["E"],
      selected_tuning_name: "E",
      selected_scale_notes: this.props.selected_scale_notes,
      notes_displayed: true
    }
    this.handleTuningChange = this.handleTuningChange.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleTuningChange(tuning) {
    this.setState({
      selected_tuning: GUITAR_TUNING[tuning],
      selected_tuning_name: tuning
    })
  }

  handleCheck(e) {
    this.setState({
      notes_displayed: e.target.checked
    })
  }

  render () {
    const selected_scale_notes = ScaleNotes({notes: NOTES, selected_note_index: this.props.selected_note_index, scale_intervals: this.props.selected_scale})
    return <div className="neck-table">
        <div className="tuning-select">
          <div className='notes-checkbox-container'>
            <input type="checkbox" id="notes-checkbox" name="notes-checkbox" checked={this.state.notes_displayed} onChange={this.handleCheck}></input>
            <label htmlFor="notes-checkbox">Notes</label>
          </div>
          <h4>Tuning selector: </h4>
          <TuningDropDown className="scale-selector" tunings={GUITAR_TUNING} selected_tuning_name={this.state.selected_tuning_name} selected_tuning={this.state.selected_tuning} onChange={this.handleTuningChange}/>
        </div>
        <GuitarNeck notes_displayed={this.state.notes_displayed} selected_note_index={this.props.selected_note_index} selected_scale={this.props.selected_scale} tuning={this.state.selected_tuning} selected_scale_notes={selected_scale_notes}/>
      </div>
  }
}
