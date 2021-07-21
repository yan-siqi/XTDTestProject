function mapEvent() {
  this.handlers = {};
}

mapEvent.prototype = {
  constructor: mapEvent,
  addHandler: function (type, handler) {
    if (typeof this.handlers[type] === "undefined") {
      this.handlers[type] = [];
    }
    this.handlers[type].push(handler);
  },
  //fire({type:"name",msg:"sfdfg"})
  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (this.handlers[event.type] instanceof Array) {
      const handlers = this.handlers[event.type];
      handlers.forEach(handler => {
        handler(event);
      });
    }
  },
  removeHandler: function (type, handler) {
    if (this.handlers[type] instanceof Array) {
      const handlers = this.handlers[type];
      for (var i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i] === handler) {
          break;
        }
      }
      handlers.splice(i, 1);
    }
  }
};

export default mapEvent;