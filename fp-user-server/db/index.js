import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'data.json')

const adapter = new JSONFile(file)
const defaultData = { users: [] }
const db = new Low(adapter, defaultData)

async function readDatabase() {
    await db.read()

    return await db.data;
}

async function writeDatabase(obj) {
    if (obj === undefined || obj == null) {
        return Error("Object is null");
    }
    try {
        let data = await readDatabase();

        data.users.push(obj);

        await db.write();
        console.log("Object written to Database: ", obj);
    } catch (err) {
        return Error("Error: Failed to write Object to Database.");
    }
}

async function updateDatabase() {
    await db.write();
}

export {
    readDatabase,
    writeDatabase,
    updateDatabase
}