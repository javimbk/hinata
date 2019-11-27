import dotenv from 'dotenv';

/**
 * @template {Record<string, string>} T
 * @param {T} defaults
 * @returns {T}
 */
function createConfig(defaults) {
  const config = dotenv.config({
    // Pass the env vars so we can modify them on runtime, this is mainly for tests
    path: process.env.DOTENV_CONFIG_PATH,
    encoding: process.env.DOTENV_CONFIG_ENCODING,
    debug: process.env.DOTENV_CONFIG_DEBUG,
  }).parsed || {};

  return new Proxy(defaults, {
    get(target, prop) {
      if (!Reflect.has(defaults, prop)) {
        return Reflect.get(target, prop);
      }

      const type = typeof Reflect.get(target, prop);
      if (type !== 'string') {
        throw new Error(`typeof config property '${prop}' is '${type}', expected 'string'`);
      }

      return config[prop] || process.env[prop] || target[prop];
    },
  });
}

/**
 * @template V
 * @template {Record<string, () => V>} T
 * @param {T} context
 * @returns {{ [K in keyof T]: ReturnType<T[K]> }}
 */
function createContext(context) {
  const memo = new Map();
  return new Proxy(context, {
    get(target, prop) {
      if (!Reflect.has(context, prop)) {
        return Reflect.get(target, prop);
      }

      if (memo.has(prop)) {
        return memo.get(prop);
      }

      const factory = Reflect.get(context, prop);
      const type = typeof factory;
      if (type !== 'function') {
        throw new Error(`typeof context property '${prop}' is '${type}', expected 'function'`);
      }

      const value = (context[prop])();
      memo.set(prop, value);
      return value;
    },
  });
}

export {
  createConfig,
  createContext,
};
