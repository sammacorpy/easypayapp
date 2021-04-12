import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('orders', table => {
      table.text('id', '128').notNullable().unique().primary();
      table.double('price', 2).notNullable();
      table.text('customerFullName', '128').notNullable();
      table.enum('currency', ['USD', 'EUR', 'THB', 'HKD', 'SGD', 'AUD']).notNullable();
      table.boolean('isPaid').defaultTo(false);
      table.timestamps(true,true);
    });
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('orders');
}

