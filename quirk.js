import React, { Component } from 'react';
import {toPlusMinus} from './utils';
import Choice from './choices';

export default class Quirk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };
  }

  setOption = (i, val) => {
    var newOptions = this.props.selection.options;
    newOptions[i] = val;
    this.props.setSelected(this.props.var.name,{
      selected : this.props.selection.selected,
      options : newOptions,
      customValue: this.props.selection.customValue,
    })
  }

  setCustom = (val) => {
    this.props.setSelected(this.props.var.name,{
      selected : this.props.selection.selected,
      options : this.props.selection.options,
      customValue: val,
    })
  }

  render() {
    var checked = this.props.selection.selected;
    var checkedOptions = this.props.selection.options;
    var custom = this.props.selection.customValue;
    const v = this.props.var;

    var customInput = "";
    if("customInput" in v){
      customInput = v.customInput(this.setCustom, custom);
    }

    const greyout = this.props.enabled ? "" : "#bbb";

    return <div>
    <button
      disabled = {!this.props.enabled}
      className = {checked ? "full" : "empty"}
      onClick = {() => this.props.setSelected(v.name,{selected : !checked, options: checkedOptions, customValue: custom})}
      style = {{borderColor: greyout}}
    />
    <span style = {{color: greyout}}>{v.name + toPlusMinus(v.modifier)}</span>
    <button
      className = {"round " + (this.state.showInfo ? "full" : "empty")}
      onClick = {() => this.setState({showInfo: !this.state.showInfo})}
    >
      ?
    </button>
    {this.state.showInfo ?
    <div style={{
      margin: '8px', marginTop: '0px'
    }}>{v.description}</div> : ""}
     {checked && 'options' in v ? <div style={{marginLeft: '20px'}}>
        {v.options.map((optionSet,i) =>  <div style = {{marginBottom: '12px'}}>
        <Choice
          choices = {optionSet}
          selected = {checkedOptions[i]}
          setOption = {option => this.setOption(i,option)}
        /></div>)}
      </div> : ""}
      {checked && 'customInput' in v ? <div style={{marginLeft: '20px'}}> {customInput} </div> : ""}
    </div>
  }
}