import { knex } from 'knex';
import { Order } from '../models/order';
import * as config from '../../knexfile';

export const db = knex(config.development);

type Table = 'orders' | 'payments';

export const create = async <T>(table:Table, instance:T): Promise<T> => {
    return db('orders').insert(instance).then(id=>instance);
};

export const read = async <T>(table: Table): Promise<T[]> => {
    return await db(table).select();
};

export const update = async <T, K extends keyof T>(table: Table, id: string, updateObject: Partial<Pick<T, K>>):
 Promise<Partial<Pick<T, K >>[]> => {
    return await db('orders').where({id}).update(updateObject);
};

export const findById = async <T>(table: Table, id: string): Promise<T> => {
    return await db(table).where({id}).first();
};
