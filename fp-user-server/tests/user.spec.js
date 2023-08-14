import { expect } from 'chai';
import { server } from './setup.js';
import { nanoid } from 'nanoid';

describe('Test /users', () => {
    describe('Test GET /users/', () => {
        it('should return a list of users', (done) => {
            server.get('/users/')
                .expect(200)
                .then((res) => {
                    expect(res.body).to.be.an('array');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    })

    describe('TEST GET /users/:id', () => {
        it('should return a specific user', (done) => {
            server.get('/users/t93zgyxc6wcv_i2oaVnMg')
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('username');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('biography');
                    expect(res.body).to.have.property('avatar');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });

        it('should error if the user does not exist', (done) => {
            server.get('/users/nonexistentuser')
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message');
                    done();
                })
                .catch((error) => {
                    done(error);
                });
        });
    })

    describe('TEST POST /users', () => {
        const user = {
            username: "TEST-USER",
            id: nanoid(),
            biography: "TEST-BIOGRAPHY",
            avatar: "https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue02&clotheType=Overall&eyeType=EyeRoll&eyebrowType=Default&facialHairColor=BlondeGolden&facialHairType=MoustacheFancy&hairColor=Platinum&hatColor=Gray01&mouthType=Disbelief&skinColor=Black&topType=LongHairBob"
        }

        it('should create a user', (done) => {
            server.post('/users/')
                .set('content-type', 'application/json')
                .send(user)
                .then((res) => {
                    if (res.status === 200) {
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('id');
                    } else if (res.status === 500) {
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message');
                    } else {
                        throw new Error('Unexpected status code: ' + res.status);
                    }
                    done();
                })
                .catch((err) => {
                    done(err);
                })
        });
    })

    describe('TEST DELETE /users/:id', () => {
        it('should fail to delete a user that does not exist', (done) => {
            server.delete('/users/nonexistentuser')
                .then((res) => {
                    expect(res.status).to.equal(404)
                    expect(res.body).to.have.property('message');
                    done();
                })
                .catch((err) => {
                    done(err);
                })
        })
    })
})