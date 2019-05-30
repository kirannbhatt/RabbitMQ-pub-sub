import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: "test"
    };
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <h1>{this.state.messages}</h1>
      </div>
    );
  }
}

export default App;
