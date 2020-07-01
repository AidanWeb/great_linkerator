const { client } = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = process.env.SALT_COUNT || 10;

async function hashStr(str) {
    const hash = await bcrypt.hash(str, SALT_COUNT);
    return hash;
}

async function createUser ({username, password}){
    try {
        const pw = await hashStr(password);
        const {rows} = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [username, pw]);

        return rows;
    } catch (e) {
        console.log(`Failed to create user`)
        throw e;
    }
}

async function getUser ({ username, password }) {
    try {
        const user = await getUserByUsername(username);
        const authenticated = await bcrypt.compare(password, user.password)
        if (!authenticated) {
            throw new Error('invalid password');
        }
        return user;
    } catch (e) {
        console.log(`Could not authenticate user`, e)
    }    
}

async function getAllUsers () {
    try {
        const { rows } = await client.query(`
            SELECT * FROM users;
        `);
        return rows;
    } catch (e) {
        console.log(`Could not get users`)
    }    
}

async function getUserByUsername (username) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE username=$1;
        `, [username]);

        return user;
    } catch (e) {
        console.log(`> failed to get user with username ${username}`)
        throw e;
    }
}
async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE id=$1;
        `, [id]);

        return user;
    } catch (e) {
        console.log(`> failed to get user with id ${id}`)
        throw e;
    }
}

module.exports = {
    getUserByUsername,
    getAllUsers,
    getUser,
    createUser,
    hashStr,
    getUserById
}