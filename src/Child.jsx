import { useLocation } from "react-router-dom";
import { Title } from "./Title";

function Child (props) {
  const location = useLocation();
  if (location.state) {
  console.log(props);
  console.log(location);
  console.log(location.state);
  return (
    <div>
    <Title selected_note={location.state.selected_note} selected_scale_name={location.state.selected_scale_name}/>
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
