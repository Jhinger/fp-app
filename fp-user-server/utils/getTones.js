import { config } from 'dotenv';
config();

/**
 * 
 * @param {User} users 
 */

const DEFAULT_TONE = 'humorous';

export default async function getTones(users) {
    try {
        const res = await fetch(`${process.env.TONES_API}/tone`, {
            method: 'GET'
        });

        let { tone } = await res.json();
        if (res.ok) {
            return tone;
        } else {
            return DEFAULT_TONE;
        }
    } catch (err) {
        return err;
    }
}