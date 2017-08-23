import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

const data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: data.currentUser.name,
      messages: data.messages
    }
    this.onNewPost = this.onNewPost.bind(this);
  }

  onNewPost(post) {
    const newMessage = {username: post.user, content: post.content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }

  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={ this.state.messages } />
        <Chatbar user={ this.state.currentUser } onNewPost={ this.onNewPost } />
      </div>
    );
  }
}
export default App;
