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
      selected_note_index: null,
      selected_scale_name: null,
      selected_scale_name: 'Major',
      selected_scale: [0, 2, 4, 5, 7, 9, 11],
      selected_note_index: 0,
      notes_displayed: true,
      selected_tuning: [7, 2, 10, 5, 0, 7],
      selected_scale_notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
      scale_selected: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleNeckClick = this.handleNeckClick.bind(this)
  }

  handleChange(selectedNotesArray) {
    selectedNotesArray.sort(function(a, b){return a - b;});
    this.setState({
      selectedNotes: selectedNotesArray
    })
  }

  handleClick(e) {
    const selected_note_index = NOTES.indexOf(e.split(' ')[0])
    const selected_scale_name = e.split(' ').length === 3 ? `${e.split(' ')[1]} ${e.split(' ')[2]}` : `${e.split(' ')[1]}`
    this.setState({
      selected_note_index: selected_note_index,
      selected_scale_name: selected_scale_name,
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
      return
    } else {
      const newSelectedNotes = [...this.state.selectedNotes, noteIndex]
      this.setState ({
        selectedNotes: newSelectedNotes
      })
    }
  }

  render () {
    const selected_note_name = NOTES[this.state.selected_note_index]
    return <div className='search-container container mt-4'>
      <SearchCheckboxes selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>
      <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>
      <div className='left-side'>
        <SearchToFretApi selectedNotes={this.state.selectedNotes} onClick={this.handleClick}/>
        {/* <SearchScales selectedNotes={this.state.selectedNotes}/> */}
      </div>
      <div className='right-side'>
        {!this.state.scale_selected && <div id='right-side-hint'><h2 className='mt-4'>Select a scale to preview it</h2></div>}
        {this.state.scale_selected && <div id='right-side-result-hint'>{lightbulb} Click to see more details</div>}
        {this.state.scale_selected && <Link onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} id='right-side-link' to="/MyScaleResult" state={{selected_note_index: this.state.selected_note_index, selected_scale_name: this.state.selected_scale_name}}>{selected_note_name} {this.state.selected_scale_name}</Link>}
        {this.state.scale_selected && <Selector selected_note_index={this.state.selected_note_index} selected_scale_name={this.state.selected_scale_name}/>}
      </div>
    </div>
  }
}
