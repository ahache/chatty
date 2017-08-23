import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: {name: "Alex"},
      messages: []
    };
    this.onNewPost = this.onNewPost.bind(this);
  }



  componentDidMount() {
    const socket = new WebSocket("ws:localhost:3001");
    this.socket = socket;
    socket.onopen = function (event) {
      console.log("Connected to Server");
    }
  }

  onNewPost(post) {
    // const newMessage = {username: post.user, content: post.content};
    // const messages = this.state.messages.concat(newMessage);
    // this.setState({messages: messages});

    this.socket.send(JSON.stringify(post));

    this.socket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }
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
