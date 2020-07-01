import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
    Header,
    Results,
    AddModal
} from './components'
const axios = require('axios')
const API_URL = '../api';
const app = document.querySelector('#app');

const App = () => {
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);

    useEffect( ()=> {
        const fetchResults = async () => {
            const {data} = await axios.get(`${API_URL}/links`);
        
            setResults(data.links);   
        };
        fetchResults();
    }, []);

    return (
        <>
            <Header
                setResults = {setResults}
                setShow={setShow}/>
            <Results 
                setResults={setResults}
                results= {results}/>
            <AddModal
                show={show}
                setShow={setShow}
                results={results}
                setResults={setResults}/>
        </>
    )
}

ReactDOM.render(
    <App />,
    app,
    () => {
        console.log(`application rendered!`)
    }
)