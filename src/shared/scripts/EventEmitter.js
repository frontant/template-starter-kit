class EventEmitter {
  constructor() {
    this._listeners = {};

    this.emit = this.emit.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
  }

  emit(event, data) {
    const listeners = this._listeners[event];
    listeners && listeners.forEach(fn => fn(data));
  }

  on(event, fn) {
    const listeners = this._listeners[event] || [];
    listeners.push(fn);
    this._listeners[event] = listeners;

    return this;
  }

  off(event, fn) {
    this._listeners[event] = this._listeners[event].filter(function(func) {
      return func !== fn;
    });
  }
}

export default EventEmitter;
