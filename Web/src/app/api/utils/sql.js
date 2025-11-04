import { neon } from '@neondatabase/serverless';

// Guard untuk build time
const isDevelopment = process.env.NODE_ENV === 'development';
const hasValidDb = process.env.DATABASE_URL && 
                   !process.env.DATABASE_URL.includes('dummy');

let sql;

if (hasValidDb) {
  sql = neon(process.env.DATABASE_URL);
} else {
  // Mock function untuk build/development tanpa DB
  sql = async () => {
    console.warn('Database not configured, returning empty result');
    return [];
  };
}

export default sql;
