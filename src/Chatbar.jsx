import React, {Component} from 'react';

class Chatbar extends Component {

  constructor() {
    super();
    this.state = {
      content: '',
      user: 'Alex'
    }
  }

  getUser = (event) => {
    const username = event.target.value ? event.target.value : 'Anonymous';
    this.setState({user: username});
    this.props.updateCurrentUser(username);
  }

  // Pass state through callback after user enters message
  handleInput = (event) => {
    if (event.key === 'Enter') {
      this.setState({content: event.target.value}, function() {
        this.props.onNewPost(this.state);
      });
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
