import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '.env') });

export default defineConfig({
  datasource: {
    // Tentando o formato de host direto que o Supabase usa para o banco principal
    url: "postgresql://postgres:xSoVfq7h1QJF3g03@db.dtuvjgyoswxupgglnnqb.supabase.co:5432/postgres",
  },
});
