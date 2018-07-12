import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      donorId: '',
      donors: []
    }
  }

  handleChange = event => {
    this.setState({
      donorId: event.target.value
    })
  }

  handleClick = () => {
    console.log('called');
    axios.get(`http://localhost:8080/${this.state.donorId}`)
      .then((res) => {

        this.setState({
          donors: res.data
        })
        //  console.log(this.state.donors);
      })

  }

  getCsv = () => {
    axios.get(`http://localhost:8080/export/${this.state.donorId}`)
      .then(res => {
        window.location = `http://localhost:8080/export/${this.state.donorId}`
      });
  }
  
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
