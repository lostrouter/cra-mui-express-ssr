import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/App';
import theme from '../app/theme';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';

function Main() {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    );
}

ReactDOM.hydrate(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
