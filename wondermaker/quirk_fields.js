import React, { Component } from 'react';
import Quirk from '../quirk';
import {irrelevantQuirk} from '../utils';
import {axiomDefs} from '../consts';

export default class QuirkFields extends React.Component {
  constructor(props) {
    super(props);
  }

  getDefaultOptions = (v) => {
    if (!('options' in v)){
      return [];
    }
    return v.options.map(option => Object.keys(option)[0]);
  }

  renderVariables = () => {
    var allVars = this.props.allQuirks;
    var shownVars = [];
    const data = this.props.basicInfo;
    for(var v of allVars){
      var compatible = true;
      if('incompatible' in v){
        for(var quirkName of v.incompatible){
          if(this.props.quirkInfo[quirkName] && this.props.quirkInfo[quirkName].selected){
            compatible = false;
            break;
          }
        }
      }
      var blacklist = axiomDefs[this.props.basicInfo.axiom].quirkBlacklist;
      if(blacklist != undefined &&
        blacklist[this.props.basicInfo.flavor] != undefined &&
        blacklist[this.props.basicInfo.flavor].includes(v.name)
      ){
        continue;
      }
      var selection = this.props.quirkInfo[v.name];
      if(selection === undefined){
        selection = {
          selected : false,
          options : this.getDefaultOptions(v),
          customValue : v.defaultcustomValue,
        }
      }
      var rendered = <Quirk
        key={v.name}
        var={v}
        selection={selection}
        setSelected={this.props.setSelected}
        enabled={compatible}
      />;
      shownVars.push(rendered);
    }
    return shownVars;
  }

  render() {
    return <div>
      {this.renderVariables()}
    </div>;
  }
}