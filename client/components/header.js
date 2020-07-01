import {
    Navbar,
    Form,
    InputGroup,
    Button,
    FormControl,

} from 'react-bootstrap';
import React, { useState } from 'react';
import SearchBar from './search'
const axios = require('axios');
const API_URL = '../../api';

const Header = ({setResults, setShow}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, toggleLogin] = useState(false)

    const handleShow = () => setShow(true)

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleLogin = ({username, password, isLoggedIn}) => {
        axios.post(`${API_URL}/users/register`, {username, password})
            .then(({status, data}) => {
                console.log({status, data});
                if(status === 200){
                    toggleLogin(true)
                    localStorage.setItem("token", data.token)
                }
            })
            .catch(e => console.error)
    }

    const handleLogout = () => {
        console.log('logging out')
        toggleLogin(false)
        localStorage.removeItem('token')
        console.log(`User logged out`)
    }

    return (
        <Navbar fixed="top" className="bg-light justify-content-left nav" style={{
            'display': 'flex',
            'flexDirection': 'column',
            'height': '15%'}}>
            {isLoggedIn
            ?   <>
                <div id='top-nav' style={{
                    'display': 'flex',
                    'flexDirection': 'row',
                    'justifyContent': 'space-between',
                    'width':'100%'
                }}>
                <Navbar.Brand>Great Linkerator</Navbar.Brand>
                <Button
                        variant="outline-primary"
                        onClick={handleShow}
                    >New Link</Button>
                <div style={{
                    'display': 'flex',
                    'flexDirection': 'row',
                    'alignItems': 'center'}}>

                    <span style={{"padding": "1em"}}>Welcome, {username} </span>
                    <Button 
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault();
                                handleLogout();
                            }}
                        >Logout</Button>
                </div>
                </div>
                <br/>
                <SearchBar 
                    setResults={setResults}/>

                
            </>
            :   <>
                <div id='top-nav' style={{
                    'display': 'flex',
                    'flexDirection': 'row',
                    'justifyContent': 'space-between',
                    'width':'100%'
                }}>
                    <Navbar.Brand>Great Linkerator</Navbar.Brand>
                    <div style={{
                    'width': '70%',
                    'display': 'flex',
                    'flexDirection': 'row',
                    'justifyContent': 'flex-end',
                    'alignItems': 'center'}}>
                    <Form inline>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                name="username"
                                placeholder="Username"
                                aria-label="Username"
                                value={username}
                                onChange={handleUsernameChange}
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </Form>
                    <Form inline>
                        <FormControl 
                            name="password"
                            type="password" 
                            placeholder="Password" 
                            className=" mr-sm-2"
                            value={password}
                            onChange={handlePasswordChange} />
                        <Button 
                            type="submit"
                            onClick={(event) => {
                                event.preventDefault();
                                handleLogin({username, password});
                            }}
                        >Submit</Button>
                    </Form>
                    </div>
                </div>
                <br/>
                <SearchBar 
                    setResults={setResults}/>

            </>
            }
        </Navbar>
    )
}

export default Header;