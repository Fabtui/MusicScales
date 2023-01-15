import React from 'react'
import { EVERY_SCALES } from '../data/scales';
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
    const exactChord = scale[3]
    const style = exactChord ? 'exact-chord' : ''
      rows.push(
        <tr className={style} key={index}>
        <th scope="row">{scale[0]}</th>
        <td id='clickable-td' onClick={onClick}>{scale[0]} {scale[1]}</td>
        <td >{scale[2]}</td>
      </tr>
      )
  })
  return rows
}

export class SearchToFretApi extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      scales: []
    }
    this.onClick = this.onClick.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const selectedScales = searchFromData(nextProps.selectedNotes, EVERY_SCALES)
    this.setState ({
      scales: selectedScales
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
