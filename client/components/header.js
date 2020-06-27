import {
    Navbar,
    Form,
    InputGroup,
    Button,
    FormControl,

} from 'react-bootstrap';
import React from 'react';


const Header = ({}) => {
    return (
        <Navbar className="bg-light justify-content-left">
            <Form inline>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Form>
            <Form inline>
                <FormControl type="password" placeholder="Password" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
            </Form>
        </Navbar>
    )
}

export default Header;