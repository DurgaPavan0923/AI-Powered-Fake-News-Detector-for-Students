export const ENV = {
  geminiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  neo4jUri: process.env.NEO4J_URI || '',
  pineconeApiKey: process.env.PINECONE_API_KEY || '',
  redisUrl: process.env.REDIS_URL || ''
};