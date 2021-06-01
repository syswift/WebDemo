import '@material-ui/core';
import '../globalStyle.css';

const global = ({Component, pageProps}) =>{
    return <Component {...pageProps} />
}

export default global;