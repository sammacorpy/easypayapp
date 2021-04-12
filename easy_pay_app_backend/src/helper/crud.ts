import { knex } from 'knex';
import { Order } from '../models/order';
import * as config from '../../knexfile';

export const db = knex(config.development);

export const create = async (instance:Order): Promise<Order> => {
    return db('orders').insert(instance).returning('price').then(id=>instance);
};

export const read = async (): Promise<Order[]> => {
    return await db('orders').select();
};

export const update = async (id: string, updateObject: Omit<Order, 'id'>):
 Promise<Omit<Order,'price' | 'customerFullName' | 'currency' >> => {
    return await db('orders').where({id}).update(updateObject, ['id', 'isPaid',]);
};
