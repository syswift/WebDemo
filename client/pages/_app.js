import '@material-ui/core';
import '../globalStyle.css';
import Navbar from '../component/navbar';

const global = ({Component, pageProps}) =>{
    return (
    <div>
        <Navbar />
        <Component {...pageProps} />
    </div>
    );
}


export default global;