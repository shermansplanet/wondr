import React, { Component } from 'react';
import BasicFields from './basic_fields.js';
import Quirk from '../quirk';
import Wonder from './wonder';
import QuirkFields from './quirk_fields.js';
import {universalQuirks} from './universal_quirks';
import {axiomDefs} from '../consts';
import {getSizeBonus,addLineBreaks, irrelevantQuirk, toPlusMinus} from '../utils';

export default class Wondermaker extends React.Component {
  constructor() {
    super();
    this.state = {
      basicInfo : {
        name: "",
        description: "",
        axiom: "Automata",
        level: 2,
        flavorOptions : {},
        size: 3,
      },
      quirkInfo : {}
    };
    this.updateInfo("flavor", "Automaton", "basicInfo");
    this._quirkMap = {};
    this._allQuirks = {};
    this.refreshRelevantQuirks(this.state.basicInfo);
  }

  refreshRelevantQuirks = (info) => {
    const axiom = (axiomDefs[info.axiom]);
    this._allQuirks = [];
    for(var v of axiom.quirks){
      if(!irrelevantQuirk(v,info)){
        this._allQuirks.push(v);
      }
    }
    for(var v of universalQuirks){
      this._allQuirks.push(v);
    }
    this._quirkMap = {};
    for(var v of this._allQuirks){
      this._quirkMap[v.name] = v;
    }
  }

  getCoreModifier = () => {
    var coreMod = getSizeBonus(this.state.basicInfo.size);
    const flavor = this.state.basicInfo.flavor;

    // Apokalypsi Edge Cases
    if(flavor === "Universal Translator"){
      coreMod += 2;
    }else if(flavor === "Direct Scanner" || flavor === "Area Scanner" || flavor === "Extradimensional Scanner" || flavor === "Possibility / Probability" || flavor === "Everything Detector"){
      var n = 0;
      for(var i in this.state.basicInfo.flavorOptions){
        if(this.state.basicInfo.flavorOptions[i] === true){
          n++;
        }
      }
      if(n === 1){
        coreMod ++;
        if(this.state.basicInfo.flavorOptions["Night Vision"] == true){
          coreMod ++;
        }
      }
    }

    // Quirks
    for(var v in this.state.quirkInfo){
      const vsel = this.state.quirkInfo[v];
      if(!vsel.selected){
        continue;
      }
      var quirk = this._quirkMap[v];
      if("customManiaCost" in quirk){
        coreMod += quirk.customManiaCost(vsel.customValue);
      }
      coreMod += quirk.modifier || 0;
      for(var i in vsel.options){
        coreMod += quirk.options[i][vsel.options[i]] || 0;
      }
    }
    return coreMod;
  }

  updateInfo = (key, value, infoType) => {
    var newState = this.state[infoType];
    newState[key] = value;

    if(key == 'level' || key == 'axiom'){
      try{
        newState.flavor = Object.keys(axiomDefs[newState.axiom].flavors[newState.level])[0];
      }catch(e){
        return;
      }
    }
    
    if(key == 'level' || key == 'axiom' || key == 'flavor'){
      newState.flavorOptions = axiomDefs[newState.axiom].flavors[newState.level][newState.flavor].defaultFlavorOptions;
      if(newState.flavorOptions == undefined){
        newState.flavorOptions = {}
      }
      this.refreshRelevantQuirks(newState);
    }

    this.setState({infoType: newState});
  }

  isSelected = (n) => {
    var quirkInfo = this.state.quirkInfo[n];
    return quirkInfo && quirkInfo.selected;
  }

