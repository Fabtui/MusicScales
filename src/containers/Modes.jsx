import React, { Component } from "react";
import "../stylesheets/modes.css";
import { ModesWidget } from "../components/ModesWidget";
import { NoteDropDown } from "../components/NoteDropdown";
import { NOTES } from "../data/data";

export class Modes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_note_index: 0,
    };
    this.handleNoteChange = this.handleNoteChange.bind(this)
  }

  handleNoteChange(note) {
    this.setState({
      selected_note_index: parseInt(note),
    });
  }

  render() {
    const selected_note = NOTES[this.state.selected_note_index];
    return (
      <div className="modes-container">
        <div className="container">
          <div className="selector-top">
            <div className="selectors">
              <NoteDropDown
                selected_note={selected_note}
                notes={NOTES}
                onChange={this.handleNoteChange}
              />
            </div>
          </div>
        </div>
        <ModesWidget selected_note_index={this.state.selected_note_index} />
      </div>
    );
  }
}
