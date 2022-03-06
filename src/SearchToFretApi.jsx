import React, {Component} from 'react'
import { Link } from "react-router-dom";
import {NOTES} from './data'
import { EVERY_SCALES } from './data/scales';
import { searchFromData } from './SearchChordsToFretApi';

export function displayFoundScales (scales, functionOnClick) {
  let rows = []
  if (scales === undefined) {
    return
  }

  function onClick(e) {
    functionOnClick(e.target.innerText);
  }

  scales.forEach((scale, index) => {
      console.log(scale);
      rows.push(
        <tr key={index}>
        <th scope="row">{scale[0]}</th>
        <td id='clickable-td' onClick={onClick}>{scale[0]} {scale[1]}</td>
        <td >{scale[2]}</td>
      </tr>
      )
  })
  return rows
}

// export function displayScales (scales, functionOnClick) {
//   let rows = []
//   if (scales === undefined) {
//     return
//   }
//   let allKeys = []
//   for (const [key, value] of Object.entries(scales)) {
//     allKeys.push(key)
//   }

//   function onClick(e) {
//     functionOnClick(e.target.innerText);
//   }

//   let allKeysKeys = []
//   allKeys.forEach((key, index) => {
//     allKeysKeys = Object.keys(scales[key])
//     allKeysKeys.forEach(scale => {
//       const scaleNotes = scales[key][scale]
//       const keyIndex = NOTES.indexOf(key)
//       const scaleName = scale.charAt(0).toUpperCase() + scale.slice(1)
//       rows.push(
//         <tr key={key + index + scaleName}>
//         <th scope="row">{key}</th>
//         <td id='clickable-td' onClick={onClick}>{key} {scaleName}</td>
//         <td >{scaleNotes}</td>
//       </tr>
//       )
//     })
//   })
//   return rows
// }

export class SearchToFretApi extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      scales: []
    }
    this.fetchApi = this.fetchApi.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.fetchApi(nextProps.selectedNotes)
    const selectedChords = searchFromData(nextProps.selectedNotes, EVERY_SCALES)
    this.setState ({
      scales: selectedChords
    })
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
          scales: response.scales
        })
      })
  }

  onClick(e) {
    this.props.onClick(e);
  }

  render () {
    const scales = this.state.scales
    const rows = displayFoundScales(scales, this.onClick)
    const style = `${this.props.style} table fret-api-result`
    return <div className='container'>
              <table className={style}>
                <thead>
                  <tr>
                    <th scope="col">Key</th>
                    <th scope="col">Scale</th>
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
