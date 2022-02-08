import React, {Component} from 'react'
import {NOTES, SCALES_LIST_ARRAY, SCALES_LIST} from './data'
import './stylesheets/search.css'

  function DisplayScalesFound () {
    console.log(this.props);
    return <div>

    </div>
  }

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
    const scalesFound = []
    allScales.forEach(scale => {
      scalesList.forEach(scalelist => {
        if (JSON.stringify(scalelist) === JSON.stringify(scale)) {
          const key = Object.keys(SCALES_LIST).find(key => JSON.stringify(SCALES_LIST[key]) === JSON.stringify(scale))
          scalesFound.push(key)
        }
      });
    })
    console.log(scalesFound);
  }

  render () {
    const AllScales = this.MakeAllScales(this.props.selectedNotes);
    const scalesFound = this.FindScale(AllScales, SCALES_LIST_ARRAY)
    return <div>
    </div>
  }
}
