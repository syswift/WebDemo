import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Image from 'next/image';


const Navbar =({currentUser})=>{

    const signoutFunc = async () => {
        await axios.post('/api/auth/signout');
        Router.push('/');
    }

    const showpath = () => {
        try
        {
            console.log(Router.pathname);
            return Router.pathname;
        }
        catch{
            return '/';
        }
    }

        return (
        <AppBar position="static" style={{backgroundColor:"#001540"}}>
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
            </IconButton>
            <Image 
            src="/logo.png"
            alt="logo" 
            width={40} 
            height={40} 
            />
            <Button color="inherit" onClick={()=>{Router.push('/')}}>
            Web Demo
            </Button>
            <div id="pathname" style={{marginLeft:20,flexGrow:1}}>{showpath()}</div>
            {!currentUser
            ? <Button color="inherit" onClick={()=>{Router.push('/auth/loginPage')}}>Log in</Button>
            : <div/>
            }
            {!currentUser
            ? <Button color="inherit" onClick={()=>{Router.push('/auth/signupPage')}}>sign up</Button>
            : <div/>
            }
            {currentUser
            ? <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
            : <div/>
            }
            {currentUser
            ? <Button color="inherit" onClick={signoutFunc}>signout</Button>
            : <div/>
            }
        </Toolbar>
        </AppBar>
        );
}

export default Navbar;
