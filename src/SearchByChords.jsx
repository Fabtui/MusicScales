import React, {Component} from 'react'
import './stylesheets/search_by_chords.css'
import { ChordsDropDown } from './ChordsDropDown'
import { SearchToFretApi } from './SearchToFretApi'
import { CHORD_SHAPE_INTERVALS, CHORD_SHAPE, NOTES } from './data'
import { Link } from "react-router-dom";
import {Selector} from './Selector'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
const lightbulb = <FontAwesomeIcon icon={faLightbulb} />

export class SearchByChords extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      selectedChords: [],
      selectedNotes: [],
      selected_note_index: null,
      selected_scale_name: null,
      scale_selected: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(mutated_chords_object) {
    const mutatedChords = mutated_chords_object['mutatedChords'];
    const filteredMutatedNotes = mutated_chords_object['filteredMutatedNotes'];
    this.setState({
      selectedChords: mutatedChords,
      selectedNotes: filteredMutatedNotes
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
  
  render () {
    const selected_note_name = NOTES[this.state.selected_note_index]
    const ApiNotes = this.state.selectedNotes.map(note => NOTES.indexOf(note))
    console.log(this.state.selectedNotes);
    return <div className='search-container container mt-4'>
      <div className='left-side'>
        <ChordsDropDown onChange={this.handleChange}/>
        <SearchToFretApi selectedNotes={ApiNotes} onClick={this.handleClick}/>
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


// C Maj  0 4 7    C en premier index == 0
// D Min  2 5 9    D en deuxieme index == +2
// E Min  4 7 11
// F Maj  5 9 0
// G Maj

// 0 2 4 5 7 9 11 -> index 0 Maj => C Maj
