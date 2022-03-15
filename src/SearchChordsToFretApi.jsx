import React, {Component} from 'react'
import {NOTES} from './data'
import { EVERY_CHORDS } from './data/chords.js'
import { displayFoundScales } from './SearchToFretApi';

export function searchFromData (selectedNotes, data, fretboardMode) {
  if (selectedNotes.length === 0) {
    return
  }
  const selectedNotesNames = selectedNotes.map(note => NOTES[note])
  const keys = Object.keys(data)
  const selectedChords = []
  const checker = (arr, target) => target.every(v => arr.includes(v));

  if (fretboardMode) {
    keys.forEach(key => {
      const chordShapes = Object.keys(data[key])
      chordShapes.forEach(chordShape => {
        const chord = data[key][chordShape].split(' ')
        if (data[key][chordShape].split(' ').sort().join(' ') === selectedNotesNames.sort().join(' ')) {
          selectedChords.push([key, chordShape, chord.join(' '), true])
        }
      })
    })
  }
    keys.forEach(key => {
      const chordShapes = Object.keys(data[key])
      chordShapes.forEach(chordShape => {
        const chord = data[key][chordShape].split(' ')
        if (fretboardMode) {
          if (checker(chord, selectedNotesNames)) {
            selectedChords.push([key, chordShape, chord.join(' '), false])
          }
        }
      else {
        const chord = data[key][chordShape].split(' ')
        if (checker(chord, selectedNotesNames)) {
          selectedChords.push([key, chordShape, chord.join(' ')])
        }
      }
      })
    })
  return selectedChords
}

export class SearchChordsToFretApi extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      chords: [],
    }
    this.onClick = this.onClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const selectedChords = searchFromData(nextProps.selectedNotes, EVERY_CHORDS, this.props.fretboardMode)
    this.setState ({
      chords: selectedChords
    })
  }

  onClick(e) {
    this.props.onClick(e)
  }

  render () {
    const chords = this.state.chords
    const rows = displayFoundScales(chords, this.onClick)
    const style = `${this.props.style} table fret-api-result`
    return <div className='container'>
              <table className={style}>
                <thead>
                  <tr>
                    <th scope="col">Key</th>
                    <th scope="col">Name</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table>
            </div>
    }
  }
