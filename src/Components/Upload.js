import React, { Component } from 'react';
import {Jumbotron } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';

const IPFS = require('ipfs');


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {

            fileHash: "",
            uploadedStatus: "Upload a file to IPFS"
        }
    }
    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = (e) => {
            const node = new IPFS();
            console.log(reader)
            node.on('ready', (ver) => {
                node.files.add({
                    path: 'file',
                    content: Buffer.from(reader.result)
                }, (err, filesAdded) => {
                    if (err) { console.log(err); }

                    // Once the file is added, we get back an object containing the path, the
                    // multihash and the sie of the file
                    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash)

                    var fileMultihash = filesAdded[0].hash
                    this.setState({fileHash:fileMultihash})

                    node.files.cat(fileMultihash, (err, data) => {
                        if (err) { console.log(err) }

                        console.log('\nFile content:')
                        // print the file to the terminal and then exit the program
                        console.log(data.toString())
                    })
                })
            })

        }
        reader.readAsText(files[0]);
    }
    handlePrivKeyChange = (e) => {
        this.setState({ privKey: e.target.value })
    }
    handleContractAddressChange = (e) => {
        this.setState({ contractAddress: e.target.value })
    }
    
    render() {
        return (
            <div>
                <Jumbotron style={{ padding: "40px", margin: "10% auto", width: "500px", height: "600px", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
                    <h3>UPLOAD</h3>
                    <div>
                        <div>{this.state.uploadedStatus}</div>
                        <br />
                        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'*'}>
                            <button className='btn'>Upload</button>
                        </ReactFileReader>
                    </div>
                    <div>{this.state.fileHash && `File Hash: ${this.state.fileHash}`}</div>



                </Jumbotron>
            </div>
        );
    }
}


export default Upload;