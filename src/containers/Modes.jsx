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
      selected_note_index: this.props.selected_note_index || 0,
      selectedKeyShape: "Major",
    };
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleMajorClick = this.handleMajorClick.bind(this);
    this.handleMinorClick = this.handleMinorClick.bind(this);
  }

  handleNoteChange(note) {
    this.setState({
      selected_note_index: parseInt(note),
    });
  }

  handleMajorClick() {
    this.setState({
      selectedKeyShape: "Major",
    });
  }

  handleMinorClick() {
    this.setState({
      selectedKeyShape: "Minor",
    });
  }

  render() {
    const selected_note = NOTES[this.state.selected_note_index];
    const selected_scale_notes = ScaleNotes({
      selected_note_index: this.state.selected_note_index,
      scale_intervals: SCALES_LIST[this.state.selectedKeyShape],
    });
    const selected_scale = SCALES_LIST[this.state.selectedKeyShape]
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
        <div className="modes-container">
          <div className="modes-left-side">
            <div className="modes-card">
              <div className="key-shape-selector">
                <div className="key-shape-selector-element">
                  <h1 onClick={this.handleMajorClick} className={this.state.selectedKeyShape === 'Major' ? 'selected-key' : ''}>
                     {NOTES[this.state.selected_note_index]} {"Major"} ({MODES[0].name})
                  </h1>
                </div>
                <div className="key-shape-selector-element">
                  <h1 onClick={this.handleMinorClick} className={this.state.selectedKeyShape === 'Minor' ? 'selected-key' : ''}>
                    {NOTES[this.state.selected_note_index]} {"minor"} ({MODES[5].name})
                  </h1>
                </div>
              </div>
              <div className="scale-table">
                <ScaleTable
                  selected_note_index={this.state.selected_note_index}
                  selected_scale_notes={selected_scale_notes}
                  selected_note={this.state.selected_note}
                  selected_scale={selected_scale}
                />
              </div>
              <NeckTable
                selected_scale_notes={selected_scale_notes}
                selected_note_index={this.state.selected_note_index}
                selected_scale={selected_scale}
              />
            </div>
          </div>
          <div className="modes-right-side">
            {MODES.map((mode) => {
              return (
                <div className="modes-card" key={mode.name}>
                  <h1 key={`${mode.name} - ${mode.type}`}>
                    {mode.degree} - {NOTES[this.state.selected_note_index]} {mode.name} ({mode.type})
                  </h1>
                  <div className="scale-table">
                    <ScaleTable
                      selected_scale={selected_scale}
                      selected_note_index={this.state.selected_note_index}
                      selected_scale_notes={ScaleNotes({
                        selected_note_index: this.state.selected_note_index,
                        scale_intervals: mode.scale,
                      })}
                      selected_note={this.state.selected_note}
                      special_notes={mode.special_notes}
                    />
                  </div>
                  <NeckTable
                    selected_scale_notes={selected_scale_notes}
                    selected_note_index={this.state.selected_note_index}
                    selected_scale={mode.scale}
                    special_notes={mode.special_notes}
                  />
                  <span>{mode.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
