
import { readDatabase, writeDatabase, updateDatabase } from '../../db/index.js';
import { AvatarGenerator } from 'random-avatar-generator';
import User from '../../models/user.model.js';
import getTones from '../../utils/getTones.js';

const generator = new AvatarGenerator();

async function GET_USERS(req, res) {
    let data = await readDatabase();

    let users = data.users;
    for (const user of users) {
        const tone = await getTones();
        if (tone instanceof Error) {
            user.tone = 'failed';
            continue;
        }

        user.tone = tone;
    }

    res
        .status(200)
        .json(users);
}

async function GET_USER(req, res) {
    let data = await readDatabase();

    const userId = req.params.id;

    let user = data.users.find((user) => user.id === userId);
    if (user === undefined) {
        res
            .status(404)
            .send({ message: "Client Error: This user was not found." });
    } else {
        res
            .status(200)
            .json(user);
    }
}

async function POST_USER(req, res) {
    const { username, id, biography } = req.body

    const isSuccess = Math.random() < 0.5;
    console.log(isSuccess);

    if (isSuccess) {
        let avatar = generator.generateRandomAvatar(id);
        let result = await writeDatabase({ username, id, biography, avatar });
        if (result instanceof Error) {
            res
                .status(500)
                .send({ message: result.message });
        } else {
            res
                .status(200)
                .json({ username, id, biography, avatar });
        }
    } else {
        res
            .status(500)
            .send({ message: "Server Error: Failed to post User record." });
    }
}

async function DELETE_USER(req, res) {
    const userId = req.params.id;

    let data = await readDatabase();

    let validUsers = data.users.filter((user) => user.id !== userId);
    if (validUsers.length < data.users.length) {
        data.users = validUsers;
        await updateDatabase();

        res
            .status(200)
            .send({ message: `Success: Deleted user ${userId} from database.` });
    } else {
        res
            .status(404)
            .send({ message: "Client Error: This user was not found." });
    }
}

export {
    GET_USERS,
    GET_USER,
    POST_USER,
    DELETE_USER
}