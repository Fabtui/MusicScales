import { useLocation } from "react-router-dom";
import { Selector } from "../components/Selector";
import { Modes } from "../containers/Modes"

function Child (props) {
  const location = useLocation();
  if (location.state) {
    if (location.pathname === "/MyScaleResult") {
      return (
        <div>
          <Selector
            selected_note_index={location.state.selected_note_index}
            selected_scale_name={location.state.selected_scale_name}
          />
        </div>
      );
    }
    if (location.pathname === "/SelectedModes") {
      return (
        <div>
          <Modes selected_note_index={location.state.selected_note_index} />
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}

export default Child
