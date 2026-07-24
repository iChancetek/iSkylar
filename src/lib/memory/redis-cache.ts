import Redis from 'ioredis';

// In-Memory Fallback Cache Store
interface MemoryCacheEntry {
  value: any;
  expiresAt: number;
}

const localFallbackMap = new Map<string, MemoryCacheEntry>();

let redisClient: Redis | null = null;
let isRedisConnected = false;

function getRedisClient(): Redis | null {
  if (redisClient) return redisClient;

  const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_URL;
  if (!redisUrl) {
    console.warn('[Redis Cache] REDIS_URL not configured. Using in-memory fallback cache.');
    return null;
  }

  try {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      connectTimeout: 2000,
      lazyConnect: true,
      enableOfflineQueue: false,
    });

    redisClient.on('connect', () => {
      isRedisConnected = true;
      console.log('[Redis Cache] Connected to Redis successfully.');
    });

    redisClient.on('error', (err) => {
      isRedisConnected = false;
      console.warn('[Redis Cache] Redis connection warning (falling back to memory cache):', err.message);
    });

    redisClient.connect().catch((err) => {
      isRedisConnected = false;
      console.warn('[Redis Cache] Initial connection failed, using local cache fallback:', err.message);
    });

    return redisClient;
  } catch (err: any) {
    console.warn('[Redis Cache] Failed to initialize ioredis:', err.message);
    return null;
  }
}

/**
 * Retrieve cached item from Redis or In-Memory fallback.
 */
export async function cacheGet<T = any>(key: string): Promise<T | null> {
  const client = getRedisClient();

  if (client && isRedisConnected) {
    try {
      const data = await client.get(key);
      if (data) {
        return JSON.parse(data) as T;
      }
    } catch (e) {
      console.warn(`[Redis Cache] Error reading key ${key} from Redis:`, e);
    }
  }

  // Fallback to local map
  const entry = localFallbackMap.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    localFallbackMap.delete(key);
    return null;
  }

  return entry.value as T;
}

/**
 * Set item in Redis and In-Memory fallback.
 * Default TTL: 10 minutes (600 seconds)
 */
export async function cacheSet(key: string, value: any, ttlSeconds: number = 600): Promise<void> {
  // Always update local fallback for ultra-fast local hits
  localFallbackMap.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });

  const client = getRedisClient();
  if (client && isRedisConnected) {
    try {
      await client.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (e) {
      console.warn(`[Redis Cache] Error writing key ${key} to Redis:`, e);
    }
  }
}

/**
 * Delete item from Redis and In-Memory fallback.
 */
export async function cacheDelete(key: string): Promise<void> {
  localFallbackMap.delete(key);
  const client = getRedisClient();
  if (client && isRedisConnected) {
    try {
      await client.del(key);
    } catch (e) {
      console.warn(`[Redis Cache] Error deleting key ${key}:`, e);
    }
  }
}

/**
 * User-specific Cache Keys
 */
export const getUserCacheKeys = (userId: string) => ({
  compiledMemory: `memory:${userId}`,
  profile: `profile:${userId}`,
  emotions: `emotions:${userId}`,
  goals: `goals:${userId}`,
  conversation: `conversation:${userId}`,
});
