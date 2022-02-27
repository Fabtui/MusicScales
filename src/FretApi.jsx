import React, {Component} from 'react'
import { MakeTriads } from './Triads'
import './stylesheets/fret_api.css'

export class FretApi extends React.Component {

  // http://guitar-chords-chart.net/#C,Am,F,G

  fetchApi () {
    let that = this
    const url = `http://guitar-chords-chart.net/#C,Am,F,G`
    fetch(url)
      // .then(response => response.json())
      .then(function(response) {
        console.log(typeof response);
      })
  }

  render () {
    this.fetchApi()
    const triads = MakeTriads(this.props.selected_scale_notes, this.props.selected_scale) 
    const chords = triads.map(triad => `${triad[3].split(' ')[0]}(${triad[3].split(' ')[1].toLowerCase()})`)
    let rows = []
    chords.forEach((chord, index) => rows.push(<ins className="scales_chords_api" chord={chord} key={index} instrument="guitar" output="image" nolink="false"></ins>))
    return <>
      {rows}
    </>
  }
}