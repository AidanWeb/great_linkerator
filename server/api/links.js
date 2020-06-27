const express = require('express');
const linksRouter = express.Router();
const { getAllLinks, createLink, addTagToLink, incrementClicks, getLinkById, updateLink,destroyLink } = require('../db');
const { requireUser } = require('./utils');

linksRouter.use((req, res, next) => {
    console.log('> A request has been made to the /links endpoint');
    next();
})

linksRouter.get('/', async(req, res, next) => {
    try {
        const links = await getAllLinks();
        res.send({links});
    } catch (e) {
        console.error(e);
        next(e);
    }
})

linksRouter.post('/', requireUser, async (req, res, next) => {
    const { id: creatorId } = req.user;
    const { link, comment  } = req.body;

    try {
        const newLink = await createLink({creatorId, link, comment})

        res.send({message: "Link created successfully", link: newLink});
    } catch (e) {
        console.error('>>>error:', e.code)
        next(e)
    }
})

linksRouter.post('/:id', async (req, res, next) => {
    const { id: linkId } = req.params;
    const { tagId } = req.body;

    try {
        const response = await addTagToLink({linkId, tagId})

        res.send({response})
    } catch (e) {
        next(e);
    }
})

linksRouter.patch('/:linkId', requireUser, async (req, res, next) => {
    const { linkId: id } = req.params;
    const { link, comment } = req.body;
    const user = req.user;

    try {
        if (!link && !comment) {
            const clickedLink = await incrementClicks(id);
            return res.send({
                name: 'link clicked',
                link: clickedLink
            });
        }
        const {creatorId} = await getLinkById(id);
        if (creatorId !== user.id) {
            return next({
                name: 'UserIsNotCreator',
                message: 'Only the creator can make changes to a routine'
            })
        }
        const updatedLink = await updateLink({id, link, comment});
        console.log(updatedLink)
        return res.send({message: "Link Updated", updatedLink});
        
    } catch (e) {
        next(e);
    }
})

linksRouter.delete('/:linkId', requireUser, async (req, res, next) => {
    const { linkId: id } = req.params;
    const user = req.user;
    console.log('>>user: ', user)

    try {
        const { creatorId } = await getLinkById(id)
        if (creatorId !== user.id) {
            next({
                name: 'UserIsNotCreator',
                message: 'Only the creator can make changes to a routine'
            })
        }
        await destroyLink(id);
        res.send({message: "Routine Successfully Deleted"});
    } catch (e) {
        console.error(e)
        next(e);
    }
})

module.exports = linksRouter;