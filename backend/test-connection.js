const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.$connect()
  .then(() => {
    console.log('OK - Connected to Supabase!');
    return p.$disconnect();
  })
  .catch((e) => {
    console.error('ERR:', e.message);
    process.exit(1);
  });
