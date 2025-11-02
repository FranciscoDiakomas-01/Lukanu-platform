import * as z from 'zod';

const EnvSchema = z.object({
  PORT: z.string().length(4),
  DATABASE_URL: z.url(),
  REDIS_URL: z.url(),
  JWT_SECRET: z.string().nonempty(),
  SUPABASE_KEY: z.string().nonempty(),
  ADMIN_EMAIl: z.email(),
  ADMIN_PASSWORD: z.string().nonempty(),
});


export default EnvSchema;
