import React, {Component} from 'react';

class Message extends Component {
  render() {
    const styles = this.props.username === 'Anonymous' ? {color:'#000000'} : {color:this.props.color};
    return (
      <div className="message">
        <span className="message-username" style={styles}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
