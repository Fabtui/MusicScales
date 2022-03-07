import React, {Component} from 'react'
import {NOTES} from './data'
import { EVERY_CHORDS } from './data/chords.js'
import { displayFoundScales } from './SearchToFretApi';

export function searchFromData (selectedNotes, data) {
  if (selectedNotes.length === 0) {
    return
  }
  const selectedNotesNames = selectedNotes.map(note => NOTES[note])
  const keys = Object.keys(data)
  const selectedChords = []
  const checker = (arr, target) => target.every(v => arr.includes(v));
  keys.forEach(key => {
    const chordShapes = Object.keys(data[key])
    chordShapes.forEach(chordShape => {
      const chord = data[key][chordShape].split(' ')
      if (checker(chord, selectedNotesNames)) {
        const capitalChordShape = chordShape.charAt(0).toUpperCase() + chordShape.slice(1);
        selectedChords.push([key, capitalChordShape, chord.join(' ')])
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
    // this.fetchApi = this.fetchApi.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.fetchApi(nextProps.selectedNotes)
    const selectedChords = searchFromData (nextProps.selectedNotes, EVERY_CHORDS)
    this.setState ({
      chords: selectedChords
    })
  }

  // fetchApi (selectedNotes) {
  //   if (selectedNotes.length === 0) {
  //     return
  //   }
  //   let that = this

  //   const mutatedNotes = encodeURIComponent(selectedNotes.map(note => NOTES[note]))
  //   const url = `http://www.tofret.com/reverse-chord-finder.php?notes=${mutatedNotes}&return-type=json`
  //   fetch(url,
  //       {
  //           method: "GET",
  //           mode: 'cors',
  //           headers: {
  //               'Content-Type': 'application/json',
  //           }
  //       })
  //     .then(response => response.json())
  //     .then(function(response) {
  //       that.setState({
  //         chords: response.chords
  //       })
  //     })
  // }

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
