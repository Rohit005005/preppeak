/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:c0eTxhjKUbM1@ep-cold-block-a5uzyh31.us-east-2.aws.neon.tech/preppeak?sslmode=require',
    }
  };