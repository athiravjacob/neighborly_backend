import { createClient } from "redis";

const redisClient = createClient({ url: 'redis://localhost:6379' })
redisClient.on('Redis error', (err) => {
    throw new Error (err)
})

redisClient.connect()

export default redisClient