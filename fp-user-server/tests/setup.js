import supertest from 'supertest';
import app from '../index.js';

export const server = supertest.agent(app);