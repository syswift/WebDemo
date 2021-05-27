import request from 'supertest';
import {app} from '../../app';

it('responds with details about the current user', async () => {
    const authResponse = await request(app)
    .post('/api/auth/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
    const cookie = authResponse.get('Set-Cookie');

    const response = await request(app)
    .get('/api/auth/currentuser')
    .set('Cookie',cookie)
    .send()
    .expect(200);

    console.log(response.body);
});