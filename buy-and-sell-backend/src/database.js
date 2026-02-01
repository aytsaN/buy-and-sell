import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'hapi-server',
  password: 'Password123!',
  database: 'buy-and-sell',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = {
  connect: async () => {
    const connection = await pool.getConnection();
    connection.release();
    return;
  },
  query: async (queryString, escapedValues) => {
    const [results, fields] = await pool.query(queryString, escapedValues);
    return { results, fields };
  },
  end: () => pool.end(),
};
