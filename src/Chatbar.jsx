import React, {Component} from 'react';

class Chatbar extends Component {

  constructor() {
    super();
    this.state = {
      content: '',
      user: 'Anonymous'
    }
  }

  getUser = (event) => {
    this.setState({user: event.target.value});
  }

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
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyUp={this.getUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleInput} />
      </footer>
    );
  }
}
export default Chatbar;
