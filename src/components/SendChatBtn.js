
import { Component } from 'react';
import Avatar from '../features/Avatar';
import SvgIcon from '../icons/SvgIcon';

export default class SendChatBtn extends Component {
  render() {
    const UnreadContClass = this.props.UnreadContClass ? this.props.UnreadContClass : '';
    return (

      <div className="relative py">
        <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
          <img src={<SvgIcon type="SendChat" />} />
        </div>
      </div>
    );
  }
}
