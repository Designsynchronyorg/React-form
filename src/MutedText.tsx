import React, { Component } from "react";

export default class MutedText extends Component<{
  textClass: string;
  text: string;
}> {
  render() {
    const textClass = this.props.textClass ? this.props.textClass : "";
    return <div className={textClass + " muted-text"}>{this.props.text}</div>;
  }
}
