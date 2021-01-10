import React, { Component } from 'react';

export default class ScannerTypes extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSelection = (x) => {
    var sels = Object.assign({},this.props.selections);
    sels[x] = sels[x] != true;
    for(var sel in sels){
      if(sels[sel] == true){
        this.props.setSelections(sels);
        return; 
      }
    }
  }

  render() {
    return <div style = {{margin : "0px 8px"}}>
      {this.props.title} (selecting only one gives +1):<br/>
      {Object.keys(this.props.scanTypes).map((x,i) => {
        return <div key = {i} style = {{display: "inline-block"}}>
          <button
            className = {(this.props.selections[x] === true ? "full" : "empty")}
            onClick = {(e) => this.toggleSelection(x)}
          />
          {x}
        </div>
      })}
    </div>
  }
}