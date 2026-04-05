const { Client } = require('pg');

const configs = [
  {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.dtuvjgyoswxupgglnnqb',
    password: 'wPW0BvvJlRvwdJVs',
  },
  {
    host: 'db.dtuvjgyoswxupgglnnqb.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'wPW0BvvJlRvwdJVs',
  },
  {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.dtuvjgyoswxupgglnnqb',
    password: 'wPW0BvvJlRvwdJVs',
  },
];

async function tryAll() {
  for (const c of configs) {
    const client = new Client(c);
    try {
      console.log(`Trying ${c.user}@${c.host}:${c.port}...`);
      await client.connect();
      console.log('SUCCESS:', `${c.user}@${c.host}:${c.port}`);
      await client.end();
      process.exit(0);
    } catch (e) {
      console.log('FAILED:', e.message.trim());
    }
  }
  console.log('All attempts failed');
  process.exit(1);
}
tryAll();
