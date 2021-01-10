import React, { Component } from 'react';

export default class SizeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      grabbed: false,
      labels: [],
    };
    this.MAX = this.props.max;
    this.POW = 1.5;
    this.labelNumbers = [0,1,2,4,6,12,30];
  }

  grabButton = (e) => {
    document.addEventListener('mousemove', this.onMove, false);
    document.addEventListener('mouseup', this.onRelease, false);
    this.onMove(e);
  }

  onMove = (e) => {
    const w = this.slider.offsetWidth;
    const x = this.slider.getBoundingClientRect().x;
    var lerp = (e.pageX - x) / w;
    lerp = Math.max(Math.min(lerp,1),0);
    this.props.onChange(this.state.value);
    this.setState({value: this.positionToValue(lerp)});
  }

  onRelease = () => {
    document.removeEventListener('mousemove', this.onMove);
    document.removeEventListener('mouseup', this.onRelease);
  }

  positionToValue = (pos) => {
    return Math.round(Math.pow(pos,this.POW) * this.MAX);
  }

  valueToPosition = (val) => {
    return Math.pow(val/this.MAX,1/this.POW);
  }

  updateDimensions = () => {
    const w = this.slider.offsetWidth;
    var labels = this.labelNumbers.map((val,i) => {
      if(val > this.MAX){
        return;
      }
      return <div
        key = {i}
        className = "sliderlabel"
        style = {{left: this.valueToPosition(val) * 100 + "%"}}
      >
        {val == this.MAX ? val + "+" : val}
      </div>
    });
    this.setState({labels: labels});
  }

  componentDidMount = () => {
      window.addEventListener("resize", this.updateDimensions);
      this.updateDimensions();
  }

  render() {
    const val = this.state.value;
    return (
      <div
        className="slidercontainer"
        ref={(slider) => { this.slider = slider; }}
        onMouseDown = {this.grabButton}
      >
        <button
          className="slider"
          style = {{
            left: this.valueToPosition(val) * 100 + "%",
            width: val == this.MAX ? 30 : 20
          }}
        >
          {val == this.MAX ? val + "+" : val}
        </button>
        {this.state.labels}
      </div>
    );
  }
}