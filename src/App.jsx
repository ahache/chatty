import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

const colors = ['#FF0000','#00FF00','#0000FF','#FFA500'];

class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: 'Alex',
      messages: []
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket("ws:localhost:3001");

    this.socket.onmessage = (event) => {
      
      const newMessage = JSON.parse(event.data);

      switch (newMessage.type) {
        case 'color':
          this.setState({color: colors[newMessage.index]});
          break;
        case 'count':
          this.setState({userCount: newMessage.userCount});
          break;
        default:
          const messages = this.state.messages.concat(newMessage);
          this.setState({messages: messages});
          break;
      }
    }
  }

  updateCurrentUser(user) {
    if (this.state.currentUser !== user) {
      this.socket.send(JSON.stringify({type: 'update', oldUser: this.state.currentUser, newUser: user}));
      this.setState({currentUser: user});
    }
  }

  onNewPost(post) {
    this.socket.send(JSON.stringify({type: 'content', content: post.content, user: post.user, color: this.state.color}));
  }

  render() {
    return (
      <div>
        <Navbar userCount={ this.state.userCount } />
        <MessageList messages={ this.state.messages } />
        <Chatbar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } updateCurrentUser={ this.updateCurrentUser }/>
      </div>
    );
  }
}
export default App;
