import { Sequelize } from 'sequelize';

const db = new Sequelize('books_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
