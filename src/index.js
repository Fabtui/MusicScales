import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import reportWebVitals from './reportWebVitals';
import './stylesheets/App.css';
import {Selector} from './Selector'
import { AllScales } from './AllScales'
import { Search } from './Search'
import Child from './Child'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="MyScale" element={<Selector />} />
          <Route path="AllScales" element={<AllScales />} />
          <Route path="Search" element={<Search />} />
          <Route path="MyScaleResult" element={<Child />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
