import React, {useState, useEffect} from 'react';
import {
    Card,
    Button
} from 'react-bootstrap';
const API_URL = '../../api';
const axios = require('axios');

const LinkCard = ({id, title, clicks, date, comment, url, tags, setResults}) => {
    const handleClick = (event) => {
        const linkId = event.target.id;
        axios.patch(`${API_URL}/links/click/${linkId}`);
    
        const fetchResults = async () => {
            const {data} = await axios.get(`${API_URL}/links`);
        
            setResults(data.links);   
        };
        fetchResults();
    }

    const searchByTag = (event) => {
        const tagName = event.target.value;
        document.getElementById('search').value = tagName
        axios.get(`${API_URL}/links`, )
        .then((response) => {
            console.log('search response: ', response);
            const allLinks = response.data.links;
            const results = allLinks.filter((link) => {
                const inclTag = link.tags.some((tag) => {
                    return tag.name.includes(tagName)
                });
                return inclTag;
            })
            setResults(results)
        })
        .catch(e => console.error);
    } 

    return (
        <Card style={{ width: '60%', margin: '1em' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Clicked {clicks} times since {date}</Card.Subtitle>
                <Card.Text>
                    {comment}
                </Card.Text>
                <div className="card-tags-container">
                    {tags.map((tag) => (
                            <Button 
                            id={tag.id}
                            key={tag.id}
                            variant="outline-info"
                            onClick={searchByTag}
                            >{tag.name}</Button>
                        ))}
                </div>
                <Card.Link
                id={id}
                href={url} 
                target="_blank"
                onClick={handleClick}>Visit Site</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default LinkCard;