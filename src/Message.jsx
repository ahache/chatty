import React, {Component} from 'react';

class Message extends Component {
  render() {
    const styles = {color:this.props.color};
    if ()
    return (
      <div className="message">
        <span className="message-username" style={styles}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}
export default Message;