  getRequiredAxioms = () => {
    var reqs = {};
    var anyReqs = false;

    this.setReq = (axiom, level) => {
      if(!(axiom in reqs) || reqs[axiom] < level){
        reqs[axiom] = level;
        anyReqs = true;
      }
    }

    if(this.isSelected("Collapsible")){
      var thisBonus = getSizeBonus(this.state.basicInfo.size);
      var otherBonus = getSizeBonus(this.state.quirkInfo["Collapsible"].customValue);
      this.setReq("Metaptropi", Math.min(Math.max(thisBonus - otherBonus,1),5));
    }
    if(this.isSelected("Concealed")){
      this.setReq("Metaptropi", 2);
    }
    if(this.isSelected("Normal-Looking")){
      this.setReq("Metaptropi", 1);
    }
    if(this.isSelected("Onboard Storage")){
      this.setReq("Automata", 1);
    }
    return anyReqs ? reqs : null;
  }

  getManiaCost = () => {
    const flavor = axiomDefs[this.state.basicInfo.axiom].flavors[this.state.basicInfo.level][this.state.basicInfo.flavor];
    var cost = 0;
    if("mania" in flavor){
      cost = flavor.mania;
    }
    if("customMania" in flavor){
      cost += flavor.customMania(this.state.basicInfo);
    }
    if(this.isSelected("Mania Cost")){
      cost += this.state.quirkInfo["Mania Cost"].customValue;
    }
    return cost;
  }

  render() {
    const flavor = axiomDefs[this.state.basicInfo.axiom].flavors[this.state.basicInfo.level][this.state.basicInfo.flavor];
    const coremod = this.getCoreModifier();
    const requiredAxioms = this.getRequiredAxioms();
    const requiredSkills = axiomDefs[this.state.basicInfo.axiom].getRequiredSkills(this.state.basicInfo,this.state.quirkInfo).join(", ");
    var flavorText = flavor.description
    flavorText = flavorText.replace("CORE+OPT",toPlusMinus(coremod + this.state.basicInfo.flavorOptions, true, false));
    flavorText = flavorText.replace("CORE-OPT",toPlusMinus(coremod - this.state.basicInfo.flavorOptions, true, false));
    flavorText = flavorText.replace(/CORE/g,toPlusMinus(coremod, true, false));

    const flavorModules = axiomDefs[this.state.basicInfo.axiom].flavorModules;
    for(var label in flavorModules){
      var re = new RegExp(label,"g");
      flavorText = flavorText.replace(re,flavorModules[label](coremod, this.state.quirkInfo));
    }

    for(var i in this.state.basicInfo.flavorOptions){
      var re = new RegExp("IF"+i+"(.*?)ENDIF");
      if(this.state.basicInfo.flavorOptions[i] === true){
        flavorText = flavorText.replace(re,'$1');
      }else{
        flavorText = flavorText.replace(re,"");
      }
    }

    const maniaCost = this.getManiaCost();
    if(maniaCost > 0){
      const text = ("maniaText" in flavor) ? flavor.maniaText : "Costs MANIA to activate for a scene."
      flavorText += "BREAK" + text.replace(/MANIA/g,maniaCost + " Mania");
    }

    flavorText = flavorText.replace(/([0-9]+)\+([0-9]+)/g,(match,s1,s2) => parseInt(s1)+parseInt(s2));

    if(requiredAxioms){
      var reqText = "Requires:"
      for (var axiomRequirement in requiredAxioms){
        reqText += " " + axiomRequirement;
        reqText += " " + ("•".repeat(requiredAxioms[axiomRequirement]));
        reqText += ",";
      }
      flavorText += "BREAK" + reqText.substring(0, reqText.length - 1);
    }

    flavorText += "BREAKConstruction Skills: " + requiredSkills;

    return (
      <div className = "panel">
        <BasicFields
          basicInfo = {this.state.basicInfo}
          onValueChange = {(k,v) => this.updateInfo(k,v,'basicInfo')}
        />
        <div style = {{margin: 4, padding: 4, backgroundColor: "#eee"}}>
          {addLineBreaks(flavorText)}
        </div>
        <QuirkFields
          quirkInfo = {this.state.quirkInfo}
          basicInfo = {this.state.basicInfo}
          setSelected = {(k,v) => this.updateInfo(k,v,'quirkInfo')}
          allQuirks = {this._allQuirks}
        />
      </div>
    );
  }
}