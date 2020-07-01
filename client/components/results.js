import React, {useState} from 'react';
import {

} from 'react-bootstrap';
import LinkCard, {Card} from './card'

const Results = ({results, setResults}) => {
    console.log(results)
    return (
        <div id="results" className="card-container" style={{
            'width': '100%',
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            marginTop: '15%'
        }}>
            {results.map(result => (
                <LinkCard
                    setResults={setResults}
                    key={result.id} {...result}
                    {...result}/>
            ))}
        </div>
    )
}

export default Results;