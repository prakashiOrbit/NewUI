import React, { Component } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { FormControl } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Container, InputLabel, Input, FormHelperText, Button, Grid } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {config} from "../../Constants/constant";

//import SmartConnect from "@iorbit-tech/smart-connect";
import SmartConnect from "../smart-connect/smart-connect";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      open: false,
      openf: false
    };

  this.onLoginClick = this.onLoginClick.bind(this);
  this.child = React.createRef();

  }
  
  /** Updates name and password states */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /** Handles login submit */
  onLoginClick = () => {
    if(this.state.username === '' || this.state.password === ''){
      this.handleClickOpen();
    }else{
      const userData = {
        username: this.state.username,
        password: this.state.password
      };

      var test = this.child.current.authenticate(userData.username, userData.password);
      console.log(test);

      if(test === undefined){
        this.handleClickOpenf();
      }else{
        // To do: Redirection using class component is not working. Will have to upgrade this to a functional component
      }

      console.log("Login " + userData.username + " " + userData.password);
    }

  };

  /** Open for validation error */
  handleClickOpen = () => {
    this.setState({open:true});
  };

  /** Close for validation error */
  handleClose = () => {
    this.setState({open:false});
  };

  /** Open for api faliures */
  handleClickOpenf = () => {
    this.setState({openf:true});
  };

  /** Open for api faliures */
  handleClosef = () => {
    this.setState({openf:false});
  };

  render() {
    return (
      <Container maxWidth="sm">
      <CssBaseline />
          <form>
            <Grid container direction={"column"} spacing={5}>\
              <Grid item>
                <Typography variant="h3" noWrap component="div">
                Login
                </Typography>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="my-input">User name</InputLabel>
                  <Input id="username" aria-describedby="my-helper-untext" name="username" onChange={this.onChange} />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="my-input">Password</InputLabel>
                  <Input id="password" aria-describedby="my-helper-passtext" name="password" onChange={this.onChange} />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <Button variant="contained" type="button" onClick={this.onLoginClick}>Login</Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
          <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            User name or password missing.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={this.state.openf}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClosef}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Authentication faliure.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClosef}>Ok</Button>
        </DialogActions>
      </Dialog>

      <SmartConnect server={config.host} port={config.port} tenant={config.tenant} flow="farmer" flowEvent="farmerEvent" ref={this.child} /> 
      </Container>
    );
  }
}

export default Login;