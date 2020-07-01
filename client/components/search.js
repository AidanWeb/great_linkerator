import {
    InputGroup,
    Button,
    FormControl,

} from 'react-bootstrap';
import React, { useState } from 'react';
const axios = require('axios');
const API_URL = '../../api';

const SearchBar = ({setResults}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        axios.get(`${API_URL}/links`, )
            .then((response) => {
                console.log('search response: ', response);
                const allLinks = response.data.links;
                const results = allLinks.filter((link) => {
                    const inclUrl = link.url.includes(searchTerm)
                    const inclTag = link.tags.some((tag) => {
                        return tag.name.includes(searchTerm)
                    });
                    return inclUrl || inclTag;
                })
                setResults(results)
            })
            .catch(e => console.error);
    }

    const handleSearchTerm = event => {
        setSearchTerm(event.target.value)
    }



    return (
        <InputGroup className="mb-3">
            <FormControl
            id="search"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={handleSearchTerm}
            />
            <InputGroup.Append>
                <Button 
                variant="outline-secondary"
                onClick={handleSearch}
                >Search</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default SearchBar;