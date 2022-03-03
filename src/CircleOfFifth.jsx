import { Link } from "react-router-dom";

export function CircleOfFifth () {
  return <div className='circle-of-fifth'>
          <div className="circle-select-box">
            <Link id="C" className="circle-selector C" to="/MyScaleResult" state={{selected_note_index: 3, selected_scale_name: 'Major'}}></Link>
            <Link id="G" className="circle-selector G" to="/MyScaleResult" state={{selected_note_index: 11, selected_scale_name: 'Major'}}></Link>
            <Link id="D" className="circle-selector D" to="/MyScaleResult" state={{selected_note_index: 5, selected_scale_name: 'Major'}}></Link>
            <Link id="A" className="circle-selector A" to="/MyScaleResult" state={{selected_note_index: 0, selected_scale_name: 'Major'}}></Link>
            <Link id="E" className="circle-selector E" to="/MyScaleResult" state={{selected_note_index: 7, selected_scale_name: 'Major'}}></Link>
            <Link id="B" className="circle-selector B" to="/MyScaleResult" state={{selected_note_index: 2, selected_scale_name: 'Major'}}></Link>
            <Link id="F#" className="circle-selector Fsharp" to="/MyScaleResult" state={{selected_note_index: 9, selected_scale_name: 'Major'}}></Link>
            <Link id="C#" className="circle-selector Csharp" to="/MyScaleResult" state={{selected_note_index: 4, selected_scale_name: 'Major'}}></Link>
            <Link id="G#" className="circle-selector Gsharp" to="/MyScaleResult" state={{selected_note_index: 10, selected_scale_name: 'Major'}}></Link>
            <Link id="D#" className="circle-selector Dsharp" to="/MyScaleResult" state={{selected_note_index: 6, selected_scale_name: 'Major'}}></Link>
            <Link id="A#" className="circle-selector Asharp" to="/MyScaleResult" state={{selected_note_index: 1, selected_scale_name: 'Major'}}></Link>
            <Link id="F" className="circle-selector F" to="/MyScaleResult" state={{selected_note_index: 8, selected_scale_name: 'Major'}}></Link>
            <Link id="a" className="circle-selector a" to="/MyScaleResult" state={{selected_note_index: 0, selected_scale_name: 'Minor'}}></Link>
            <Link id="e" className="circle-selector e" to="/MyScaleResult" state={{selected_note_index: 7, selected_scale_name: 'Minor'}}></Link>
            <Link id="b" className="circle-selector b" to="/MyScaleResult" state={{selected_note_index: 2, selected_scale_name: 'Minor'}}></Link>
            <Link id="f#" className="circle-selector fsharp" to="/MyScaleResult" state={{selected_note_index: 9, selected_scale_name: 'Minor'}}></Link>
            <Link id="c#" className="circle-selector csharp" to="/MyScaleResult" state={{selected_note_index: 4, selected_scale_name: 'Minor'}}></Link>
            <Link id="g#" className="circle-selector gsharp" to="/MyScaleResult" state={{selected_note_index: 11, selected_scale_name: 'Minor'}}></Link>
            <Link id="d#" className="circle-selector dsharp" to="/MyScaleResult" state={{selected_note_index: 6, selected_scale_name: 'Minor'}}></Link>
            <Link id="a#" className="circle-selector asharp" to="/MyScaleResult" state={{selected_note_index: 1, selected_scale_name: 'Minor'}}></Link>
            <Link id="f" className="circle-selector f" to="/MyScaleResult" state={{selected_note_index: 8, selected_scale_name: 'Minor'}}></Link>
            <Link id="c" className="circle-selector c" to="/MyScaleResult" state={{selected_note_index: 3, selected_scale_name: 'Minor'}}></Link>
            <Link id="g" className="circle-selector g" to="/MyScaleResult" state={{selected_note_index: 10, selected_scale_name: 'Minor'}}></Link>
            <Link id="d" className="circle-selector d" to="/MyScaleResult" state={{selected_note_index: 5, selected_scale_name: 'Minor'}}></Link>
          </div>
         </div>
}


// function linkMaker(note, shape, index) {
//   if (note.length === 2) {
//     note = note.replace('#', 'sharp')
//   }
//   const style = shape === 'Major' ? `circle-selector ${note}` : `circle-selector ${note.toLowerCase()}`
//   return <Link className={style} to="/MyScaleResult" state={{selected_note_index: {index}, selected_scale_name: {shape}}}></Link>
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
