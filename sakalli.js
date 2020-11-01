class EventEmitter{
    constructor(){
        this.callbacks = {}
    }

    on(event, cb){
        if(!this.callbacks[event]) this.callbacks[event] = [];
        this.callbacks[event].push(cb)
    }

    emit(event, data){
        let cbs = this.callbacks[event]
        if(cbs){
            cbs.forEach(cb => cb(data))
        }
    }
}


class Sakalli extends EventEmitter {
    constructor(host, id) {
        super()
        this.host = host;
        this.id = id;
        this._hasConnection = false;
        this.conn = null;
    }

    connect(id) {
        if (id) {
            this.id = id
        }
        if (!this.host.endsWith("/"))
            this.host += "/"
        if (!this.connection_count && window["WebSocket"]) {
            this.conn = new WebSocket("ws://" + this.host + "listen/" + this.id);
            if(this.conn){
                this._hasConnection = true;
            }
            this.conn.onclose = function (evt) {
                console.log("sakalli connection closed")
                this._hasConnection = false;
                this.emit('closed')
            }.bind(this);

            this.conn.onopen = function (evt) {
                console.log("sakalli connection open ...");
                this.emit('opened')
            }.bind(this);

            this.conn.onmessage = function (evt) {
               this.emit("notification", JSON.parse(evt.data))
            }.bind(this);

            window.onbeforeunload = function () {
                this.conn.close()
                this._hasConnection = false;
            }
            return true;
        }
        else if(this.connection_count > 0){
            console.error("There's already a sakalli connection")
            return false;
        }
         else {
            console.error("browser does not support websocket")
            return false;
        }
    }

    destroy() {
        this.emit('closed');
        this.conn.close();
        this._hasConnection = false;
        delete(this.conn)
        this.callbacks = {}
    }
}

module.exports = Sakalli;
