const _cache = {};

export const cache = {
  has(key) {
    return !!_cache[key];
  },
  get(key, defaultValue) {
    return _cache[key] || defaultValue;
  },
  set(key, value) {
    _cache[key] = value;
  },
  reset() {
    Object.getOwnPropertyNames(_cache).forEach((key) => {
      delete _cache[key];
    });
  }
};