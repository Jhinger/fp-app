import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3800;

app.use(cors());
app.use(express.json());

app.get('/tone', (req, res) => {
    const tones = ['humourous', 'ironic', 'cynical'];

    const randomToneIndex = Math.floor(Math.random() * tones.length);
    res
        .status(200)
        .json({ tone: tones[randomToneIndex] });
})

try {
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    });
} catch (err) {
    console.log(err);
}

export default app;