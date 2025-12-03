// Simple in-memory cache with TTL
export class SimpleCache {
    constructor(ttl = 1000 * 60 * 10, maxSize = 500) {
      this.ttl = ttl;
      this.maxSize = maxSize;
      this.store = new Map();
    }
  
    get(key) {
      const entry = this.store.get(key);
      if (!entry) return null;
  
      // expired?
      if (Date.now() > entry.expireAt) {
        this.store.delete(key);
        return null;
      }
      return entry.value;
    }
  
    set(key, value) {
      // If cache is too large, remove the oldest key
      if (this.store.size >= this.maxSize) {
        const first = this.store.keys().next().value;
        this.store.delete(first);
      }
  
      this.store.set(key, {
        value,
        expireAt: Date.now() + this.ttl
      });
    }
  }
  