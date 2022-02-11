import React, {Component} from 'react'
import {NOTES} from './data'

function displayScales (scales) {
  let allKeys = []
  for (const [key, value] of Object.entries(scales)) {
    allKeys.push(key)
  }
  allKeys.forEach(key => {
    console.log(key, scales[key]);
  })
  return <div>

  </div>
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
    const mutatedNotes = notes.map(note => NOTES[note]).join('+')
    const url = `http://www.tofret.com/reverse-chord-finder.php?notes=${mutatedNotes}&return-type=json`
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
    displayScales(scales)
    return <div className='container'>

    </div>
  }
}