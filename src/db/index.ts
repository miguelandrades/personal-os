import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não configurada');
export const db = drizzle({ client: neon(process.env.DATABASE_URL), schema });
