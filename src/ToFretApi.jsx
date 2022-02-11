import React, {Component} from 'react'
import {NOTES} from './data'

function displayScales (scales) {
  let allKeys = []
  for (const [key, value] of Object.entries(scales)) {
    allKeys.push(key)
  }
  const rows = []
  allKeys.forEach(key => {
    const string = JSON.stringify(scales[key]);
    rows.push(`${key} ${string}`)
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

  componentWillReceiveProps(nextProps) {
    this.fetchApi(nextProps.selectedNotes)
  }

  fetchApi (selectedNotes) {
    let that = this
    const notes = selectedNotes
    const mutatedNotes = notes.map(note => NOTES[note].replace('#', '%23'))
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
      {rows}
    </div>
  }
}
