import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
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

  componentWillMount(){
    axios.get('http://localhost:8080/index')
    .then((res) => {

          this.setState({
            donors: res.data
          });
        });
  }
  // change Text based on the organization id
  changeText = () => {
    if(this.state.donorId){
      return `DONORS FROM ORGANIZATION ${this.state.donorId}`;
    } else {
      return 'ALL DONORS'
    }
  }

  //stores the id for further use
  handleChange = event => {
    this.setState({
      donorId: event.target.value
    })
  }

  // gets the results from the db based on the organzation id
  handleClick = () => {
    console.log('called');
    axios.get(`http://localhost:8080/index/${this.state.donorId}`)
      .then((res) => {

        this.setState({
          donors: res.data
        })
        
      })

  }

  //method to return th csv file with n organization's donors.
  getCsv = () => {
    axios.get(`http://localhost:8080/export/${this.state.donorId}`)
      .then(res => {
        window.location = `http://localhost:8080/export/${this.state.donorId}`
      });
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default" className = "title">
        <Toolbar>
          <Typography variant="title" color="inherit" align ="center">
            Find My Donors!
          </Typography>
        </Toolbar>
      </AppBar>
      <div className = "form-table-container">
      <div className = "form">
        <InputLabel className = "input-guide"> Show donors from Organization </InputLabel>
        <Input value={this.state.name} onChange={this.handleChange} />
         <Button className = "show-button button" variant="contained" color="primary" onClick = {this.handleClick}>
          SHOW DONORS
        </Button>
        </div>
        <Paper >
       <Table >
        <TableHead>
          <TableRow className = "title-row" >
            <TableCell className = "table-title">{this.changeText()} </TableCell>
            < TableCell> </TableCell >
            < TableCell> </TableCell >
            < TableCell > </TableCell>
             < TableCell > </TableCell>
            <Button className = "button row-button" variant="contained" color="secondary" onClick = {this.getCsv}>
             export
            </Button>
          </TableRow>
          <TableRow>
            <TableCell >Organization ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Donation Date</TableCell>
            <TableCell> Donation Amount </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.donors.map((donor, i) => {
      console.log(donor, i);
      return(
        <TableRow key={i}>
                <TableCell component="th" scope="row"> {donor.OrganizationId}</TableCell>
                <TableCell>{donor.FirstName}</TableCell>
                <TableCell>{donor.LastName}</TableCell>
                <TableCell>{donor.EmailAdress}</TableCell>
                <TableCell>{donor.DonationDate}</TableCell>
                <TableCell>{donor.DonationAmount}</TableCell>
        </TableRow>
      )
    })}
        </TableBody>
         </Table>
      </Paper>
      </div>
      </div>
    );
  }
}

export default App;
