import React, {Component} from 'react'
import {NOTES} from './data'

function displayScales (scales) {
  let rows = []
  if (scales === undefined) {
    return
  }
  let allKeys = []
  for (const [key, value] of Object.entries(scales)) {
    allKeys.push(key)
  }
  let allKeysKeys = []
  allKeys.forEach((key, index) => {
    allKeysKeys = Object.keys(scales[key])
    allKeysKeys.forEach(scale => {
      const scaleNotes = scales[key][scale]
      const scaleName = scale
      rows.push(
        <tr key={key + index + scaleName}>
        <th scope="row">{key}</th>
        <td>{scaleName}</td>
        <td>{scaleNotes}</td>
      </tr>
      )
    })
  })
  return rows
}

export class ToFretApi extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      scales: [],
      bool: false
    }
    this.fetchApi = this.fetchApi.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.fetchApi(nextProps.selectedNotes)
  }

  fetchApi (selectedNotes) {
    if (selectedNotes.length === 0) {
      return
    }
    let that = this
    // const notes = selectedNotes
    const mutatedNotes = selectedNotes.map(note => NOTES[note].replace('#', '%23'))
    const url = `http://www.tofret.com/reverse-chord-finder.php?notes=${mutatedNotes.join('+')}&return-type=json`
    fetch(url)
      .then(response => response.json())
      .then(function(response) {
        that.setState({
          scales: response.scales
        })
      })
  }

  render () {
    const scales = this.state.scales
    const rows = displayScales(scales)
    return <div className='container'>
             <table className="table">
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
