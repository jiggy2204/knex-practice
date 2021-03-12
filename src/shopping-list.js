//CONTROLLER FILE - trigger side effects
//and make connections EXPLICIT

require("dotenv").config();

const knex = require("knex");
const ShoppingList = require("./shopping-list-service");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

console.log(ShoppingList.getShoppingListItems);
