import React, { Component } from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import { ApiFingering } from './ApiFingering'
import './stylesheets/chords_search.css'
import { EVERY_CHORDS, EVERY_CHORDS_DETAILS } from './data/chords'
import { NOTES, CHORDS_INTERVALS, CHORDS_INTERVALS_SHAPES } from './data'

function uniq(value, index, self) {
  return self.indexOf(value) === index;
}

function MakeChordDetailsRow ({index, note, degree, shape}) {
  const scaleDegree = (index > 2 && degree === '2' ) ? '9 / 2' : degree;
  return (
    <tr key={index}>
      <th scope="row">{note}</th>
      <td>{shape}</td>
      <td>{scaleDegree}</td>
    </tr>
  )
}

function MakeChordDetails (chord) {
  const key = chord.split(' ')[0]
  const chordShape = chord.split(' ')[1]
  const notes = EVERY_CHORDS[key][chordShape].split(' ')
  const notesIntervals = (notes.map(note => NOTES.indexOf(note)))
  const notesIntervalsMutated = notesIntervals.map(interval => interval - notesIntervals[0])
  const notesIntervalsMutatedExtend = notesIntervalsMutated.map(interval => interval < 0 ? interval + 12 : interval)

  const degrees = notesIntervalsMutatedExtend.map(interval => CHORDS_INTERVALS[interval])
  degrees[0] = 'R'

  const shapes = notesIntervalsMutated.map((interval, index) => CHORDS_INTERVALS_SHAPES[- (notesIntervalsMutated[index -1] - interval)] )
  shapes[0] = null

  const rows = []
  notes.forEach((note, index) => {
    rows.push(MakeChordDetailsRow({index: index, note: note, degree: degrees[index], shape: shapes[index]}))
  });
  return rows
}

function ChordExplanations (chordShape) {
  return EVERY_CHORDS_DETAILS[chordShape]
}

class ChordDetails extends React.Component {
  render () {
    if (this.props.chord.length === 0) {
      return <div className='no-chord-selected mt-4'><h5 className='text-center'>Select a chord in results to see details</h5></div>
    } else {
      const rows = MakeChordDetails(this.props.chord)
      const special = ChordExplanations(this.props.chord.split(' ')[1])
      return  <React.Fragment>
              <h2 className='mt-4 text-center'>{this.props.chord}</h2>
              <table className="table mt-4">
                <thead>
                  <tr>
                    <th scope="col">Note</th>
                    <th scope="col">Interval</th>
                    <th scope="col">Scale Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table>
              <div className='special-details'>
                {special}
              </div>
            </React.Fragment>
    }
  }
}

export class ChordsSearch extends React.Component {
  constructor (props) {
    super(props)
    this.state = ({
      selectedNotes: [],
      selectedNeckNotes: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null},
      selectedChord: [],
      fretboardMode: true
    })
    this.handleChange = this.handleChange.bind(this)
    this.handleNeckClick = this.handleNeckClick.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(selectedNotesArray) {
    selectedNotesArray.sort(function(a, b){return a - b;});
    this.setState({
      selectedNotes: selectedNotesArray
    })
  }

  handleNeckClick(note, string) {
    const selectedNotes = this.state.selectedNeckNotes
    if (selectedNotes[string] === note) {
      selectedNotes[string] = null
    } else {
      selectedNotes[string] = note
    }
    this.setState ({
      selectedNeckNotes: selectedNotes
    })
  }

  handleCheck() {
    this.setState ({
      fretboardMode: !this.state.fretboardMode
    })
  }

  handleRemoveClick () {
    this.setState ({
      selectedNotes: []
    })
  }

  handleClick (chord) {
    ApiFingering(chord)
    this.setState ({
      selectedChord: chord
    })
  }

  render () {
    let selectedNotes = null
    if (this.state.fretboardMode) {
      const selectedNotesNames = Object.values(this.state.selectedNeckNotes).filter(function(val) { return val !== null; }).filter(uniq)
      selectedNotes = selectedNotesNames.map(note => NOTES.indexOf(note))
    } else {
      selectedNotes = this.state.selectedNotes
    }
    const noteLabelStyle = this.state.fretboardMode ? 'not-selected' : 'selected'
    const fretboardLabelStyle = this.state.fretboardMode ? 'selected' : 'not-selected'
    const apiResultStyle = this.state.fretboardMode ? 'mini-display' : 'max-display'
    return <div className='container chords-search-result'>
            <div className='notes-checkbox-container'>
              <label className={fretboardLabelStyle} id='notes-checkbox-label' htmlFor="notes-checkbox">FRETBOARD</label>
              <label className="switch">
                <input type="checkbox" className="switch" id="notes-checkbox" name="notes-checkbox" checked={!this.state.fretboardMode} onChange={this.handleCheck}></input>
                <span className="slider round"></span>
              </label>
              <label className={noteLabelStyle} id='notes-checkbox-label' htmlFor="notes-checkbox">NOTES</label>
            </div>
          <div className='search-checkboxes'>
            {!this.state.fretboardMode && <SearchCheckboxes onClick={this.handleRemoveClick} selectedNotes={this.state.selectedNotes} onChange={this.handleChange}></SearchCheckboxes>}
          </div>
          <div className='search-container'>
            <div className='search-note-left-side'>
                <div className='chords-search-result'>
                {this.state.fretboardMode && <GuitarNeckBasic mutliselect={false} selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
                <SearchChordsToFretApi style={apiResultStyle} selectedNotes={selectedNotes} onClick={this.handleClick} fretboardMode={this.state.fretboardMode}/>
                </div>
              </div>
              <div className='search-note-left-side mb-4'>
                <ChordDetails chord={this.state.selectedChord}/>
                <div id='chord-chart'></div>
              </div>
            </div>
        </div>
  }
}
