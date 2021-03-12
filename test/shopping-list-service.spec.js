const { expect } = require("chai");
const knex = require("knex");
const ShoppingListService = require("../src/shopping-list-service");

describe(`Shopping List service object`, function () {
  let db;

  let testShoppingItems = [
    {
      id: 1,
      name: "item 1",
      price: 3.99,
      category: "Food",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      name: "item 2",
      price: 5.99,
      category: "Food",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      name: "item 3",
      price: 13.99,
      category: "Food",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 4,
      name: "item 4",
      price: 7.5,
      category: "Food",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 5,
      name: "item 5",
      price: 25.0,
      category: "Food",
      checked: false,
      date_added: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db("shopping_list").truncate());

  afterEach(() => db("shopping_list").truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into("shopping_list").insert(testShoppingItems);
    });

    it(`getShoppingListItems() resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getShoppingListItems(db).then((actual) => {
        expect(actual).to.eql(
          testShoppingItems.map((item) => ({
            ...item,
            date_added: new Date(item.date_added),
          }))
        );
      });
    });

    it(`getItemById() resolves an item by id from 'shopping_list' table`, () => {
        const thirdId = 3;
        const thirdTestItem = testShoppingItems[thirdId - 1];

        return ShoppingListService.getItemById(db, thirdId).then(actual => {
            expect(actual).to.eql({
                id: thirdId,
                name: thirdTestItem.name,
                
            })
        })
    })
  });
});
