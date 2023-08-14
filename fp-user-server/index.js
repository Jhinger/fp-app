import express from 'express';
import cors from 'cors';
import { router as UserRouter } from './routes/user/user.route.js';
import { router as IdRouter } from './routes/id/id.route.js';

const app = express();
const PORT = process.env.PORT || 3400;

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/users', UserRouter);
app.use('/id', IdRouter);

try {
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    });
} catch (err) {
    console.log(err);
}

export default app;