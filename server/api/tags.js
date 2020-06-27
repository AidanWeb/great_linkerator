const express = require('express');
const tagsRouter = express.Router();
const { getTagByName, createTag, getAllTags } = require('../db');
const { requireUser } = require('./utils');

tagsRouter.use( (req, res, next) => {
    console.log(`A request has been made to the /tags route`);
    next();
})

tagsRouter.get('/', async (req, res, next) => {
    try {
        const tags = await getAllTags();
        
        res.send({tags})
    } catch (e) {
        next(e)
    }
})

tagsRouter.get('/:tagName', async (req, res, next) => {
    const { tagName } = req.params;

    try {
        const tag = await getTagByName(tagName);
        
        res.send({tag})
    } catch (e) {
        next(e)
    }
})

tagsRouter.post('/', requireUser, async (req, res, next) => {
    const {name} = req.body;
    try {
        const tag = await createTag({name});
        
        res.send({message: "Tag created Successfully", tag})
    } catch (e) {
        next(e)
    }
})

module.exports = tagsRouter