function createEventHandler(emitter) {
  return (eventName) => (callback) => {
    emitter.on(eventName, callback);
    return { unsubscribe: () => emitter.off(eventName, callback) };
  };
}

function customLog(msg) {
  // eslint-disable-next-line no-console
  console.log(`🤖 - ${msg}`);
}

function deepEquals(objA, objB) {
  return JSON.stringify(objA) === JSON.stringify(objB); // TODO: Use proper library
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function memoizeOne(memoFn) {
  let result;
  let isCalled = false;

  const memoized = () => {
    if (!isCalled) {
      result = memoFn();
      isCalled = true;
    }
    return result;
  };

  return memoized;
}

export {
  createEventHandler,
  customLog,
  deepEquals,
  isEmpty,
  memoizeOne,
};
