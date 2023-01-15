import React from 'react'
import {NOTES, SCALES_LIST_ARRAY, SCALES_LIST} from './data'
import './stylesheets/search.css'

function DisplayScalesFound (scale) {
    return <div key={scale[0]+scale[1]} className='search-scale-result mt-4'>
      <h1>{scale[0]} {scale[1]}</h1>
    </div>
}

export class SearchScales extends React.Component {
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

  FindScale(allScales, scalesList, selectedNotes) {
    const scalesFound = []
    allScales.forEach((scale, index) => {
      scalesList.forEach(scalelist => {
        if (JSON.stringify(scalelist) === JSON.stringify(scale)) {
          const keyNote = NOTES[selectedNotes[index]];
          const scaleFound = Object.keys(SCALES_LIST).find(key => JSON.stringify(SCALES_LIST[key]) === JSON.stringify(scale))
          scalesFound.push([keyNote, scaleFound])
        }
      });
    })
    return scalesFound;
  }

  render () {
    const allScales = this.MakeAllScales(this.props.selectedNotes);
    const scalesFound = this.FindScale(allScales, SCALES_LIST_ARRAY, this.props.selectedNotes)
    const rows = []
    scalesFound.forEach(scale => {
      rows.push(DisplayScalesFound(scale))
    })
    let Noresult = rows.length === 0 ? true : false
    return <div>
      {rows}
      {Noresult && <div className='mt-4'><h1>No scale found</h1></div>}
    </div>
  }
}
