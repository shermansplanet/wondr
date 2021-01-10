import React, { Component } from 'react';
import Choice from '../choices.js';

export default class Factory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <Choice
        choices = {{
          "One Product Only" : 0,
          "Moderate Dynamism" : "a collection of related products",
          "Considerable Dynamism" : "any items in this factory's product category",
          "Full Dynamism" : "any product any factory built by this Genius could create"
          }}
        setOption = {x => this.props.setOptions([x,this.props.selected[1]])}
        selected = {this.props.selected[0]}
      />
      {["One Product Only","Moderate Dynamism"].includes(this.props.selected[0]) ?
      <textarea placeholder="What does this factory make?"
        value={this.props.selected[1]}
        onChange={x => this.props.setOptions([this.props.selected[0],x.target.value])}
      />
      : null}
    </div>
  }
}