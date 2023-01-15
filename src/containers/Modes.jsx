import React, { Component } from "react";
import "../stylesheets/modes.css";
import { ModesWidget } from "../components/ModesWidget";

export class Modes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_note_index: 0
    };
  }

  render() {
    return (
      <div className="modes-container">
        <ModesWidget selected_note_index={this.state.selected_note_index} />
      </div>
    );
  }
}
