import React from 'react'
import '../stylesheets/guitar_neck.css'
import { GuitarNeck } from './GuitarNeck'
import { TuningDropDown } from './TuningDropDown'
import { GUITAR_TUNING } from '../data/data'
import { ScaleNotes } from './ScaleDisplay'

export class NeckTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_tuning: GUITAR_TUNING["E"],
      selected_tuning_name: "E",
      selected_scale_notes: this.props.selected_scale_notes,
      notes_displayed: true,
      ghost_notes_displayed: false,
    };
    this.handleTuningChange = this.handleTuningChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleGhostNoteDisplayed = this.handleGhostNoteDisplayed.bind(this)
  }

  handleTuningChange(tuning) {
    this.setState({
      selected_tuning: GUITAR_TUNING[tuning],
      selected_tuning_name: tuning,
    });
  }

  handleCheck(e) {
    this.setState({
      notes_displayed: e.target.checked,
    });
  }

  handleGhostNoteDisplayed() {
    this.setState({
      ghost_notes_displayed: !this.state.ghost_notes_displayed,
    });
  }

  render() {
    const noteLabelStyle = this.state.notes_displayed
      ? "selected"
      : "not-selected";
    const nameLabelStyle = this.state.notes_displayed
      ? "not-selected"
      : "selected";
    const selected_scale_notes = ScaleNotes({
      selected_note_index: this.props.selected_note_index,
      scale_intervals: this.props.selected_scale,
    });
    return (
      <div className="neck-table">
        <div className="tuning-select">
          <div className="notes-checkbox-container">
            <label
              className={nameLabelStyle}
              id="notes-checkbox-label"
              htmlFor="notes-checkbox"
            >
              INTERVALS
            </label>
            <label className="switch">
              <input
                type="checkbox"
                className="switch"
                id="notes-checkbox"
                name="notes-checkbox"
                checked={this.state.notes_displayed}
                onChange={this.handleCheck}
              ></input>
              <span className="slider round"></span>
            </label>
            <label
              className={noteLabelStyle}
              id="notes-checkbox-label"
              htmlFor="notes-checkbox"
            >
              NOTES
            </label>
          </div>
          <div className="tuning-selector">
            <h4>TUNING</h4>
            <TuningDropDown
              className="scale-selector"
              tunings={GUITAR_TUNING}
              selected_tuning_name={this.state.selected_tuning_name}
              onChange={this.handleTuningChange}
            />
          </div>
        </div>
        <GuitarNeck
          special_notes={this.props.special_notes}
          notes_displayed={this.state.notes_displayed}
          selected_note_index={this.props.selected_note_index}
          selected_scale={this.props.selected_scale}
          tuning={this.state.selected_tuning}
          selected_scale_notes={selected_scale_notes}
          ghost_notes_displayed={this.state.ghost_notes_displayed}
        />
        <div
          className="form-check display-ghost-notes-checkbox"
          onClick={this.handleGhostNoteDisplayed}
        >
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={this.state.ghost_notes_displayed}
            onChange={this.handleGhostNoteDisplayed}
          />
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
            onClick={this.handleGhostNoteDisplayed}
          >
            Show out of scale notes
          </label>
        </div>
      </div>
    );
  }
}
