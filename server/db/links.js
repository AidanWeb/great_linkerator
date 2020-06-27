const { client } = require('./client');
const { getTagsByLink } = require('./link_tags')

//      READ:
async function getAllLinks () {
    try {
        const {rows: links} = await client.query(`
            SELECT * FROM links;
        `);

        const results = links.map(async (link) => {
            const tags = await getTagsByLink(link);
            link.tags = tags;
            return link;
        });

        const linkObj = await Promise.all(results).then((arr) => {
            console.log(arr);
            return arr;
        });

        return linkObj;
    } catch (e){
        throw (e)
    }
}

async function getLinksByUser(userId) {
    try {
        const {rows: links} = await client.query(`
            SELECT * 
            FROM links
            WHERE "creatorId"=$1;
        `, [userId]);

        return links;
    } catch (e){
        throw (e)
    }
}

async function getLinkById(id) {
    try {
        const {rows: links} = await client.query(`
            SELECT * 
            FROM links
            WHERE id=$1;
        `, [id]);

        return links[0];
    } catch (e){
        throw (e)
    }
}

//      CREATE: 
async function createLink({creatorId, link, comment}) {
    const date = new Date();

    try {
        const { rows } = await client.query(`
            INSERT INTO links ("creatorId", link, comment, date)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [creatorId, link, comment, date]);

        return rows;
    } catch (e) {
        throw e;
    }
}

//      UPDATE: 
async function incrementClicks (id) {
    try {
        const { rows } = await client.query(`
            SELECT * FROM links
            WHERE id=$1;
        `, [id])

        let [{ clicks }] = rows;
        clicks += 1;

        const { rows: link } = await client.query(`
            UPDATE links
            SET clicks=$1
            WHERE id=$2
            RETURNING *;
        `, [clicks, id]);
        console.log("A link has been clicked")
        return link;
    } catch (e) {
        throw(e)
    }
}

async function updateLink ({id, link, comment}) {
    try {
        const l = link ? `link='${link}'` : '';
        const c = comment ? `comment='${comment}'` : ''; 
        const setStr = [l, c].join(', ');
        console.log(setStr)

        const {rows} = await client.query(`
        UPDATE links
        SET ${setStr}
        WHERE id=$1
        RETURNING *;
    `, [id]);

    return rows;
    } catch (e) {
        throw(e)
    }
}

//      DESTROY:
async function destroyLink (id) {
    try {
        const {rows} = await client.query(`
            DELETE
            FROM links
            WHERE id=$1;
        `, [id])

        return {message: 'Link permanently deleted'}
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getAllLinks,
    getLinkById,
    getLinksByUser,
    createLink,
    incrementClicks,
    updateLink,
    destroyLink,
}