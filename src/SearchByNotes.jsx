import './stylesheets/search_by_notes.css'
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import {SearchCheckboxes} from './SearchCheckboxes'
import {Selector} from './Selector'
import { SearchToFretApi } from './SearchToFretApi'
import { GuitarNeckBasic } from './GuitarNeckBasic';
import { NOTES } from './data'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
const lightbulb = <FontAwesomeIcon icon={faLightbulb} />

export class SearchByNotes extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedNotes: [],
      selected_note_index: 0,
      selected_tuning: [7, 2, 10, 5, 0, 7],
      scale_selected: false,
      fretboardDisplay: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(e) {
    let selectedNote = e.split(' ')[0]
    // transform b in #
    if (selectedNote.length === 2 && selectedNote[1] === 'b') {
      selectedNote = NOTES.indexOf(selectedNote[0]) - 1
      if (selectedNote === -1) { selectedNote = 11 }
    } else {
      selectedNote = NOTES.indexOf(selectedNote)
    }
    const selectedScaleName = e.split(' ').length === 3 ? `${e.split(' ')[1]} ${e.split(' ')[2]}` : `${e.split(' ')[1]}`
    this.setState({
      selected_note_index: selectedNote,
      selected_scale_name: selectedScaleName,
      scale_selected: true
    })
  }

  linkOnMouseEnter() {
    const hint = document.querySelector('#right-side-result-hint')
    hint.style.opacity = '1'
  }

  linkOnMouseLeave() {
    const hint = document.querySelector('#right-side-result-hint')
    hint.style.opacity = '0'
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
    const selected_note_name = NOTES[this.state.selected_note_index]
    const apiResultStyle = this.state.fretboardDisplay ? 'mini-display' : 'max-display'
    console.log(this.state.selected_note_index, this.state.selected_scale_name);
    return <div className='container'>
      <div className='search-checkboxes'>
        <SearchCheckboxes onClick={this.handleRemoveClick} selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>
      </div>
      <div className='search-container mt-4'>
        <div className='search-note-left-side'>
          <div className='fretboard-display-checkbox'>
            <input onChange={this.handleCheck} className="form-check-input" checked={this.state.fretboardDisplay} type="checkbox" value="" id="flexCheckDefault" name='display-fretboard'/>
            <label htmlFor='display-fretboard'>Fretboard</label>
          </div>
        {this.state.fretboardDisplay && <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
        <SearchToFretApi style={apiResultStyle} selectedNotes={this.state.selectedNotes} onClick={this.handleClick}/>
          {/* <SearchScales selectedNotes={this.state.selectedNotes}/> */}
        </div>
        <div className='search-note-right-side'>
          {!this.state.scale_selected && <div id='right-side-hint'><h2 className='mt-4'>Select a scale in results</h2></div>}
          {this.state.scale_selected && <div id='right-side-result-hint'>{lightbulb} Click to see more details</div>}
          {this.state.scale_selected && <Link onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} id='right-side-link' to="/MyScaleResult" state={{selected_note_index: this.state.selected_note_index, selected_scale_name: this.state.selected_scale_name}}>{selected_note_name} {this.state.selected_scale_name}</Link>}
          {this.state.scale_selected && <Selector selected_note_index={this.state.selected_note_index} selected_scale_name={this.state.selected_scale_name}/>}
        </div>
      </div>
    </div>
  }
}
