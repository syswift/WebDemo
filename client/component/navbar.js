import react from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

class Navbar extends react.Component{
    render(){
        return (
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Button color="inherit">
            Web Demo
            </Button>
            <div style={{flexGrow:1}}></div>
            <Button color="inherit" >Login</Button>
            <Button color="inherit" >signup</Button>
        </Toolbar>
        </AppBar>
        );
    }
}

export default Navbar;
