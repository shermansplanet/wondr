import React, { Component } from 'react';
import {toPlusMinus} from './utils';

export default class Choice extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      {Object.keys(this.props.choices).map(x => {
        return <div>
          <button
            className = {(this.props.selected === x ? "full" : "empty") + " radio"}
            onClick = {() => this.props.setOption(x)}
          />
          {x + toPlusMinus(this.props.choices[x])}
        </div>
      })}
    </div>
  }
}