const ShoppingListService = {
  getShoppingListItems(knex) {
    return knex.select("*").from("shopping_list");
  },
  insertShoppingListItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("shopping_list")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getItemById(knex, id) {
    return knex.from("shopping_list").select("*").where("id", id).first();
  },
  deleteItem(knex, id) {
    return knex("shopping_list").where({ id }).delete();
  },
  updatedShoppingItemList(knex, id, newItemFields) {
    return knex("shopping_list").where({ id }).update(newItemFields);
  },
};

module.exports = ShoppingListService;
