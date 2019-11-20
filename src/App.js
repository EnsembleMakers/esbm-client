import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PrivateRoute from './PrivateRoute'
import { Home, Login, CustomerInfo, CustomerInfoSuccess, OrderManage, ModelManage, Order, Model, ReviewSeries, ReviewSeriesId, ReviewOrder, Review } from './pages';
import { HeaderContainer } from './containers/Base';
import { UserMenuContainer } from './containers/Base';
import * as userActions from './store/modules/user';
import storage from './lib/storage';

class App extends Component {

    // 로그인 세션 종료
    initializeUserInfo = () => {
        const loggedInfo = storage.get('loggedInfo');
        const { UserActions } = this.props;
        if(!loggedInfo) {
            UserActions.setLoggedInfo({ logged: false, loggedInfo: null }); 
            return;
        }
        UserActions.setLoggedInfo({ logged: true, loggedInfo: loggedInfo });
        try{
            UserActions.checkStatus();
        }catch(e) {
            storage.remove('loggedInfo');
            window.location.href = '/login/signin?expired';
        }
    }

    constructor(props) {
        super(props);
        this.initializeUserInfo();
    }

    render() {
        const { logged } = this.props;
        return (
            <div>
                <HeaderContainer/>
                <UserMenuContainer/>
                <Route exact path="/" component={Home}/>
                <Route path="/order/:id" component={Order}/>
                <Route path="/login" component={Login}/>
                <Route path="/customerInfo/:id" component={CustomerInfo}/>
                <Route path="/customerInfoSuccess" component={CustomerInfoSuccess}/>
                <PrivateRoute path="/orderManage" logged={logged} component={<OrderManage/>}/>
                <PrivateRoute path="/modelManage" logged={logged} component={<ModelManage/>}/>
                <Route path="/model/:number/:name" component={Model}/>
                <Route exact path="/reviewSeries" component={ReviewSeries}/>
                <Route path="/reviewSeries/:model" component={ReviewSeriesId}/>
                <Route path="/reviewOrder/:id" component={ReviewOrder}/>
                <Route path="/review/:id" component={Review}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        logged: state.user.get('logged'),
        loggedInfo: state.user.get('loggedInfo') 
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(App);