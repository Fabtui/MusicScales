import { useLocation } from "react-router-dom";
import { Selector } from "./Selector";

function Child (props) {
  const location = useLocation();
  if (location.state) {
  return (
    <div>
    <Selector selected_note_index={location.state.selected_note_index} selected_scale_name={location.state.selected_scale_name}/>
    </div>
  )
  } else {
      return (
    <div>
    </div>
  )
  }
}

export default Child
