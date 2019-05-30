import React, { Component } from "react";
import socketOpen from "socket.io-client";
import { Table } from "semantic-ui-react";

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
        <Table style={{ maxWidth: 650 }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Message</Table.HeaderCell>
              <Table.HeaderCell>Priority</Table.HeaderCell>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.messages &&
              this.state.messages.map((data, index) => {
                console.log(data);
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{data.message}</Table.Cell>
                    <Table.Cell>{data.priority}</Table.Cell>
                    <Table.Cell>{data.timestamp}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
