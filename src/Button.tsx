import React, { Component } from "react";

export default class Button extends Component<{
  textSize?: string;
  rounded?: string;
  type?: string | any;
  bg?: string;
  btnClass?: string;
  disabled?: boolean;
  contClass?: string;
  children?: any;
  text?: string;
}> {
  render() {
    let textSize = "";
    switch (this.props.textSize) {
      case "sm":
        textSize = "text-sm";
        break;
      case "md":
        textSize = "text-md";
        break;
      case "lg":
        textSize = "text-lg";
        break;
      default:
        textSize = "text-xl";
    }

    let bg = this.props.bg
      ? this.props.bg
      : "bg-base-500 hover:bg-base-600 dark:hover:bg-base-400 ring-base-500 hover:shadow-lg text-white";
    let rounded = this.props.rounded ? this.props.rounded : "rounded-md";
    const type = this.props.type ? this.props.type : "submit";
    const btnClass = this.props.btnClass ? this.props.btnClass : "px-5 py-3";

    return (
      <div className={this.props.contClass}>
        <button
          disabled={this.props.disabled}
          className={textSize + " " + bg + " " + rounded + " " + btnClass}
          type={type}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}
