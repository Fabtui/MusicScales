import React, { Component } from "react";
import "../stylesheets/modes.css";
// import { ModesWidget } from "../components/ModesWidget";
import { NoteDropDown } from "../components/NoteDropdown";
import { ScaleTable } from "../components/ScaleTable";
import { ScaleNotes } from "../components/ScaleDisplay";
import { NeckTable } from "../components/NeckTable";
import { NOTES, SCALES_LIST, MODES } from "../data/data";

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
    const selected_scale_notes = ScaleNotes({
      selected_note_index: this.state.selected_note_index,
      scale_intervals: SCALES_LIST['Major'],
    });
    return (
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
        {/* <ModesWidget selected_note_index={this.state.selected_note_index} /> */}
        <div className="modes-container">
          <div className="modes-left-side">
            <div className="modes-card">
              <h1>
                {MODES[0].name} ({MODES[0].type})
              </h1>
              <ScaleTable
                selected_note_index={this.state.selected_note_index}
                selected_scale_notes={selected_scale_notes}
                selected_note={this.state.selected_note}
                special_notes={MODES[0].special_notes}
              />
              <NeckTable
                selected_scale_notes={selected_scale_notes}
                selected_note_index={this.state.selected_note_index}
                selected_scale={MODES[0].scale}
              />
            </div>
          </div>
          <div className="modes-right-side">
            {MODES.map((mode) => {
              return (
                <div className="modes-card">
                  <h1 key={`${mode.name} - ${mode.type}`}>
                    {" "}
                    {mode.name} ({mode.type})
                  </h1>
                  <ScaleTable
                    selected_note_index={this.state.selected_note_index}
                    selected_scale_notes={ScaleNotes({
                      selected_note_index: this.state.selected_note_index,
                      scale_intervals: mode.scale,
                    })}
                    selected_note={this.state.selected_note}
                    special_notes={mode.special_notes}
                  />
                  <NeckTable
                    selected_scale_notes={selected_scale_notes}
                    selected_note_index={this.state.selected_note_index}
                    selected_scale={mode.scale}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
