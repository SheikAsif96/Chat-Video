const pool = require("../db");

const saveMessage = async ({ roomId, username, text }) => {
  await pool.query(
    `INSERT INTO messages (room_id, username, content) 
        VALUES ($1, $2, $3)`,
    [roomId, username, text],
  );
};

const getRoomMessages = async (roomId) => {
  const result = await pool.query(
    `SELECT * FROM messages
        WHERE room_id = $1
        `,
    [roomId],
  );

  return result.rows;
};

module.exports = { saveMessage, getRoomMessages };
