import React, {Component} from 'react'
import { FetchWebPage } from './FetchWebPage'

export class News extends React.Component {
  constructor(props) {
    super (props)
  }
  render () {
    return <div className='container'>
      <FetchWebPage/>
    </div>
  }
}
