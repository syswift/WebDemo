import '@material-ui/core';
import '../globalStyle.css';
import Navbar from '../component/navbar';
import buildClient from '../api/build-client';

const global = ({Component, pageProps, currentUser}) =>{
    return (
    <div>
        <Navbar currentUser={currentUser}/>
        <Component {...pageProps} />
    </div>
    );
}

global.getInitialProps = async (appContext) => {
    const { data } = await buildClient(appContext.ctx).get('api/auth/currentuser');

    let pageProps;
    if(appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {pageProps, ...data};
};

export default global;