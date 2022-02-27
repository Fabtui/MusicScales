import './stylesheets/search_by_notes.css'
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import {SearchCheckboxes} from './SearchCheckboxes'
import {Selector} from './Selector'
import { SearchToFretApi } from './SearchToFretApi'
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
      scale_selected: false
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
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


  render () {
    const selected_note_name = NOTES[this.state.selected_note_index]
    return <div className='search-container container mt-4'>
      <div className='left-side'>
        <SearchCheckboxes onChange={this.handleChange}></SearchCheckboxes>
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
