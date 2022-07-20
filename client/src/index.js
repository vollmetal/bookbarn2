import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import userStore from './stores/userStore';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from './components/MainPage';
import Registration from './components/Registration';
import Login from './components/Login';
import AddBook from './components/AddBook';

const store = createStore(userStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App>
      <Routes>
        <Route path="/" element = {<MainPage />}/>
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
