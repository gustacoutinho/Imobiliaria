import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import api from '../services/api';
import { login } from '../services/auth';
import Button from '@material-ui/core/Button';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';




class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login : "",
            senha : "",
            error : false,
            isLoggedIn : false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
          })
        console.log(event.target.value);
    }

    handleClick(event) {
        event.preventDefault()
        this.setState({ isLogging: true, error: false })
        api
        .post("/login", this.state)
            .then((response) => {    
            console.log(localStorage.getItem("@imobiliaria-token"))
            login(response.data.data.token) //autenticado e token salvo no navegador
            this.setState({
                isLoggedIn: true
            })
            
        })
        .catch((error) => {
            console.log('error')
            this.setState({
                error: true,
                isLogging: false
              })
        })
      }
    
      render() {
        if (this.state.isLoggedIn) {
          return <Redirect to='/home' />
        }         
    return (
        <form onSubmit={this.handleClick} >
        <Grid  container  spacing={0} direction="column" alignItems="center" justifyContent="center" marginBottom="-8vh" style={{ minHeight: '100vh' }} sx={{'& > :not(style)': { m: 1.5, width: '50ch' },}}>
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center',}}>        
        <Typography align="center" component="h1" variant="h5">
            Login
        </Typography>
        <AccountCircleIcon fontSize="large"/>
        </Box>
            <TextField value = {this.state.login} onChange={this.handleChange} variant="outlined" required={true} label = "Usuário" id="outlined-basic margin-dense" name = "login" /> 
            <TextField value = {this.state.senha} onChange={this.handleChange} variant="outlined" required={true} label = "Senha" id="outlined-basic margin-dense" type = "password" name = "senha" autoComplete="current-password" />
              <Grid container>
                  <Grid item xs>
                    <Link href="https://www.instagram.com/gucoutiinho/" variant="body2">
                      Esqueceu sua senha?
                    </Link>
                  </Grid>
                <Grid item>
                  <Link href="/singup" variant="body2">
                    {"Não possui uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
              {this.state.error && <Snackbar
                  open={this.state.error}
                  autoHideDuration={6000}
                  onClose={() => this.setState({error: false})}
                  message="Usuário e/ou senha inválido(s)"
                  action={<IconButton
                              size="large"
                              aria-label="close"
                              style={{ color: "red" }}
                              onClick={() => this.setState({error: false})}>
                              <CloseIcon fontSize="small"/>
                          </IconButton>}
              />}
            <Button  size="large" startIcon={<LoginIcon />} variant = 'contained' color = 'primary' type='submit' >Acessar</Button>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" text-align= "flex-end">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/mapsiva/csbeg13">
            csbeg13
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
            </Typography>
        </form>   
    )
    }
}

export default Login;