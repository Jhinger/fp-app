import { expect } from 'chai';
import { server } from './setup.js';

describe('Test GET /id', () => {
    it('should return a string ID ', (done) => {
        server.get('/id')
            .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.id).to.be.a('string');
                done();
            })
            .catch((err) => {
                done(err);
            })
    })

    it('should return a string ID length of 21', (done) => {
        server.get('/id')
            .then((res) => {
                expect(res.body.id).to.be.length(21);
                done()
            })
            .catch((err) => {
                done(err);
            })
    })
})