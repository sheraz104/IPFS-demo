import React, { Component } from 'react';
import { Jumbotron, FormControl } from "react-bootstrap";
import AsyncButton from 'react-async-button';
const IPFS = require('ipfs');


class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileHash: "",

        }
    }

    handlefileHash = (e) => {
        this.setState({ fileHash: e.target.value })
    }

    getFile = (e) => {
        e.preventDefault();
        const node = new IPFS();

        node.on('ready', () => {

            node.files.cat(this.state.fileHash, (err, data) => {
                if (err) { console.log(err) }

                console.log('\nFile content:')
                // print the file to the terminal and then exit the program
                console.log(data.toString())

                var element = document.createElement("a");
                var file = new Blob([data.toString()], { type: 'text/plain' });
                element.href = URL.createObjectURL(file);
                element.download = "myFile.txt";
                element.click();
            })
        });


    }
    render() {
        return (
            <div>
                <Jumbotron style={{ padding: "40px", margin: "10% auto", width: "500px", height: "600px", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                    <h3>DOWNLOAD</h3>
                    <div>
                        <label>Enter file Hash</label>
                        <FormControl
                            type="text"
                            value={this.state.fileHash}
                            placeholder="Enter Your file hash..."
                            onChange={this.handlefileHash}
                        />
                    </div>

                    <AsyncButton
                        className="btn"
                        text="Download"
                        pendingText="Saving..."
                        fulFilledText="Transaction Sent!!"
                        rejectedText="Failed! Try Again"
                        loadingClass="isSaving"
                        fulFilledClass="btn-primary"
                        rejectedClass="btn-danger"
                        onClick={this.getFile}
                    />
                </Jumbotron>
            </div>
        );
    }
}


export default Download;