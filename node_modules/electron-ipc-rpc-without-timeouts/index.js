const events = require('events');
const uuid = require('uuid/v4');

class Rpc extends events.EventEmitter {
    constructor(ipc, client) {
        super();
        this.client = client || ipc;
        this.callbacks = {};

        ipc.on('cmd', (event, data) => {
            const [id, cmd, params] = data;
            this.emit(cmd, params, (err, params) => {
                this.client.send('res', [id, params]);
            });
        });

        ipc.on('res', (event, data) => {
            const [id, params] = data;
            if (this.callbacks[id]) {
                const callback = this.callbacks[id];
                delete this.callbacks[id];
                callback(null, params);
            }
        });
    }

    send(cmd, params, callback) {
        const id = uuid();

        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        if (callback) {
            this.callbacks[id] = callback;
        }

        this.client.send('cmd', [id, cmd, params]);
    }
}

module.exports = Rpc;
