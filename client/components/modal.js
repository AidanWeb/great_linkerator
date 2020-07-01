import React, {useState} from 'react';
import {
    Modal,
    Button,
    Form,
    FormControl,
    InputGroup
} from 'react-bootstrap';
const API_URL = '../../api';
const token = localStorage.getItem('token');
const axios = require('axios');

const AddModal = ({show, setShow, setResults, results}) => {
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [url, setUrl] = useState("")
    const [tagNames, setTagNames] = useState([]);
    const [tags, setTags] = useState([]);
    const [linkId, setLinkId] = useState([]);

    const handleClose = () => setShow(false);

    const handleSubmit = () => {
        console.log(`submitting change`)
        const headers = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`}
        axios.post(`${API_URL}/links`, {title, comment, url}, {headers: headers})
        .then(response => {
            console.log(response.data.link)
            setLinkId(response.data.link[0].id)
        })

        const getTagsArr = async () => {
            const tagsArr = tagNames.map(async (tag) => {
                const {data} = await axios.post(`${API_URL}/tags`, {name: tag}, {headers: headers})
                console.log(data);
                return data.tag[0]
            })
            console.log(tagsArr)
            setTags(tagsArr)
        }

        tags.forEach(tag => {
            const tagId = tag.id;
            console.log(tag)
            axios.post(`${API_URL}/links/${linkId}`, {tagId: tagId}, {headers: headers})
        })

        axios.get(`${API_URL}/links`)
            .then((res) => {
                setResults(res.data.links);  
        })
        

        handleClose()
    }

    const handleTagAdd = () => {
        let newTag = document.getElementById('tagAdd').value;
        if (tagNames.includes(newTag)) {
            return;
        }
        setTagNames([...tagNames, newTag])
        console.log(newTag, tagNames)
    }
    const removeTag = (event) => {
        const id = event.target.id;
        const idx = tagNames.indexOf(id);
        tagNames.splice(idx, 1);
        setTagNames([...tagNames])
    }

    const handleTitleChange = event => setTitle(event.target.value)
    const handleCommentChange = event => setComment(event.target.value)
    const handleUrlChange = event => setUrl(event.target.value)
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Title</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    onChange={handleTitleChange}
                    value={title}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">URL</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    onChange={handleUrlChange}
                    value={url}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Comment</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    onChange={handleCommentChange}
                    value={comment}
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Tags</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    id="tagAdd"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    />
                    <Button 
                        variant="outline-success"
                        onClick={handleTagAdd}
                        >Add</Button>
                </InputGroup>
                {tagNames 
                ?                
                <div id="tag-container">
                    {tagNames.map((tag) => (
                        <Button 
                        id={tag}
                        key="tag"
                        variant="outline-danger"
                        onClick={removeTag}
                        >{tag}</Button>
                    ))}
                </div>
                : <></>}

            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
          variant="primary" 
          onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddModal;