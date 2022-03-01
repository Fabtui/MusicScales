import React from 'react'
import { NOTES, GUITAR_TUNING, SCALES_LIST, INTERVALS_NAMES } from './data'
import './stylesheets/guitar_neck.css'

class NotesRows extends React.Component {
  constructor (props) {
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.props.onChange(e.target.innerHTML)
  }

  render () {
    const selected_scale_notes = SCALES_LIST['Major']
    const selected_note_index = this.props.guitarString
    const ordered_notes = [...NOTES.slice(selected_note_index), ...NOTES.slice(0, selected_note_index)]
    const rows = []
    const ordered_notes_extend = ordered_notes.push(ordered_notes[0])
    ordered_notes.forEach((note, index) => {
      const key = `${note}-${index}`
      rows.push(<th key={key} onClick={this.handleClick}>{note}</th>)
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
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.onChange(e);
  }

  render () {
    let rows = []
    const guitarStrings = GUITAR_TUNING['E']
    guitarStrings.forEach((guitarString, index) => {
      const key = `${guitarString}-${index}`
      rows.push(<NotesRows onChange={this.handleClick} key={key} guitarString={guitarString}/>)
    });
    return <table className="table guitar-neck-table basic-guitar-neck">
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
  }
}
