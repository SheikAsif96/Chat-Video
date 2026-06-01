require("dotenv").config();
const pool = require("./index");

const initDB = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      room_id TEXT,
      username TEXT,
      content TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("database initialized");
};

initDB();
