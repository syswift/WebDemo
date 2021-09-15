import nats from 'node-nats-streaming';
import {randomBytes} from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'),{
    url: 'http://localhost:4222'
});  //stan = client

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    }); //must transfer array to json in order to publish

    stan.publish('ticket:created', data, () => {
        console.log('Event published');
    })

});