/* global _ check Match Random */

console.log({_});

const E = {
  _handlers: {},

  /**
   * Emits an event with a required type and optional data payload and callback.
   * @param {String} type - The type of event being emitted
   * @param {Object} [data] - The data payload attached to the event
   * @param {Function} [callback] - A callback function to pass to the handlers
   */
  emit(type, data, callback) {
    check(type, String);
    /* eslint-disable new-cap */
    check(data, Match.Optional(Object));
    check(callback, Match.Optional(Function));
    /* eslint-enable new-cap */
    const handlers = this._handlers[type];
    if (handlers) {
      _.values(handlers).forEach(handler => handler(data, callback));
    }
  },

  /**
   * @callback listenHandler
   * @param {Object} [data]
   * @param {Function} [callback]
   */

  /**
   * Registers a handler for the given type of event.
   * @param {String} type - The type of the event to listen for
   * @param {listenHandler} handler - The handler function for the event
   * @return {String} The unique id of the handler function
   */
  listen(type, handler) {
    check(type, String);
    check(handler, Function);
    const id = Random.id();
    const handlers = this._handlers;
    if (!handlers[type]) handlers[type] = {};
    handlers[type][id] = handler;
    return id;
  },

  /**
   * Unregisters a handler for the given type of event. If an id is provided,
   * only that handler will be unregistered; otherwise all handlers for that event
   * will be unregistered.
   * @param {String} [type] - The type of the event to unregister handlers for
   * @param {String} [id] - The id of the handler to unregister
   */
  unlisten(type, id) {
    /* eslint-disable new-cap */
    check(type, Match.Optional(Match.OneOf(String, null)));
    check(id, Match.Optional(String));
    /* eslint-enable new-cap */
    const handlers = this._handlers;
    if (type && handlers[type]) {
      if (id) {
        delete handlers[type][id];
      } else {
        handlers[type] = {};
      }
    } else if (id) {
      const matchingType = _.find(handlers, typedHandlers => id in typedHandlers);
      if (matchingType) delete matchingType[id];
    }
  },
};

/* eslint-disable no-undef */
Events = E;
