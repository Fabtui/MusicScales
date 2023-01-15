import React, { Component, Fragment } from "react";
import { NOTES, MODES, INTERVALS } from "../data/data";
import "../stylesheets/modes.css";

function ModesRows({ mode, selected_note_index, notes }) {
  const rows = [];
  const ordered_notes = [...notes.slice(selected_note_index), ...notes.slice(0, selected_note_index)]
  mode.scale.forEach((index) => {
    const key = `${mode.name}-${ordered_notes[index]}`;
    const className = mode.special_notes.includes(index) ? 'mode-special-note' : '';
    rows.push(
      <Fragment key={key}>
        <th className={className} scope="col">{ordered_notes[index]}</th>
      </Fragment>
    );
  });
  return rows;
}


function ModesBuilder({ modes, selected_note_index, notes }) {
  const rows = [];
  modes.forEach((mode) => {
    const key = `${selected_note_index}-${mode.name}`;
    const structure = mode.scale.map((index) => INTERVALS[index]).join(' ');
    rows.push(
      <tr key={key}>
        <th scope="col">{mode.degree}</th>
        <th scope="col">
          {mode.name} ({mode.type})
        </th>
        <th scope="col">{structure}</th>
        <ModesRows
          mode={mode}
          selected_note_index={selected_note_index}
          notes={notes}
        />
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

export class ModesWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_scale_name: "minor",
    };
  }

  render() {
    return (
      <div className="modes-container">
        <h1>{NOTES[this.props.selected_note_index]} modes</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Degree</th>
              <th scope="col">Name</th>
              <th scope="col">Structure</th>
              <th scope="col">T</th>
              <th scope="col">2</th>
              <th scope="col">3</th>
              <th scope="col">4</th>
              <th scope="col">5</th>
              <th scope="col">6</th>
              <th scope="col">7</th>
            </tr>
          </thead>
          <ModesBuilder
            key={this.props.selected_note_index}
            modes={MODES}
            selected_note_index={this.props.selected_note_index}
            notes={NOTES}
          />
        </table>
      </div>
    );
  }
}
