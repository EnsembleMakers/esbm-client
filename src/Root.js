import React, { useEffect } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';

import App from './App';
import { Provider } from 'react-redux';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO);
const browserHistory = createBrowserHistory();
browserHistory.listen((location, action) => {
    ReactGA.pageview(location.pathname + location.search)
});

const Root = ({store}) => {
    
    // for google analytics
    useEffect(()=>{
        ReactGA.pageview(window.location.pathname + window.location.search);
    },[]);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route path="/" component={App}/>
            </BrowserRouter>
        </Provider>
    );
};

export default Root;
