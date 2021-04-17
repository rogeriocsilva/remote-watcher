require('dotenv').config()


const dbDetails = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "postgres",
  host: process.env.DB_HOST || "postgres",
  dialect: 'postgres'
}

module.exports = {
  development: dbDetails,
  production: dbDetails
}
