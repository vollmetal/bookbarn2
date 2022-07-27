import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from './components/MainPage';
import Registration from './components/Registration';
import Login from './components/Login';
import AddBook from './components/AddBook';
import bookReducer from './stores/reducers/bookReducer';
import userReducer from './stores/reducers/userReducer';
import CartPage from './components/CartPage';
import * as userCreators from './stores/creators/userCreators'

const rootReducer = combineReducers({
  bookReducer: bookReducer,
  userReducer: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App>
      <Routes>
        <Route path="/" element = {<MainPage />}/>
        <Route path="/usercart" element = {<CartPage />}/>
        <Route path="/registration" element = {<Registration />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path='/add-book' element = {<AddBook/>}/>
      </Routes>
    </App>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
