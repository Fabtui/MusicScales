import React from 'react'
import { NOTES, GUITAR_TUNING, SCALES_LIST, INTERVALS_NAMES } from './data'
import './stylesheets/guitar_neck.css'
import { TuningDropDown } from './TuningDropDown'

class NotesRows extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedNotes: this.props.selectedNotes
    })
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.onChange(e.target.innerHTML)
    this.setState ({
      selectedNotes: [...this.props.selectedNotes, NOTES.indexOf(e)]
    })
  }

  render () {
    const selected_note_index = this.props.guitarString
    const ordered_notes = [...NOTES.slice(selected_note_index), ...NOTES.slice(0, selected_note_index), NOTES[selected_note_index]]
    const rows = []
    const selectedNote = this.props.selectedNotes
    ordered_notes.forEach((note, index) => {
      const style = selectedNote.includes(NOTES.indexOf(note)) ? 'note-selected' : ''
      const key = `${note}-${index}`
      rows.push(<th className={style} key={key} onClick={this.handleClick}>{note}</th>)
    })
    return <tbody>
          <tr>
            {rows}
          </tr>
        </tbody>
  }
}

export class GuitarNeckBasic extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selected_tuning_name: 'E'
    })
    this.handleClick = this.handleClick.bind(this)
    this.handleTuningChange = this.handleTuningChange.bind(this)
  }

  handleClick(e) {
    this.props.onChange(e);
  }

  handleTuningChange(selected_tuning_name) {
    this.setState ({
      selected_tuning_name: selected_tuning_name
    })
  }

  render () {
    let rows = []
    const guitarStrings = GUITAR_TUNING[this.state.selected_tuning_name]
    guitarStrings.forEach((guitarString, index) => {
      const key = `${guitarString}-${index}`
      rows.push(<NotesRows selected_tuning_name={this.state.selected_tuning_name} selectedNotes={this.props.selectedNotes} onChange={this.handleClick} key={key} guitarString={guitarString}/>)
    });
    return <div className='basic-guitar-neck-container'>
          <div className='tuning-selector mb-2'>
            <h4>Tuning </h4>
            <TuningDropDown className="scale-selector" tunings={GUITAR_TUNING} selected_tuning_name={this.state.selected_tuning_name} onChange={this.handleTuningChange}/>
          </div>
          <table className="table guitar-neck-table basic-guitar-neck">
            {rows}
          <tbody>
          <tr className='fretboard-marks'>
            <th></th>
            <th></th>
            <th></th>
            <th>o</th>
            <th></th>
            <th>o</th>
            <th></th>
            <th>o</th>
            <th></th>
            <th>o</th>
            <th></th>
            <th></th>
            <th>oo</th>
          </tr>
          </tbody>
          </table>
    </div>
  }
}
