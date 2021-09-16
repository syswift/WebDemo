import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error("Cannot access NATS client before connecting");
        }

        return this._client;
    }

    connect(clusterId: string, clinetId: string, url: string){
        this._client = nats.connect(clusterId, clinetId, {url});

        return new Promise<void>((resolve,reject) => {
            this._client!.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });
            this._client!.on('error', (err) => {
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();