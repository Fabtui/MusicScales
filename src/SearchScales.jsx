import React, {Component} from 'react'
import {NOTES, SCALES_LIST_ARRAY} from './data'
import './stylesheets/search.css'


export class SearchScales extends React.Component {
  constructor (props) {
    super (props)
  }

  MakeAllScales(selectedNotes) {
    const allKeys = []
    selectedNotes.forEach(selectedNote => {
     allKeys.push(selectedNotes.map(x =>
      x - selectedNote
      ));
    });
    const mutatedAllKeys = []
    allKeys.forEach(notes =>
      mutatedAllKeys.push(notes.map(note => {if(note < 0){return note + 12} else return note}).sort(function(a, b){return a - b;})))
    return mutatedAllKeys;
  }

  FindScale(allScales, scalesList) {

  }

  render () {
    const AllScales = this.MakeAllScales(this.props.selectedNotes);
    this.FindScale(AllScales, SCALES_LIST_ARRAY)
    return <div>
    </div>
  }
}
