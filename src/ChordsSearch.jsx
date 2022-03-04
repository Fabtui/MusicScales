import React, {Component} from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import { NOTES } from './data'

export class ChordsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      selectedNotes: [],
      fretboardDisplay: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleNeckClick = this.handleNeckClick.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleChange(selectedNotesArray) {
    selectedNotesArray.sort(function(a, b){return a - b;});
    this.setState({
      selectedNotes: selectedNotesArray
    })
  }

  handleNeckClick(e) {
    const noteIndex = NOTES.indexOf(e);
    const selectedNotes = this.state.selectedNotes;
    if (selectedNotes.includes(noteIndex)) {
      const index = selectedNotes.indexOf(noteIndex)
      selectedNotes.splice(index, 1)
      this.setState({
        selectedNotes: selectedNotes
      })
      return
    } else {
      const newSelectedNotes = [...this.state.selectedNotes, noteIndex]
      this.setState ({
        selectedNotes: newSelectedNotes
      })
    }
  }

  handleCheck() {
    this.setState ({
      fretboardDisplay: !this.state.fretboardDisplay
    })
  }

  handleRemoveClick () {
    this.setState ({
      selectedNotes: []
    })
  }

  render () {
    const apiResultStyle = this.state.fretboardDisplay ? 'mini-display' : 'max-display'
    return <div className='container'>
      <div className='search-checkboxes'>
        <SearchCheckboxes onClick={this.handleRemoveClick} selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>
      </div>
      <div className='fretboard-display-checkbox'>
        <input onChange={this.handleCheck} className="form-check-input" checked={this.state.fretboardDisplay} type="checkbox" value="" id="flexCheckDefault" name='display-fretboard'/>
        <label htmlFor='display-fretboard'>Fretboard</label>
      </div>
        {this.state.fretboardDisplay && <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
        <SearchChordsToFretApi style={apiResultStyle} selectedNotes={this.state.selectedNotes} onClick={this.handleClick}/>
    </div>
  }
}
