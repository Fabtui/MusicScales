import React from 'react'
import { NOTES, GUITAR_TUNING, SCALES_LIST, INTERVALS_NAMES } from './data'
import './stylesheets/guitar_neck.css'

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
    const ordered_notes = [...NOTES.slice(selected_note_index), ...NOTES.slice(0, selected_note_index)]
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
      rows.push(<NotesRows selectedNotes={this.props.selectedNotes} onChange={this.handleClick} key={key} guitarString={guitarString}/>)
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
