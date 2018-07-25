import React, { Component } from 'react';
import Download from './Download';
import Upload from './Upload';


class App extends Component {
 
  render() {
    return (
      <div style={{ textAlign: "center", display: 'flex', flexDirection: "column" }}>
        <h1>IPFS File Storing</h1>
        <div className="mainContent" style={{ display: 'flex', justifyContent: "space-around" }}>
          <Download />
          <Upload />
        </div>
      </div>
    );
  }
}

export default App;
