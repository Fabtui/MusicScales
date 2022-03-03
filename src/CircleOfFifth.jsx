import { Link } from "react-router-dom";
import React, {Component} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
const lightbulb = <FontAwesomeIcon icon={faLightbulb} />

export class CircleOfFifth extends React.Component {
  constructor (props) {
    super (props)
    this.state = ({
      inBoxe: false
    })
    this.linkOnMouseEnter = this.linkOnMouseEnter.bind(this)
    this.linkOnMouseLeave = this.linkOnMouseLeave.bind(this)
  }

  componentDidMount() {
    const hint = document.querySelector('#circle-of-fifth-hint')
      const hintPosition = document.querySelector('#circle-of-fifth-hint').getBoundingClientRect();
      var top = hintPosition.top;
      var left = hintPosition.left;
      document.addEventListener('mousemove', (e) => {
        hint.style.transform = `translate(${e.clientX - left + 20}px, ${e.clientY - top - 20}px)`;
      })
  }

  linkOnMouseEnter() {
    this.setState ({
      inBoxe: true
    })
  }

  linkOnMouseLeave() {
    this.setState ({
      inBoxe: false
    })
  }

  render () {
    const hinOpacity = this.state.inBoxe ? 1 : 0
    return <div className='circle-of-fifth'>
          <div style={{opacity: hinOpacity}} id='circle-of-fifth-hint'>{lightbulb} Click to see more details</div>
          <div className="circle-select-box">
            <Link id="C" className="circle-selector C" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave}  to="/MyScaleResult" state={{selected_note_index: 3, selected_scale_name: 'Major'}}></Link>
            <Link id="G" className="circle-selector G" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 10, selected_scale_name: 'Major'}}></Link>
            <Link id="D" className="circle-selector D" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 5, selected_scale_name: 'Major'}}></Link>
            <Link id="A" className="circle-selector A" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 0, selected_scale_name: 'Major'}}></Link>
            <Link id="E" className="circle-selector E" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 7, selected_scale_name: 'Major'}}></Link>
            <Link id="B" className="circle-selector B" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 2, selected_scale_name: 'Major'}}></Link>
            <Link id="F#" className="circle-selector Fsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 9, selected_scale_name: 'Major'}}></Link>
            <Link id="C#" className="circle-selector Csharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 4, selected_scale_name: 'Major'}}></Link>
            <Link id="G#" className="circle-selector Gsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 11, selected_scale_name: 'Major'}}></Link>
            <Link id="D#" className="circle-selector Dsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 6, selected_scale_name: 'Major'}}></Link>
            <Link id="A#" className="circle-selector Asharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 1, selected_scale_name: 'Major'}}></Link>
            <Link id="F" className="circle-selector F" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 8, selected_scale_name: 'Major'}}></Link>
            <Link id="a" className="circle-selector a" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 0, selected_scale_name: 'Minor'}}></Link>
            <Link id="e" className="circle-selector e" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 7, selected_scale_name: 'Minor'}}></Link>
            <Link id="b" className="circle-selector b" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 2, selected_scale_name: 'Minor'}}></Link>
            <Link id="f#" className="circle-selector fsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 9, selected_scale_name: 'Minor'}}></Link>
            <Link id="c#" className="circle-selector csharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 4, selected_scale_name: 'Minor'}}></Link>
            <Link id="g#" className="circle-selector gsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 11, selected_scale_name: 'Minor'}}></Link>
            <Link id="d#" className="circle-selector dsharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 6, selected_scale_name: 'Minor'}}></Link>
            <Link id="a#" className="circle-selector asharp" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 1, selected_scale_name: 'Minor'}}></Link>
            <Link id="f" className="circle-selector f" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 8, selected_scale_name: 'Minor'}}></Link>
            <Link id="c" className="circle-selector c" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 3, selected_scale_name: 'Minor'}}></Link>
            <Link id="g" className="circle-selector g" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 10, selected_scale_name: 'Minor'}}></Link>
            <Link id="d" className="circle-selector d" onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: 5, selected_scale_name: 'Minor'}}></Link>
          </div>
         </div>
  }
}


// function linkMaker(note, shape, index) {
//   if (note.length === 2) {
//     note = note.replace('#', 'sharp')
//   }
//   const style = shape === 'Major' ? `circle-selector ${note}` : `circle-selector ${note.toLowerCase()}`
//   return <Link className={style} onMouseEnter={this.linkOnMouseEnter} onMouseLeave={this.linkOnMouseLeave} to="/MyScaleResult" state={{selected_note_index: {index}, selected_scale_name: {shape}}}></Link>
// }

// export function CircleOfFifth () {

//   const rows = []

//   NOTES.forEach((note, index) => {
//     rows.push(linkMaker(note, 'Major', index))
//     rows.push(linkMaker(note, 'Minor', index))
//   });

//   console.log(rows);
//   return <div className='circle-of-fifth'>
//           <div className="circle-select-box">
//             {rows}
//           </div>
//          {/* <img src={circle} alt="circle-of-fifth" /> */}
//          </div>
// }
