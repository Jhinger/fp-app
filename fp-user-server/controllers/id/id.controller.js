import { nanoid } from 'nanoid';

async function GET_ID(req, res) {
    // Generate some UUID, check it against database users if needed.
    let id = nanoid();
    res
        .status(200)
        .json({ id });
}

export {
    GET_ID
}