import React, { Component } from 'react'
import { SearchCheckboxes } from './SearchCheckboxes'
import { GuitarNeckBasic } from './GuitarNeckBasic'
import { SearchChordsToFretApi } from './SearchChordsToFretApi'
import './stylesheets/chords_search.css'
import { EVERY_CHORDS } from './data/chords'
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
  if (chordShape.includes('Power')) {
    return 'Power Chord: chord has no third (no m3 or 3), root and perfect fifth (5)'
  }
  if (chordShape.includes('sus2')) {
    return 'Suspended 2: chord has no third (no m3 or 3), major second (2) instead'
  }
  if (chordShape.includes('7sus4')) {
    return '7 Suspended 4: chord has no third (no m3 or 3), fourth (4) instead, chord is 7: added m7'
  }
  if (chordShape.includes('9sus4')) {
    return '9 Suspended 4: chord has no third (no m3 or 3), fourth (4) instead, chord is 9: chord 7 with added major second (9th)'
  }
  if (chordShape.includes('sus4')) {
    return 'Suspended 4: chord has no third (no m3 or 3), fourth (4) instead'
  }
  if (chordShape.includes('Major11')) {
    return 'Major 11: chord has major third (R + 3) chord is 11: chord 7 with added 4th (11th)'
  }
  if (chordShape.includes('Major9')) {
    return 'Major 9: chord has major third (R + 3), chord is 9: chord 7 with added major second (9th)'
  }
  if (chordShape.includes('Major6')) {
    return 'Major 6: chord has major third (R + 3) and a perfect fifth (5), chord is 6 added major sixth (6th)'
  }
  if (chordShape.includes('Major7')) {
    return 'Major 7: chord has major third (R + 3) and a perfect fifth (5), chord is 7 added major seventh (7th)'
  }
  if (chordShape.includes('Major')) {
    return 'Major: chord has major third (R + 3) and a perfect fifth (5).'
  }
  if (chordShape.includes('minor6')) {
    return 'Minor 6: chord has minor third (R + m3) and a perfect fifth (5), chord is 6 added major sixth (6th)'
  }
  if (chordShape.includes('minor9')) {
    return 'Minor 9: chord has minor third (R + m3), chord is 9: chord 7 with added major second (9th)'
  }
  if (chordShape.includes('minor7')) {
    return 'Minor 7: chord has minor third (R + m3) and a perfect fifth (5), chord is 7 added minor seventh (7th)'
  }
  if (chordShape.includes('minor')) {
    return 'Minor: chord has minor third (R + m3) and a perfect fifth (5)'
  }
  if (chordShape.includes('madd9')) {
    return 'Minor add9: chord has minor third (R + m3) and a perfect fifth (5) with added major second (9th)'
  }
  if (chordShape.includes('add9')) {
    return 'Major add9: chord has major third (R + 3) and a perfect fifth (5) with added major second (9th)'
  }
  if (chordShape.includes('augmented7')) {
    return 'Major augmented 7: chord has major third (R + 3) with an augmented fifth (m6), chord is 7 added minor seventh (7th)'
  }
  if (chordShape.includes('augmented')) {
    return 'Major augmented : chord has major third (R + 3) with an augmented fifth (m6)'
  }
  if (chordShape.includes('diminished7')) {
    return 'Minor diminished 7 : chord has minor third (R + m3) with an diminished fifth (5-), chord is 7 added major sixth (7th)'
  }
  if (chordShape.includes('diminished')) {
    return 'Minor diminished : chord has minor third (R + m3) with an diminished fifth (5-)'
  }
  if (chordShape.includes('dominant7th')) {
    return 'Major dominant 7th : chord is 7 (dominant 7): major chord (R,3,5) with a minor seventh (7th)'
  }
  if (chordShape.includes('dominant9th')) {
    return 'Major dominant 9th : chord is 7 (dominant 7): major chord (R,3,5) with a minor seventh (7th) and added major second (9th)'
  }
  if (chordShape.includes('m7b5')) {
    return 'Half-diminished Chord m7b5 : : chord has minor third (R + m3) with an diminished fifth (5-) with a minor seventh (7th)'
  }
  if (chordShape.includes('JimiHendrix')) {
    return 'JimiHendrix : chord has minor third (R + m3) and a perfect fifth (5), chord is 7 added minor seventh (7th) and added a major third (3)'
  }
}

class ChordDetails extends React.Component {
  render () {
    if (this.props.chord.length === 0) {
      return <div className='no-chord-selected mt-4'><h5 className='text-center'>Select a chord in results to see details</h5></div>
    } else {
      const rows = MakeChordDetails (this.props.chord)
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
              {special}
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
                {this.state.fretboardMode && <GuitarNeckBasic selectedNotes={this.state.selectedNotes} onChange={this.handleNeckClick}/>}
                <SearchChordsToFretApi style={apiResultStyle} selectedNotes={selectedNotes} onClick={this.handleClick} fretboardMode={this.state.fretboardMode}/>
                </div>
              </div>
              <div className='search-note-left-side mb-4'>
                <ChordDetails chord={this.state.selectedChord}/>
              </div>
            </div>
        </div>
  }
}
