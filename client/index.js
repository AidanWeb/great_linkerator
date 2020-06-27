import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    Header,
} from './components'

const app = document.querySelector('#app');

ReactDOM.render(
    <Header></Header>,
    app,
    () => {
        console.log(`application rendered!`)
    }
)