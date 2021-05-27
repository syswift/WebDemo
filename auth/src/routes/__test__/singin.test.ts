import { response } from 'express';
import request from 'supertest';
import {app} from '../../app';

it('fails when a user that does not exist is supplied', async() =>{
    return request(app)
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
    .post('/api/auth/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);

    await request(app)
    .post('/api/auth/signin')
    .send({
        email: 'test@test.com',
        password: 'passssssss'
    })
    .expect(400);
});

it('sign in success', async () => {
    await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

    const response = await request(app)
            .post('/api/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
});