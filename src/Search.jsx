import React, {Component} from 'react'
import {SearchCheckboxes} from './SearchCheckboxes'
import './stylesheets/search.css'

export class Search extends React.Component {
  render () {
    return <div className='container'>
    <SearchCheckboxes></SearchCheckboxes>
    </div>
  }
}
