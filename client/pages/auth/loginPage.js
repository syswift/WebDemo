import React from 'react';
import { OutlinedInput, TextField, InputLabel, FormControl, 
         InputAdornment, IconButton, Button, FormHelperText } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import Router from 'next/router';

const signin = () => {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        email: '',
        errors: [],
        email_err_text: [],
        is_email_err: false,
        pass_err_text: [],
        is_pass_err: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#757CE8',
            },
            secondary: {
                main: '#FFFFFF',
            },
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        
        const email = values.email;
        const password = values.password;

        setValues({...values,
            is_email_err: false,
            is_pass_err: false,
            email_err_text: [],
            pass_err_text: [],
        });

        try{
            const response = await axios.post('/api/auth/signin', {
                email, password
            })
            console.log(response);
            //success sign up
            Router.push('/');
        } 
        catch (err) {
            values.errors = err.response.data.errors;
            console.log(values.errors);

            let email_err_text = [];
            let pass_err_text = [];
            values.errors.map(function(error){
                switch(error.message)
                {
                    case 'Email must be valid':
                        email_err_text.push(error.message);
                        values.is_email_err = true;
                        break;
                    case "You must supply a password":
                        pass_err_text.push(error.message);
                        values.is_pass_err = true;
                        break;
                    default:
                        email_err_text.push(error.message);
                        values.is_email_err = true;
                        pass_err_text.push(error.message);
                        values.is_pass_err = true;
                }
            });
            
            setValues({...values, email_err_text: email_err_text, 
                        pass_err_text: pass_err_text
            });
        }
    }
    
    return (
        <form id="signupForm" autoComplete="on" onSubmit={onSubmit}>
            <h1 >Log In</h1>
            <div className="comp">
            <TextField 
                helperText = { values.email_err_text.length > 0 && (
                    <ul className="err_ul">
                        {values.email_err_text.map((error)=>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                )}
                error = {values.is_email_err}
                fullWidth
                id="email" 
                variant="outlined"  
                type="email"
                label="Email"
                placeholder="Input a valid email address"
                onChange={handleChange('email')}/>
            </div>

            <div className="comp">
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password" error = {values.is_pass_err}>{'Password'}</InputLabel>
            <OutlinedInput
                id="password" 
                error = {values.is_pass_err}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                placeholder="Password must be between 8 and 20 characters"
                onChange={handleChange('password')}
                labelWidth={70}
                aria-describedby = "pass-err"
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id="pass-err" error = {values.is_pass_err}>
                { values.pass_err_text.length > 0 && (
                    <ul className="err_ul">
                        {values.pass_err_text.map((error)=>
                            <li key={error}>{error}</li>
                        )}
                    </ul>
                )}
            </FormHelperText>
            </FormControl>
            </div>

            <div className="comp">
            <ThemeProvider theme={theme}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                     Log In
                </Button>
            </ThemeProvider>
            </div>
        </form>
    );
};

export default signin;