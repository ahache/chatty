import React, {Component} from 'react';

class Message extends Component {
  render() {
    // If user switches to anonymous, set color to black
    const styles = this.props.username === 'Anonymous' ? {color:'#000000'} : {color:this.props.color};
    const content = this.props.content;
    // Image links will be displayed
    if (content.search(/(.png|.jpg|.gif)$/) > -1) {
      return (
        <div className="message">
          <span className="message-username" style={styles}>{this.props.username}</span>
          <img className="message-image" src={content} alt={content} ></img>
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username" style={styles}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );      
    }

  }
}
export default Message;
