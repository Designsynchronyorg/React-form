import React, { Component } from 'react';

export default class FullButton extends Component {
    render() {
        let textSize = '';
        switch (this.props.textSize) {
            case 'sm':
                textSize = "text-sm";
                break;
            case 'md':
                textSize = "text-md";
                break;
            case 'lg':
                textSize = "text-lg";
                break;
            default:
                textSize = "text-xl";
        }
        const btnClass = this.props.btnClass ? this.props.btnClass : "bg-base-400 hover:bg-base-600 focus:ring-base-600 focus:border-base-600 dark:hover:bg-base-300 rounded-xl py-3 text-white w-full";
        return (
            <div className={this.props.contClass}>
                <button disabled={this.props.disabled} className={textSize + " " + btnClass} type={this.props.type}>
                    {this.props.text}
                </button>
            </div>
        )
    }
}
