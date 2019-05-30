import React, { Component } from "react";
import socketOpen from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const socket = socketOpen("http://localhost:3005");
    socket.on("message", message => {
      // console.log(message);
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.messages &&
          this.state.messages.map((data, index) => {
            console.log(data);
            return <li key={index}>{data.message}</li>;
          })}
      </div>
    );
  }
}

export default App;
