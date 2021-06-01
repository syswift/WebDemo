import React from 'react';
import { OutlinedInput, TextField, InputLabel, FormControl, 
         InputAdornment, IconButton, Button, FormHelperText } from "@material-ui/core";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

const signup = () => {

    const [values, setValues] = React.useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        email: '',
        errors: [],
        email_err_text: '',
        is_email_err: false,
        pass_err_text: '',
        is_pass_err: false,
        con_pass_err_text: '',
        is_con_pass_err: false,
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
        const con_password = values.confirmPassword;
        try{
            const response = await axios.post('/api/auth/signup', {
                email, password, con_password
            })
            console.log(response);
        } 
        catch (err) {
            values.errors = err.response.data.errors;
            console.log(values.errors);

            let email_err_text = '';
            let pass_err_text = '';
            let con_pass_err_text = '';
            values.errors.map(function(error){
                if(error.message === "Email must be valid" || error.message === "Email in use")
                {
                    email_err_text = error.message;
                }
                else if(error.message === "Password must be between 4 and 20 characters")
                {
                    pass_err_text = error.message;
                }
                else if(error.message === "please input same password as above")
                {
                    con_pass_err_text = error.message;
                }
            });
            
            setValues({...values, email_err_text: email_err_text, 
                        pass_err_text: pass_err_text, con_pass_err_text:con_pass_err_text,
                        is_email_err: email_err_text === '' ? false : true,
                        is_pass_err: pass_err_text === '' ? false : true,
                        is_con_pass_err: con_pass_err_text === '' ? false : true
            });
        }
    }
    
    return (
        <form id="signupForm" autoComplete="off" onSubmit={onSubmit}>
            <h1 >Sign Up</h1>
            <div className="comp">
            <TextField 
                helperText = {values.email_err_text}
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
                placeholder="Password must be between 4 and 20 characters"
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
            <FormHelperText id="pass-err" error = {values.is_pass_err}>{values.pass_err_text}</FormHelperText>
            </FormControl>
            </div>

            <div className="comp">
            <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="con-password" error = {values.is_con_pass_err}>Confirm password</InputLabel>
            <OutlinedInput
                id="con-password" 
                error = {values.is_con_pass_err}
                placeholder="Input same password as above"
                type={values.showPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                labelWidth={130}
                aria-describedby = "con_pass-err"
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
            <FormHelperText id="con_pass-err" error = {values.is_con_pass_err}>{values.con_pass_err_text}</FormHelperText>
            </FormControl>
            </div>

            <div className="comp">
            <ThemeProvider theme={theme}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                     sign up
                </Button>
            </ThemeProvider>
            </div>
        </form>
    );
};

export default signup;