import React, { Component } from "react";

export default class AlertText extends Component<{
  content?: string;
  type: any;
  id?: any;
}> {
  render() {
    let type; // alert type

    const result = () => {
      if (typeof this.props.content === "object") {
        Object.keys(this.props.content).map((key) => {
          return <div className="font-medium">{this.props.content![key]}</div>;
        });
      } else if (typeof this.props.content === "string") {
        return <div className="font-medium">{this.props.content}</div>;
      }
    };
    // define type
    switch (this.props.type) {
      // danger
      case "danger":
        type = "mt-2 text-sm text-red-700 dark:text-red-300";
        break;

      // success
      case "success":
        type = "mt-2 text-sm text-green-700 dark:text-green-300";
        break;

      // base
      case "base":
        type = "mt-2 text-sm text-base-700 dark:text-base-300";
        break;

      // info
      default:
        type = "text-blue-700 dark:text-blue-300";
        break;
    }
    return (
      <div className={type + " flex p-4 mb-4 text-sm "} role="alert">
        <svg
          className="inline flex-shrink-0 mr-3 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        {result()}
      </div>
    );
  }
}
