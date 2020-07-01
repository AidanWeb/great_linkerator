const { client } = require('./client');

async function getAllTags () {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM tags;
        `);

        return rows;
    } catch (e) {
        throw e;
    }
}

async function getTagByName (name) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM tags
            WHERE name=$1;
        `, [name]);

        return rows;
    } catch (e) {
        throw e;
    }
}

async function createTag ({name}) {
    try {
        const { rows } = await client.query(`
            INSERT INTO tags (name)
            VALUES ($1)
            ON CONFLICT DO NOTHING
            RETURNING *;
        `, [name]);

        return rows;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAllTags,
    getTagByName,
    createTag
}