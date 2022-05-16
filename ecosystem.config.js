module.exports = {
  apps: [
    {
      name: "NestJs Architecture",
      script: "./dist/main",
      env: {
        NODE_ENV: 'development',
        APP_NAME: 'Architecture',
        DB_HOST: 'localhost',
        DB_UN: 'postgres',
        DB_PASS: 'ilham123',
        DB_PORT: 5432,
        PORT:3000,
        DB_DIALECT:'postgres',
        DB_NAME:'architecture',
        GOOGLE_RECAPTCHA_SECRET_KEY:'6LdReu0fAAAAAJj6q8mxeVNE0Fv3knFnnWSsaqTQ'
      },
    }
  ]
}