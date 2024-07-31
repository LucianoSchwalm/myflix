import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "myflix_development",
  username: "myflix",
  password: "myflix",
  define: {
    underscored: true,
  },
});
