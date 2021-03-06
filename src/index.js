import React from 'react';
import ReactDOM from 'react-dom';
import App from './View/App';
import * as serviceWorker from './serviceWorker';
import socketIOClient from "socket.io-client";
// const ENDPOINT = "https://ws.gwillia.ms/";
const ENDPOINT = "http://127.0.0.1:3030/";

const socket = socketIOClient(ENDPOINT);

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
