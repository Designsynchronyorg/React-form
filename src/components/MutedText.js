import { Component } from 'react';

export default class MutedText extends Component {
    render() {
        const textClass = this.props.textClass ? this.props.textClass : '';
        return (
            <div className={textClass + " muted-text"}>{this.props.text}</div>
        )
    }
}
