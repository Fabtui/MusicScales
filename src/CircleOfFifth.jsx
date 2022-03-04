import { Link } from "react-router-dom";
import React, {Component} from "react"
import { NOTES } from "./data";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
const lightbulb = <FontAwesomeIcon icon={faLightbulb} />

function linkMaker(note, shape, index) {
  if (note.length === 2) {
    note = note.replace('#', 'sharp')
  }
  const style = shape === 'Major' ? `circle-selector ${note}` : `circle-selector ${note.toLowerCase()}`
  const key = `${note}${shape}${index}`
  return <Link key={key} className={style} to="/MyScaleResult" state={{selected_note_index: index, selected_scale_name: shape}}></Link>
}

export class CircleOfFifth extends React.Component {

  componentDidMount() {
    const hint = document.querySelector('#circle-of-fifth-hint')
      const hintPosition = document.querySelector('#circle-of-fifth-hint').getBoundingClientRect();
      var top = hintPosition.top;
      var left = hintPosition.left;
      document.addEventListener('mousemove', (e) => {
        hint.style.transform = `translate(${e.clientX - left + 20}px, ${e.clientY - top - 20}px)`;
      })
      const boxes = document.querySelectorAll('.circle-selector')
      boxes.forEach(box => {
        box.addEventListener('mouseenter', (e) => {
          hint.style.opacity = 1
        })
        box.addEventListener('mouseleave', (e) => {
          hint.style.opacity = 0
        })
      });
  }

  render () {
    const rows = []
    NOTES.forEach((note, index) => {
      rows.push(linkMaker(note, 'Major', index))
      rows.push(linkMaker(note, 'Minor', index))
    });
    return <div className="container">
             <div className='circle-of-fifth'>
               <div id='circle-of-fifth-hint'>{lightbulb} Click to see more details</div>
               <div className="circle-select-box">
                 {rows}
               </div>
             </div>
           </div>
  }
}
