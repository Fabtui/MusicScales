import React, {Component} from 'react'
import {NOTES} from './data'
import { EVERY_CHORDS } from './data/chords.js'
import { displayScales } from './SearchToFretApi';

export class SearchChordsToFretApi extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      chords: [],
      s: []
    }
    this.fetchApi = this.fetchApi.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.fetchApi(nextProps.selectedNotes)
    const selectedChords = this.searchFromData (nextProps.selectedNotes, 'chords')
    console.log(selectedChords);
    // this.setState ({
    //   s: selectedChords
    // })
  }

    searchFromData (selectedNotes, type) {
    if (selectedNotes.length === 0) {
      return
    }
    const selectedNotesNames = selectedNotes.map(note => NOTES[note])
    // console.log(selectedNotesNames.join(' '));
    const keys = Object.keys(EVERY_CHORDS)
    const selectedChords = []
    const checker = (arr, target) => target.every(v => arr.includes(v));
    keys.forEach(key => {
      const chordShapes = Object.keys(EVERY_CHORDS[key])
      chordShapes.forEach(chordShape => {
        const chord = EVERY_CHORDS[key][chordShape].split(' ')
        if (checker(chord, selectedNotesNames)) {
          selectedChords.push([key, chordShape, chord.join(' ')])
        }
      })
    })
    return selectedChords
  }

  fetchApi (selectedNotes) {
    if (selectedNotes.length === 0) {
      return
    }
    let that = this

    const mutatedNotes = encodeURIComponent(selectedNotes.map(note => NOTES[note]))
    const url = `http://www.tofret.com/reverse-chord-finder.php?notes=${mutatedNotes}&return-type=json`
    fetch(url,
        {
            method: "GET",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
      .then(response => response.json())
      .then(function(response) {
        that.setState({
          chords: response.chords
        })
      })
  }

  onClick(e) {
    return
  }

  render () {
    const chords = this.state.chords
    const rows = displayScales(chords, this.onClick)
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
