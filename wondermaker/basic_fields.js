import React, { Component } from 'react';
import SizeSlider from '../size.js';
import {axioms,axiomDefs} from '../consts';
import Dots from '../dots.js'
import {toPlusMinus, getSizeBonus} from '../utils';

export default class BasicFields extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (event,id) => {
    this.props.onValueChange(id, event.target.value);
  }

  render() {
    const bi = this.props.basicInfo;
    const flavors = Object.keys(axiomDefs[bi.axiom].flavors[bi.level]);
    const flavor = axiomDefs[bi.axiom].flavors[bi.level][bi.flavor];
    const size = bi.size;
    const sizeBonus = getSizeBonus(size);
    return <div>
        <input placeholder="Name" spellCheck="false"
          value={bi.name}
          onChange={(e) => this.handleChange(e,"name")}
        />
        <textarea placeholder="Short Description"
          style={{fontSize: '12px'}}
          value={bi.description}
          onChange={(e) => this.handleChange(e,"description")}
        />
        <select
          value={bi.axiom}
          onChange={(e) => this.handleChange(e,"axiom")}
        >
          {axioms.map((val,i) =>
            <option key={i} value={val}>{val}</option>
          )}
        </select>
        <Dots
          value={bi.level}
          onChange={(e) => this.handleChange(e,"level")}
        />
        <select
          value={bi.flavor}
          onChange={(e) => this.handleChange(e,"flavor")}
        >
          {flavors.map((val,i) =>
            <option key={i} value={val}>{val}</option>
          )}
        </select><br/>
        {("flavorOptions" in flavor) ? flavor.flavorOptions(bi,(e)=>{this.handleChange({target: {value: e}}, "flavorOptions")}) : ""}
        <div style = {{margin: '8px'}}>
          Size {size + (size === 30 ? ' or greater' : '' )+ toPlusMinus(sizeBonus, false)}
        </div>
        <SizeSlider
          value = {size}
          onChange={(e) => this.handleChange({target: {value: e}},"size")}
          max = {30}
        />
    </div>;
  }
}