export default (function () {
    var postManInstance;
    var createPostMan = function () {
      var events = {};
      return {
        publish(event, payload) {
          if (!events.hasOwnProperty(event)) {
            return;
          }
          events[event].forEach((listener) => {
            listener(payload || {});
          });
        },
        subscribe(event, listener) {
          if (!events.hasOwnProperty(event)) {
            events[event] = [];
          }
          var index = events[event].push(listener) - 1;
          return {
            remove() {
              delete events[event][index];
            },
          };
        },
      };
    };
    return {
      getInstance() {
        if (!postManInstance) {
          postManInstance = createPostMan();
        }
        return postManInstance;
      },
    };
  }()).getInstance();
  