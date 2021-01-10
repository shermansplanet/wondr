import React, { Component } from 'react';

export default class Dots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hovercount : 1,
      hovering: false,
    };
  }

  dotClick = (i) => {
    this.setState({hovering: false});
    this.props.onChange({target: {value: i}});
  };

  enter = (i) => this.setState({hovering: true, hovercount : i});

  exit = (i) => this.setState({hovering: false});

  render() {
    var dots = [];
    for(var i=1; i<=5; i++){
      const consti = i;
      var filled = i <= (this.state.hovering ? this.state.hovercount : this.props.value);
      dots[i] = <div
        style={{display: 'inline-block', cursor:'pointer', width: '12px'}}
        onClick = {()=>this.dotClick(consti)}
        onMouseEnter = {()=>this.enter(consti)}
        onMouseLeave = {()=>this.exit(consti)}
        >
        {filled ? '\u25CF' : '\u25CB'}
      </div>;
    }
    return (
      <div className = 'dots'
        style = {this.state.hovering ? {color: '#aaa'} : {}}>
        {dots}
      </div>
    );
  }
}