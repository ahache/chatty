import React, {Component} from 'react';

class Chatbar extends Component {

  getUser = (event) => {
    const username = event.target.value ? event.target.value : 'Anonymous';
    this.props.updateCurrentUser(username);
  }

  handleInput = (event) => {
    if (event.key === 'Enter') {
      this.props.onNewPost(event.target.value);
      event.target.value = '';
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.getUser} defaultValue={ this.props.currentUser }/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput} />
      </footer>
    );
  }
}
export default Chatbar;
