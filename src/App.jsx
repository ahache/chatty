import React, {Component} from 'react';
import Navbar from './Navbar.jsx';
import Messages from './Messages.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Messages />
        <Chatbar />
      </div>
    );
  }
}
export default App;
