import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

export { sequelize };


