const { client } = require('./client');
const { createLink } = require('./links');
const { createUser } = require('./users');
const { createTag } = require('./tags');
const { addTagToLink } = require('./link_tags');
client.connect();

async function dropTables() {
    try {
        client.query(`
            DROP TABLE IF EXISTS link_tags;
            DROP TABLE IF EXISTS links;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS users;
        `)
    } catch (e) {
        console.error(e);
        throw e;
    }
}

async function createTables () {
    try {
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log('> users table created');

        await client.query(`
            CREATE TABLE links (
                id SERIAL PRIMARY KEY,
                "creatorId" INTEGER REFERENCES users(id),
                title VARCHAR(255) UNIQUE NOT NULL,
                url VARCHAR(255) UNIQUE NOT NULL,
                comment TEXT NOT NULL,
                clicks INTEGER DEFAULT 0,
                date VARCHAR(255) NOT NULL
            );
        `)
        console.log(`> activities table created`);

        await client.query(`
            CREATE TABLE tags (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL
            );
        `);
        console.log(`> tags table created`);

        await client.query(`
            CREATE TABLE link_tags (
                id SERIAL PRIMARY KEY,
                "linkId" INTEGER REFERENCES links(id) ON DELETE CASCADE,
                "tagId" INTEGER REFERENCES tags(id),
                UNIQUE ("linkId", "tagId")
            );
        `);
        console.log(`> link_tags table created`);
    } catch (e) {
        throw e;
    }
}

async function createInitialData () {
    try {
        await createUser ({username: "adubs", password: "password1"});

        await createLink ({creatorId: 1, title: "Google", url: "http://google.com", comment: "Little site for all your searching needs"});
        await createLink ({creatorId: 1, title: "Reddit", url: "http://reddit.com", comment: "The front page of the internet"});

        await createTag ({name: "tagLife"});

        await addTagToLink({linkId: 1, tagId: 1});

    } catch (e) {
        throw e;
    }
}
async function seed () {
    console.log(`> Seeding DB`)
    try {
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (e) {
        console.error(e)
    }
}

seed()
    .then(console.error)
    .finally(()=> client.end())