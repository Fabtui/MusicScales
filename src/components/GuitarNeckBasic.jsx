import React from 'react'
import { NOTES, GUITAR_TUNING } from '../data/data'
import '../stylesheets/guitar_neck.css'
import { TuningDropDown } from './TuningDropDown'

class MultiSelectNotesRows extends React.Component {
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

class SingleSelectNotesRows extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedNote: null
    })
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const noteName = e.target.id.split(',')[0]
    const string = e.target.id.split(',')[1]
    this.props.onChange(noteName, string)
    if (this.state.selectedNote === e.target.id) {
      this.setState ({
        selectedNote: null
      })
    } else {
      this.setState ({
        selectedNote: e.target.id
      })
    }
  }

  render () {
    const selected_note_index = this.props.guitarString
    const ordered_notes = [...NOTES.slice(selected_note_index), ...NOTES.slice(0, selected_note_index), NOTES[selected_note_index]]
    const rows = []
    ordered_notes.forEach((note, index) => {
      const key = `${note}-${index}`
      const id = `${note},${this.props.guitar_string_num},${index}`
      const style = this.state.selectedNote === id ? 'note-selected' : ''
      if (id === this.state.selectedNote) {
        rows.push(<th id={id} className={style} key={key} onClick={this.handleClick}>{note}</th>)
      } else {
        rows.push(<th id={id} className={style} key={key} onClick={this.handleClick}>O</th>)
      }
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

  handleClick(note, string) {
    this.props.onChange(note, string);
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
      if (this.props.mutliselect) {
        rows.push(<MultiSelectNotesRows selected_tuning_name={this.state.selected_tuning_name} selectedNotes={this.props.selectedNotes} onChange={this.handleClick} key={key} guitarString={guitarString}/>)
      } else {
        rows.push(<SingleSelectNotesRows guitar_string_num={index + 1} selected_tuning_name={this.state.selected_tuning_name} selectedNotes={this.props.selectedNotes} onChange={this.handleClick} key={key} guitarString={guitarString}/>)
      }
    });
    return <div className='basic-guitar-neck-container'>
          <div className='tuning-selector mb-2'>
            <h4>Tuning </h4>
            <TuningDropDown className="scale-selector" tunings={GUITAR_TUNING} selected_tuning_name={this.state.selected_tuning_name} onChange={this.handleTuningChange}/>
          </div>
          <table className="table guitar-neck-table basic-guitar-neck">
            {rows}
          </table>
          <table className='table fretboard-marks-table'>
            <tbody>
              <tr className='fretboard-marks'>
                <th>x</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
              </tr>
            </tbody>
          </table>
    </div>
  }
}
